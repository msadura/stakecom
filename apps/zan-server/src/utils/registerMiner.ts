import {
  getBalances,
  getBurn,
  getRegisteredMinersCount,
  getSigner,
  register,
  transfer,
} from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { loadComKey } from "../../../aim-server/src/loadComKey";
import { getConfig } from "../getConfig";

export const registerMiner = async ({
  minerName,
  port,
  networkId = 17,
}: {
  minerName: string;
  port: number;
  networkId?: number;
}) => {
  const config = await getConfig();
  const bankKeyName = config.bankKeyName;
  const maxBurn = toAmountValue(config.maxBurn);
  const bankKey = await loadComKey(bankKeyName);
  const minerKey = await loadComKey(minerName);

  if (!bankKey) {
    throw new Error(`Bank key not found: ${bankKeyName}`);
  }

  if (!minerKey) {
    throw new Error(`Miner key not found: ${minerName}`);
  }

  const bankSigner = await getSigner(bankKey.mnemonic);
  const minerSigner = await getSigner(minerKey.mnemonic);

  if (config.maxMiners !== -1) {
    const registeredMinersCount = await getRegisteredMinersCount(
      networkId,
      config.serverIp,
    );
    if (registeredMinersCount >= config.maxMiners) {
      throw new Error(
        `Max miners reached: ${registeredMinersCount} >= ${config.maxMiners}; skipping registration for ${minerKey.path}`,
      );
    }
  }

  const burn = await getBurn(networkId);
  if (burn > maxBurn) {
    throw new Error(
      `Burn amount is too high:  ${formatCOMAmount(burn)} > ${config.maxBurn}`,
    );
  }

  const { balance, uid } = await getBalances({
    address: minerKey.ss58_address,
    networkId,
  });

  if (uid) {
    console.log("🔥", `${minerKey.path} - already registered`);
    return;
  }

  // not enough balance, feed first
  if (balance < burn + toAmountValue("1")) {
    const bankBalance = await getBalances({
      address: bankKey.ss58_address,
      networkId,
    });

    const feedAmount = burn + toAmountValue("1") - balance;

    if (bankBalance.balance < feedAmount) {
      throw new Error(
        `Bank balance too low: ${formatCOMAmount(
          bankBalance.balance,
        )} < ${formatCOMAmount(feedAmount)}`,
      );
    }

    console.log(
      "🔥",
      `Feeding ${minerKey.path} with ${formatCOMAmount(feedAmount)} COM`,
    );

    try {
      await transfer({
        signer: bankSigner,
        recipient: minerKey.ss58_address,
        amount: feedAmount,
      });

      console.log("✅", `${minerKey.path} - funds transfered`);
    } catch (err) {
      console.error("❌", `${minerKey.path} - funds error`, err);
      throw err;
    }
  }

  const address = `${config.serverIp}:${port}`;

  console.log("🔥", `Registering ${minerKey.path} - ${config.serverIp}`);

  const res = await register({
    networkId,
    name: minerKey.path,
    signer: minerSigner,
    address,
  });

  if (res.success) {
    console.log("✅", `${minerKey.path} - registered`);
  } else {
    console.error("❌", `${minerKey.path} - error`, res.msg);
    console.log("❌", res);
    throw new Error(res.errorCode);
  }
};
