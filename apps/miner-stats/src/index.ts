import { getBalances, getEmission } from "@stakecom/commune-sdk";
import { statsApiRouter } from "@stakecom/core";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { getKeys } from "./getKeys";

const emission = await getEmission({ networkId: 17 });

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
      const { balance, stakeTotal, uid } = await getBalances({
        address: key.ss58_address,
        networkId: 17,
      });

      // console.log("🔥", key.path, formatCOMAmount(balance));

      if (showDetails) {
        let isRegistered = stakeTotal > 0n;
        if (stakeTotal === 0n) {
          try {
            await statsApiRouter.getValidator(key.ss58_address, 17);
            isRegistered = true;
          } catch (e) {
            isRegistered = false;
          }
        }

        console.log(
          "🔥",
          key.path,
          `balance: ${formatCOMAmount(balance)}`,
          `staked: ${formatCOMAmount(stakeTotal)}`,
          isRegistered ? "✅" : "❌",
        );
      }

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

  console.table(
    balances
      .map(({ name, balance, address, uid, emission }) => ({
        name,
        address,
        balance: formatCOMAmount(balance),
        uid: uid ? String(uid) : "-",
        emission: formatCOMAmount(emission),
      }))
      .concat([
        {
          name: "--",
          address: "--",
          uid: "--",
          balance: "--",
          emission: "--",
        },
        {
          name: "",
          address: "",
          uid: `${balances.filter(({ uid }) => typeof uid === "number").length} / ${balances.length}`,
          balance: formatCOMAmount(sumBalance),
          emission: `${balances.filter(({ emission }) => emission).length} / ${balances.length}`,
        },
      ]),
  );

  return sumBalance;
};

const s2 = await getFilteredBalance({
  pattern: /^ex[0-9]$/i,
  label: "🔥 EX",
});

const s3 = await getFilteredBalance({
  pattern: /^epco[0-9]$/i,
  label: "🔥 EPCO",
});

const s4 = await getFilteredBalance({
  pattern: /^kop(a?)[0-9]+$/i,
  label: "🔥 KOP / KOPA",
});

const s6 = await getFilteredBalance({
  pattern: /^dixie[0-9]+$/i,
  label: "🔥 DIXIE",
});

const s7 = await getFilteredBalance({
  pattern: /^hodor[0-9]+$/i,
  label: "🔥 HODOR",
});

const { balance } = await getBalances({
  address: "5Fh5GBGmsDV5Sz11Vj6KcPCixHoTtBNK2LQLK5jq9VjQTK5w",
  networkId: 17,
});
console.log("🔥", "EPIC balance free", formatCOMAmount(balance));

console.log(
  "🔥 Market compass total:",
  formatCOMAmount(s2 + s3 + s4 + s6 + s7),
);
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

process.exit();
