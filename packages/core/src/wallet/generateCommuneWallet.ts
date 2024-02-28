import Keyring from "@polkadot/keyring";
import { mnemonicGenerate } from "@polkadot/util-crypto";

export interface CommuneWalletSeed {
  mnemonic: string;
  ss58Address: string;
}

export function generateCommuneWallet(name?: string): CommuneWalletSeed {
  const mnemonic = mnemonicGenerate();
  const keyring = new Keyring({ ss58Format: 42, type: "sr25519" });
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
