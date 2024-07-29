// @ts-expect-error - no types
import { homedir } from "bun-utilities/os";

import {
  deregister,
  estimateTransferFee,
  getBalances,
  getSigner,
  transfer,
  transferAll,
  unstake,
} from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";
import { formatCOMAmount } from "@stakecom/core/formatters";

import type { ComKey } from "./loadComKey";
import { getConfig } from "../getConfig";
import { getMinerHealth, resetMinerHealth } from "./checkMinerHealth";
import { loadComKey } from "./loadComKey";
import { safeRegisterMiner } from "./safeRegisterMiner";

const MIN_BALANCE = toAmountValue(0.01);

const wipeMiner = async ({
  key,
  networkId = 17,
}: {
  key: ComKey;
  networkId?: number;
}) => {
  const config = await getConfig();
  const signer = await getSigner(key.mnemonic);
  const bankKeyName = config.bankKeyName;
  const bankKey = await loadComKey(bankKeyName);

  if (!bankKey) {
    throw new Error(`Bank key not found: ${bankKeyName}`);
  }

  const { balance, stakeTotal } = await getBalances({
    address: key.ss58_address,
    networkId,
  });
  const fee = await estimateTransferFee({
    amount: balance,
    recipient: config.unstakeTargetAddress,
    signer,
  });
  const transferFee = fee.toBigInt();

  const total = balance + stakeTotal;

  // not enough balance to unstake, feed first
  if (balance < transferFee + BigInt(1)) {
    const bankSigner = await getSigner(bankKey.mnemonic);
    const feedAmount = transferFee + toAmountValue("1") - balance;
    console.log(
      "🔥",
      `Feeding ${key.path} with ${formatCOMAmount(feedAmount)} COM`,
    );

    try {
      await transfer({
        signer: bankSigner,
        recipient: key.ss58_address,
        amount: feedAmount,
      });

      console.log("✅", `${key.path} - funds transfered`);
    } catch (err) {
      console.error("❌", `${key.path} - funds error`, err);
      throw err;
    }
  }

  if (stakeTotal > 0n && stakeTotal > 0n) {
    console.log(
      "🔥",
      `Unstaking: ${formatCOMAmount(stakeTotal)} from ${key.path}`,
    );

    // unstake all
    await unstake({
      signer,
      moduleKey: key.ss58_address,
      amount: stakeTotal,
      networkId,
    });
  }

  if (total < MIN_BALANCE + transferFee) {
    console.log(
      "🔥",
      `Key ${key.path} has insufficient balance: ${formatCOMAmount(total)}`,
    );

    return 0n;
  }

  const updatedBalance = await getBalances({
    address: key.ss58_address,
    networkId,
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
    recipient: config.unstakeTargetAddress,
    signer,
    keepBalance: MIN_BALANCE,
  });

  console.log("🔥", `${key.path} - completed`);

  return totalToTransfer;
};

export async function handleNewKey({ minerKey }: { minerKey: ComKey }) {
  // backup
  const backupDate = new Date()
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .replaceAll(":", "-")
    .replaceAll(",", "-");

  const makeDirProc = Bun.spawn([
    "mkdir",
    "-p",
    `${homedir()}/.commune/backups`,
  ]);

  await makeDirProc.exited;
  if (makeDirProc.exitCode !== 0) {
    throw new Error(`Failed to create backup dir`);
  }

  const backupProc = Bun.spawn([
    "mv",
    `${homedir()}/.commune/key/${minerKey.path}.json`,
    `${homedir()}/.commune/backups/${minerKey.path}-${backupDate}.json`,
  ]);

  await backupProc.exited;
  if (backupProc.exitCode !== 0) {
    throw new Error(`Failed to backup key: ${minerKey.path}`);
  }

  console.log("🔥", `Key backed up: ${minerKey.path}`);

  // generate new key
  const generateKeyProc = Bun.spawn([`comx`, `key`, `create`, minerKey.path]);
  await generateKeyProc.exited;

  if (generateKeyProc.exitCode !== 0) {
    throw new Error(`Failed to regenerate key: ${minerKey.path}`);
  }
}

export async function regenerateMiner({
  minerName,
  port,
  networkId = 17,
}: {
  minerName: string;
  port: number;
  networkId?: number;
}) {
  const minerKey = await loadComKey(minerName);
  const signer = await getSigner(minerKey.mnemonic);

  if (!minerKey) {
    throw new Error(`Miner key not found: ${minerName}`);
  }

  // unstake and transfer funds
  await wipeMiner({ key: minerKey, networkId });

  const { registered } = getMinerHealth();

  if (registered) {
    // deregister miner
    const deregisterRes = await deregister({
      moduleName: minerName,
      signer,
      networkId,
    });

    if (!deregisterRes.success) {
      throw new Error(`Failed to deregister: ${deregisterRes.errorCode}`);
    } else {
      console.log("🔥", "Miner deregistered");
    }
  } else {
    console.log("🔥", "Miner already not registered");
  }

  // generate new key
  await handleNewKey({ minerKey });

  // new key created - mark health as not banned
  resetMinerHealth();

  // register new key
  await safeRegisterMiner({ minerName, port, networkId });
}
