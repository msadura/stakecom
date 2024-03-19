import { getSigner } from "@stakecom/commune-sdk";

import { decryptData } from "../utils/dataEncryption";
import { getStakerWallet } from "../wallet";

export async function getSignerForEvmAddress(evmAddress: string) {
  const staker = await getStakerWallet(evmAddress, true);

  if (!staker?.mnemonicEncrypted) {
    throw new Error(`Staker not found ${evmAddress}`);
  }

  const phrase = decryptData(staker.mnemonicEncrypted) as string;
  const signer = await getSigner(phrase);

  return signer;
}
