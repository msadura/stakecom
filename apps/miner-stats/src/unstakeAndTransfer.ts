import {
  getBalances,
  getSigner,
  transferAll,
  unstake,
} from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";
import { formatCOMAmount } from "@stakecom/core/formatters";

import type { ComKey } from "./getKeys";
import { getFilteredKeys } from "./getKeys";

const destAddress = "5Fh5GBGmsDV5Sz11Vj6KcPCixHoTtBNK2LQLK5jq9VjQTK5w";
const MIN_BALANCE = toAmountValue("1");

const unstakeAndTransferSingle = async (key: ComKey) => {
  const signer = await getSigner(key.mnemonic);
  const { balance, stakeTotal } = await getBalances({
    address: key.ss58_address,
    networkId: 17,
  });

  console.log(
    "🔥🔥🔥🔥🔥",
    `${key.path}, balance: ${formatCOMAmount(balance)}, stake: ${formatCOMAmount(stakeTotal)}`,
  );

  const total = balance + stakeTotal;
  const unstakeAmount = stakeTotal - toAmountValue(0.1);

  if (stakeTotal > 0n && unstakeAmount > 0n) {
    console.log(
      "🔥",
      `Unstaking: ${formatCOMAmount(stakeTotal)} from ${key.path}`,
    );

    // unstake all
    await unstake({
      signer,
      moduleKey: key.ss58_address,
      amount: unstakeAmount,
      networkId: 17,
    });
  }

  if (total < MIN_BALANCE * 2n) {
    console.log(
      "🔥",
      `Key ${key.path} has insufficient balance: ${formatCOMAmount(total)}`,
    );

    return 0n;
  }

  const updatedBalance = await getBalances({
    address: key.ss58_address,
    networkId: 17,
  });

  const totalToTransfer = updatedBalance.balance - MIN_BALANCE;

  if (totalToTransfer <= MIN_BALANCE) {
    console.log(
      "🔥",
      `Key ${key.path} has insufficient balance: ${formatCOMAmount(
        updatedBalance.balance,
      )}`,
    );

    return 0n;
  }

  console.log(
    "🔥",
    `Transferring approx ${formatCOMAmount(totalToTransfer)} from ${key.path}`,
  );

  await transferAll({
    recipient: destAddress,
    signer,
    keepBalance: MIN_BALANCE,
  });

  console.log("🔥", `${key.path} - completed`);

  return totalToTransfer;
};

const unstakeAndTransferFilteredKeys = async ({
  pattern,
  label,
}: {
  pattern: RegExp;
  label: string;
}) => {
  const filteredKeys = await getFilteredKeys(pattern);

  // all at once
  const balances = await Promise.all(
    filteredKeys.map(unstakeAndTransferSingle),
  );

  // 1 by 1
  // const balances: bigint[] = [];

  // for (const key of filteredKeys) {
  //   const b = await unstakeAndTransferSingle(key);
  //   balances.push(b);
  // }

  const sumBalance = balances.reduce((acc, balance) => acc + balance, 0n);

  console.log(`${label}:`, formatCOMAmount(sumBalance));

  return sumBalance;
};

const s1 = await unstakeAndTransferFilteredKeys({
  pattern: /^epi[0-9]$/i,
  label: "🔥 MC hostkey sum",
});

const s2 = await unstakeAndTransferFilteredKeys({
  pattern: /^ex[0-9]$/i,
  label: "🔥 MC contabo5 sum",
});

const s3 = await unstakeAndTransferFilteredKeys({
  pattern: /^epco[0-9]+$/i,
  label: "🔥 MC contabo4 sum",
});

const s4 = await unstakeAndTransferFilteredKeys({
  pattern: /^kop(a?)[0-9]+$/i,
  label: "🔥 MC contabo3 kop sum",
});

console.log("🔥 Market compass total:", formatCOMAmount(s1 + s2 + s3 + s4));
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

process.exit();