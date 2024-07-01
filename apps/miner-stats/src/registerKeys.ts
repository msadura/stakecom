import {
  getBalances,
  getBurn,
  getSigner,
  getSubnetModules,
  register,
  transfer,
} from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { getConfig } from "./getConfig";
import { getFilteredKeys, getKeyByName } from "./getKeys";

const bankName = "epic";
const maxBurn = toAmountValue("12");

const servers = await getConfig().then((config) => config.register);

export const registerKeys = async ({
  pattern,
  ipTemplate,
}: {
  pattern: RegExp;
  ipTemplate: string;
}) => {
  const bankKey = await getKeyByName(bankName);
  const filteredKeys = await getFilteredKeys(pattern);
  const modules = await getSubnetModules({ networkId: 17 });

  console.log("🔥", `Number of keys to register:`, filteredKeys.length);

  if (!bankKey) {
    throw new Error(`Bank key not found: ${bankName}`);
  }

  const bankSigner = await getSigner(bankKey.mnemonic);

  for (const key of filteredKeys) {
    const { ss58_address, path } = key;

    if (modules.all.find((m) => m.name === path)) {
      console.log("🔥", `${path} - already registered`);
      continue;
    }

    const minerNumber = path.match(/\d+/)?.[0];
    if (!minerNumber) {
      throw new Error(`Miner number not found in path: ${path}`);
    }

    const burn = await getBurn(17);
    if (burn > maxBurn) {
      throw new Error(`Burn amount is too high: ${formatCOMAmount(burn)}`);
    }

    const { balance } = await getBalances({
      address: key.ss58_address,
      networkId: 17,
    });

    // not enough balance, feed first
    if (balance < burn + toAmountValue("1")) {
      const feedAmount = burn + toAmountValue("1") - balance;
      console.log(
        "🔥",
        `Feeding ${path} with ${formatCOMAmount(feedAmount)} COM`,
      );

      try {
        await transfer({
          signer: bankSigner,
          recipient: ss58_address,
          amount: feedAmount,
        });

        console.log("✅", `${path} - funds transfered`);
      } catch (err) {
        console.error("❌", `${path} - funds error`, err);
        throw err;
      }
    }

    const signer = await getSigner(key.mnemonic);
    const ip = ipTemplate.replace("x", minerNumber);

    console.log("🔥", `Registering ${key.path} - ${ip}`);

    const res = await register({
      networkId: 17,
      name: key.path,
      signer,
      address: ip,
    });

    if (res.success) {
      console.log("✅", `${path} - registered`);
    } else {
      console.error("❌", `${path} - error`, res.msg);
      console.log("❌", res);
      throw new Error(res.errorCode);
    }
  }
};

for (const server of servers || []) {
  await registerKeys(server);
}

process.exit(0);
