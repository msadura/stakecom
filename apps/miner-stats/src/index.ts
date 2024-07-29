import { getAddresses, getBalances, getEmission } from "@stakecom/commune-sdk";
import { COMAI_DECIMALS } from "@stakecom/core";
import { fnum, formatCOMAmount } from "@stakecom/core/formatters";

import { getConfig } from "./getConfig";
import { getEnv } from "./getEnv";
import { getKeys } from "./getKeys";

const config = await getConfig();
const { NETWORK_ID } = getEnv();
const servers = config.stats || [];

const getProxyStats = async () => {
  return (await (
    await fetch("http://good-fucking-proxy.com/stats")
  ).json()) as {
    requests: number;
    hits: number;
    misses: number;
    ratio: string;
    fetched: number;
    retained: number;
    retainRatio: string;
    size: number;
    ttl: number;
  };
};

const getCoinStats = async () => {
  const data = await (
    await fetch("http://good-fucking-proxy.com/coingecko/comai")
  ).json();

  const price = data.market_data.current_price.usd as number;
  const change = {
    daily: data.market_data.price_change_percentage_24h_in_currency
      .usd as number,
  };

  return { price, change };
};

const [emission, proxyStats, coinStats, addresses] = await Promise.all([
  getEmission({ networkId: NETWORK_ID }),
  getProxyStats(),
  getCoinStats(),
  getAddresses(NETWORK_ID),
]);
const isSlowEmission = (emission: number) =>
  emission > 0 && emission < 0.1 * 10 ** COMAI_DECIMALS;
const isZeroEmission = (emission: number) => emission === 0;
const isGoodEmission = (emission: number) =>
  !isSlowEmission(emission) && !isZeroEmission(emission);
const isDustBalance = (balance: bigint) =>
  balance < BigInt(0.3 * 10 ** COMAI_DECIMALS);

const getFilteredBalance = async ({ pattern }: { pattern: RegExp }) => {
  const keys = await getKeys();
  const filteredKeys = keys.filter((key) => pattern.test(key.path));

  if (filteredKeys.length === 0) return { sumBalance: 0n, withEmission: 0 };

  const balances = await Promise.all(
    filteredKeys.map(async (key) => {
      const { balance, stakeTotal, uid } = await getBalances({
        address: key.ss58_address,
        networkId: NETWORK_ID,
      });

      return {
        balance: balance,
        stake: stakeTotal,
        name: key.path,
        address: key.ss58_address,
        key,
        emission: emission[uid] ?? 0,
        uid,
      };
    }),
  );

  const sumBalance = balances.reduce(
    (acc, { balance, stake }) => acc + balance + stake,
    0n,
  );
  const sumEmission = balances.reduce((acc, { emission }) => acc + emission, 0);
  const countWithEmission = balances.filter(({ emission }) =>
    isGoodEmission(emission),
  ).length;
  const countRegistered = balances.filter(
    ({ uid }) => typeof uid === "number",
  ).length;
  const countTotal = balances.length;

  console.table(
    balances
      .map(({ name, balance, stake, uid, emission }) => ({
        name,
        port: addresses[uid]?.split(":")[1] || "-",
        balance:
          `${formatCOMAmount(balance + stake, { maxDecimals: 2 })} ${stake && isDustBalance(balance) ? "💨" : ""}`.trim(),
        uid: typeof uid === "number" ? String(uid) : "-",
        emission:
          typeof uid === "number"
            ? `${formatCOMAmount(emission, { maxDecimals: 2 })} ${isSlowEmission(emission) ? "🐢" : isZeroEmission(emission) ? "🚷" : ""}`.trim()
            : "-",
      }))
      .concat([
        {
          name: "--",
          port: "--",
          uid: "--",
          balance: "--",
          emission: "--",
        },
        {
          name: "",
          port: "",
          uid: `${countRegistered} / ${countTotal}`,
          balance: formatCOMAmount(sumBalance, { maxDecimals: 2 }),
          emission: `${countWithEmission} / ${balances.length}`,
        },
      ]),
  );

  return {
    sumBalance,
    sumEmission,
    countWithEmission,
    countRegistered,
    countTotal,
  };
};

const sGroups = await Promise.all(servers?.map(getFilteredBalance) || []);
const sGroupsTotal = sGroups.reduce(
  (acc, { sumBalance }) => acc + sumBalance,
  0n,
);
const dailyEmission = sGroups.reduce(
  (acc, { sumEmission }) => acc + (sumEmission || 0),
  0,
);
const withEmissionTotal = sGroups.reduce(
  (acc, { countWithEmission }) => acc + (countWithEmission || 0),
  0,
);
const registeredTotal = sGroups.reduce(
  (acc, { countRegistered }) => acc + (countRegistered || 0),
  0,
);
const countTotal = sGroups.reduce(
  (acc, { countTotal }) => acc + (countTotal || 0),
  0,
);

const { balance: bankBalance } = await getBalances({
  address: config.unstakeTargetAddress,
  networkId: NETWORK_ID,
});
console.log(
  `🔥 Bank balance: ${formatCOMAmount(bankBalance, { maxDecimals: 2 })} $comai / 💰 ${formatCOMAmount(Math.floor(Number(bankBalance) * coinStats.price), { maxDecimals: 2 })} USD`,
);
console.log(
  `🔥 Current balances: ${formatCOMAmount(sGroupsTotal, { maxDecimals: 2 })} $comai / 💰 ${formatCOMAmount(Math.floor(Number(sGroupsTotal) * coinStats.price), { maxDecimals: 2 })} USD`,
);
console.log(
  `🔥 Miners: ${withEmissionTotal} with emission, ${registeredTotal} registered, ${countTotal} total`,
);
console.log(
  `🔥 Daily emission: ${formatCOMAmount(dailyEmission * 108, { maxDecimals: 2 })} $comai / 💰 ${formatCOMAmount(Math.floor(dailyEmission * 108 * coinStats.price), { maxDecimals: 2 })} USD`,
);
console.log(
  `🔥 Coin price $comai: ${coinStats.price.toFixed(2)} USD (change ${coinStats.change.daily.toFixed(2)}%)`,
);
console.log(
  `🔥 Proxy: ${fnum(proxyStats.requests)} reqs, ${proxyStats.ratio} cache rate, ${proxyStats.ttl}s ttl`,
);
console.log(
  `🔥 Tweets: fetched ${fnum(proxyStats.fetched)}, retained ${fnum(proxyStats.retained)} (${proxyStats.retainRatio}), total ${fnum(proxyStats.fetched + proxyStats.retained)}`,
);
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("🔥 ==========================");

process.exit();
