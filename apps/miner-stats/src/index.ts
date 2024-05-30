import { getBalances, getEmission } from "@stakecom/commune-sdk";
import { statsApiRouter } from "@stakecom/core";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { ellipsize } from "./ellipsize";
import { getKeys } from "./getKeys";

const servers = [
  { pattern: /^synthia_[0-9]+$/i, label: "🔥 Synthia" },
  { pattern: /^goblin[0-9]+$/i, label: "🔥 Goblin" },
  { pattern: /^hobbit[0-9]+$/i, label: "🔥 Hobbit" },
  { pattern: /^ex[0-9]$/i, label: "🔥 EX" },
  { pattern: /^epco[0-9]$/i, label: "🔥 EPCO" },
  { pattern: /^kop3+$/i, label: "🔥 KOP / KOPA" },
  { pattern: /^bakudo[0-9]+$/i, label: "🔥 BAKUDO" },
  { pattern: /^dixie[0-9]+$/i, label: "🔥 DIXIE" },
  { pattern: /^hodor[0-9]+$/i, label: "🔥 HODOR" },
  { pattern: /^lotar[0-9]+$/i, label: "🔥 LOTAR" },
];

const emission = await getEmission({ networkId: 17 });

const getFilteredBalance = async ({
  pattern,
  showDetails = false,
}: {
  pattern: RegExp;
  label: string;
  showDetails?: boolean;
}) => {
  const keys = await getKeys();
  const filteredKeys = keys.filter((key) => pattern.test(key.path));

  if (filteredKeys.length === 0) return 0n;

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
        address: ellipsize(address),
        balance: formatCOMAmount(balance, { maxDecimals: 3 }),
        uid: uid ? String(uid) : "-",
        emission: formatCOMAmount(emission, { maxDecimals: 3 }),
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

const sGroups = await Promise.all(servers.map(getFilteredBalance));
const sGroupsTotal = sGroups.reduce((acc, value) => acc + value, 0n);
const { balance } = await getBalances({
  address: "5Fh5GBGmsDV5Sz11Vj6KcPCixHoTtBNK2LQLK5jq9VjQTK5w",
  networkId: 17,
});

console.log("🔥", "EPIC balance free", formatCOMAmount(balance));
console.log("🔥 Market compass total:", formatCOMAmount(sGroupsTotal));
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

process.exit();
