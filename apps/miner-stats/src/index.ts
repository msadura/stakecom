import { getBalances, getEmission } from "@stakecom/commune-sdk";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { getKeys } from "./getKeys";

const servers = [
  { pattern: /^synthia_[0-9]+$/i, label: "🔥 Synthia" },
  { pattern: /^goblin[0-9]+$/i, label: "🔥 Goblin" },
  { pattern: /^hobbit[0-9]+$/i, label: "🔥 Hobbit" },
  { pattern: /^ex[0-9]$/i, label: "🔥 EX" },
  { pattern: /^epco[0-9]$/i, label: "🔥 EPCO" },
  { pattern: /^bakudo[0-9]+$/i, label: "🔥 BAKUDO" },
  { pattern: /^dixie[0-9]+$/i, label: "🔥 DIXIE" },
  { pattern: /^lotar[0-9]+$/i, label: "🔥 LOTAR" },
  { pattern: /^fisk[0-9]+$/i, label: "🔥 FISK" },
  { pattern: /^udar[0-9]+$/i, label: "🔥 UDAR" },
  { pattern: /^adac[0-9]+$/i, label: "🔥 ADAC" },
  { pattern: /^agil[0-9]+$/i, label: "🔥 AGIL" },
  { pattern: /^babo[0-9]+$/i, label: "🔥 BABO" },
  { pattern: /^buster[0-9]+$/i, label: "🔥 BUSTER" },
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
          emission: `${balances.filter(({ emission }) => emission).length} / ${balances.length}`,
        },
      ]),
  );

  return { sumBalance, countWithEmission };
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
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

process.exit();
