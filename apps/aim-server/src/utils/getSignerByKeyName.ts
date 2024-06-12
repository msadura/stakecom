import { getSigner } from "@stakecom/commune-sdk";

import type { ComKey } from "../loadComKey";
import { loadComKey } from "../loadComKey";

export const getSignerByKeyName = async (keyName: string) => {
  let comKey: ComKey;
  try {
    comKey = await loadComKey(keyName);
  } catch (e) {
    console.error(e);
    throw new Error("Unrecognized keyName");
  }

  try {
    const signer = await getSigner(comKey.mnemonic);
    return signer;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get signer by keyName");
  }
};
