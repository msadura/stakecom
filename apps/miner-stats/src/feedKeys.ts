import { getSigner, transfer } from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";

import { getFilteredKeys, getKeyByName } from "./getKeys";

const bankName = "epic";
const feedAmount = toAmountValue("11");

export const feedKeys = async (pattern: RegExp) => {
  const bankKey = await getKeyByName(bankName);
  const filteredKeys = await getFilteredKeys(pattern);

  console.log("🔥", `Number of keys to feed:`, filteredKeys.length);

  if (!bankKey) {
    throw new Error(`Bank key not found: ${bankName}`);
  }

  const signer = await getSigner(bankKey.mnemonic);

  for (const key of filteredKeys) {
    const { ss58_address, path } = key;

    console.log("🔥", `Feeding ${path} to ${bankName}`);

    try {
      await transfer({
        signer,
        recipient: ss58_address,
        amount: feedAmount,
      });

      console.log("✅", `${path} - completed`);
    } catch (err) {
      console.error("❌", `${path} - error`, err);
    }
  }
};

feedKeys(/^jottei[2-9]+$/i)
  .then(() => {
    console.log("🔥 All done");
    process.exit();
  })
  .catch((err) => {
    console.error("🔥 Error", err);
    process.exit(1);
  });
