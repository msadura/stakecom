import { decryptData } from "~core/utils/dataEncryption";
import { z } from "zod";

import { getKey, getOrAddKey } from "@stakecom/commune-sdk";

export async function getComKey(
  evmAddress: string,
  mnemonicEncrypted?: string,
) {
  if (!mnemonicEncrypted) {
    const key = await getKey(evmAddress);
    if (!key) {
      throw new Error(
        `Error getting or creating commune key for ${evmAddress}`,
      );
    }

    return key;
  }

  const phrase = decryptData(mnemonicEncrypted);
  const phraseSchema = z.string().min(30);

  const key = await getOrAddKey({
    name: evmAddress,
    phrase: phraseSchema.parse(phrase),
  });

  if (!key) {
    throw new Error(`Error getting or creating commune key for ${evmAddress}`);
  }

  return key;
}
