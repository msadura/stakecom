import {
  getBalances,
  getBurn,
  getSigner,
  register,
  transfer,
} from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { getFilteredKeys, getKeyByName } from "./getKeys";

const bankName = "epic";
const maxBurn = toAmountValue("12");

const servers = [
  // { pattern: /^ex[0-9]$/i, label: "🔥 EX", ipTemplate: "154.38.169.84:600x" },
  // {
  //   pattern: /^epco[0-9]$/i,
  //   label: "🔥 EPCO",
  //   ipTemplate: "154.38.176.110:700x",
  // },
  // {
  //   pattern: /^bakudo[0-9]+$/i,
  //   label: "🔥 BAKUDO",
  //   ipTemplate: "154.38.176.110:732x",
  // },
  // {
  //   pattern: /^dixie[0-9]+$/i,
  //   label: "🔥 DIXIE",
  //   ipTemplate: "154.38.169.84:545x",
  // },
  // {
  //   pattern: /^lotar[0-9]+$/i,
  //   label: "🔥 LOTAR",
  //   ipTemplate: "154.38.176.110:877x",
  // },
  // {
  //   pattern: /^fisk[0-9]+$/i,
  //   label: "🔥 FISK",
  //   ipTemplate: "86.48.6.108:971x",
  // },
  // {
  //   pattern: /^udar[0-9]+$/i,
  //   label: "🔥 UDAR",
  //   ipTemplate: "86.48.6.108:871x",
  // },
  {
    pattern: /^adac[0-9]+$/i,
    label: "🔥 ADAC",
    ipTemplate: "86.48.6.108:566x",
  },
];

export const registerKeys = async ({
  pattern,
  ipTemplate,
}: {
  pattern: RegExp;
  ipTemplate: string;
}) => {
  const bankKey = await getKeyByName(bankName);
  const filteredKeys = await getFilteredKeys(pattern);

  console.log("🔥", `Number of keys to register:`, filteredKeys.length);

  if (!bankKey) {
    throw new Error(`Bank key not found: ${bankName}`);
  }

  const bankSigner = await getSigner(bankKey.mnemonic);

  for (const key of filteredKeys) {
    const { ss58_address, path } = key;

    const minerNumber = path.match(/\d+/)?.[0];
    if (!minerNumber) {
      throw new Error(`Miner number not found in path: ${path}`);
    }

    const burn = await getBurn(17);
    if (burn > maxBurn) {
      throw new Error(`Burn amount is too high: ${formatCOMAmount(burn)}`);
    }

    const { balance, uid } = await getBalances({
      address: key.ss58_address,
      networkId: 17,
    });

    if (uid) {
      console.log("🔥", `${path} - already registered`);
      continue;
    }

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

await Promise.all(servers.map(registerKeys));

process.exit(0);
