import { mnemonicGenerate } from "@polkadot/util-crypto";

import { getKeyring } from "@stakecom/commune-sdk";

export interface CommuneWalletSeed {
  mnemonic: string;
  ss58Address: string;
}

export async function generateCommuneWallet(
  name?: string,
): Promise<CommuneWalletSeed> {
  const mnemonic = mnemonicGenerate();
  const keyring = await getKeyring();
  const pair = keyring.addFromUri(
    mnemonic,
    { name: name || "account" },
    "sr25519",
  );

  return {
    mnemonic,
    ss58Address: pair.address,
  };
}
