import { getBalances, getEmission } from "@stakecom/commune-sdk";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { getKeys } from "./getKeys";

const servers = [
  { pattern: /^wraith[0-9]+$/i, label: "🔥 Wraith" },
  { pattern: /^goblin[0-9]+$/i, label: "🔥 Goblin" },
  { pattern: /^hobbit[0-9]+$/i, label: "🔥 Hobbit" },
  // { pattern: /^akali[0-9]$/i, label: "🔥 AKALI" },
  // { pattern: /^abarai[0-9]$/i, label: "🔥 ABARAI" },
  // { pattern: /^bento[0-9]$/i, label: "🔥 BENTO" },
  { pattern: /^drago[0-9]$/i, label: "🔥 DRAGO" },
  { pattern: /^ezek[0-9]$/i, label: "🔥 EZEK" },
  { pattern: /^fiskk[0-9]$/i, label: "🔥 EZEK" },
];

const emission = await getEmission({ networkId: 17 });

const getFilteredBalance = async ({
  pattern,
}: {
  pattern: RegExp;
  label: string;
  showDetails?: boolean;
}) => {
  const keys = await getKeys();
  const filteredKeys = keys.filter((key) => pattern.test(key.path));

  if (filteredKeys.length === 0) return { sumBalance: 0n, withEmission: 0 };

  const balances = await Promise.all(
    filteredKeys.map(async (key) => {
      const { balance, stakeTotal, uid } = await getBalances({
        address: key.ss58_address,
        networkId: 17,
      });

      return {
        balance: balance + stakeTotal,
        name: key.path,
        address: key.ss58_address,
        key,
        emission: emission[uid] ?? 0,
        uid,
      };
    }),
  );

  const sumBalance = balances.reduce((acc, { balance }) => acc + balance, 0n);
  const countWithEmission = balances.filter(
    ({ emission }) =>
      Number(formatCOMAmount(emission, { maxDecimals: 2 })) > 0.09,
  ).length;

  console.table(
    balances
      .map(({ name, balance, uid, emission }) => ({
        name,
        // address: ellipsize(address),
        balance: formatCOMAmount(balance, { maxDecimals: 2 }),
        uid: uid ? String(uid) : "-",
        emission: formatCOMAmount(emission, { maxDecimals: 2 }),
      }))
      .concat([
        {
          name: "--",
          // address: "--",
          uid: "--",
          balance: "--",
          emission: "--",
        },
        {
          name: "",
          // address: "",
          uid: `${balances.filter(({ uid }) => typeof uid === "number").length} / ${balances.length}`,
          balance: formatCOMAmount(sumBalance, { maxDecimals: 3 }),
          emission: `${balances.filter(({ emission }) => Number(formatCOMAmount(emission, { maxDecimals: 2 })) > 0.09).length} / ${balances.length}`,
        },
      ]),
  );

  return { sumBalance, countWithEmission };
};

const getProxyStats = async () => {
  return (await (
    await fetch("http://good-fucking-proxy.com/stats")
  ).json()) as {
    requests: number;
    hits: number;
    misses: number;
    ratio: string;
    size: number;
    ttl: number;
  };
};

const sGroups = await Promise.all(servers.map(getFilteredBalance));
const sGroupsTotal = sGroups.reduce(
  (acc, { sumBalance }) => acc + sumBalance,
  0n,
);
const withEmissionTotal = sGroups.reduce(
  (acc, { countWithEmission }) => acc + (countWithEmission || 0),
  0,
);
const { balance } = await getBalances({
  address: "5Fh5GBGmsDV5Sz11Vj6KcPCixHoTtBNK2LQLK5jq9VjQTK5w",
  networkId: 17,
});

console.log("🔥", "EPIC balance free", formatCOMAmount(balance));
console.log("🔥 Market compass total:", formatCOMAmount(sGroupsTotal));
console.log("🔥 With emission total:", withEmissionTotal);
console.log("🔥 Proxy:", JSON.stringify(await getProxyStats()));
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

process.exit();
