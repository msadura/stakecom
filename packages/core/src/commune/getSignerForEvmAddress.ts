import { decryptData } from "~core/utils";
import { getStakerWallet } from "~core/wallet";

import { getSigner } from "@stakecom/commune-sdk";

export async function getSignerForEvmAddress(evmAddress: string) {
  const staker = await getStakerWallet(evmAddress, true);

  if (!staker?.mnemonicEncrypted) {
    throw new Error(`Staker not found ${evmAddress}`);
  }

  const phrase = decryptData(staker.mnemonicEncrypted) as string;
  const signer = await getSigner(phrase);

  return signer;
}
