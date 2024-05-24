import { getBalances } from "@stakecom/commune-sdk";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { getKeys } from "./getKeys";

const getFilteredBalance = async ({
  pattern,
  label,
  showDetails = false,
}: {
  pattern: RegExp;
  label: string;
  showDetails?: boolean;
}) => {
  const keys = await getKeys();
  const filteredKeys = keys.filter((key) => pattern.test(key.path));

  const balances = await Promise.all(
    filteredKeys.map(async (key) => {
      const { balance, stakeTotal } = await getBalances({
        address: key.ss58_address,
        networkId: 17,
      });

      // console.log("🔥", key.path, formatCOMAmount(balance));

      if (showDetails) {
        console.log(
          "🔥",
          key.path,
          `balance: ${formatCOMAmount(balance)}`,
          `staked: ${formatCOMAmount(stakeTotal)}`,
        );
      }

      if (stakeTotal === 0n) {
        // console.log("🔴", "Key deregistered: ", key.path);
      }

      return {
        balance: balance + stakeTotal,
        key,
      };
    }),
  );

  const sumBalance = balances.reduce((acc, { balance }) => acc + balance, 0n);

  console.log(`${label}:`, formatCOMAmount(sumBalance));

  return sumBalance;
};

const s1 = await getFilteredBalance({
  pattern: /^epi[0-9]$/i,
  label: "🔥 EPI",
});

const s2 = await getFilteredBalance({
  pattern: /^ex[0-9]$/i,
  label: "🔥 EX",
});

const s3 = await getFilteredBalance({
  pattern: /^epco[0-9]+$/i,
  label: "🔥 EPCO",
  showDetails: false,
});

const s4 = await getFilteredBalance({
  pattern: /^kop(a?)[0-9]+$/i,
  label: "🔥 KOP / KOPA",
  showDetails: false,
});

const { balance } = await getBalances({
  address: "5Fh5GBGmsDV5Sz11Vj6KcPCixHoTtBNK2LQLK5jq9VjQTK5w",
  networkId: 17,
});
console.log("🔥", "EPIC balance free", formatCOMAmount(balance));

console.log("🔥 Market compass total:", formatCOMAmount(s1 + s2 + s3 + s4));
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

process.exit();
