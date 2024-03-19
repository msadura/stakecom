import Keyring from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";

export async function getKeyring() {
  await cryptoWaitReady();

  return new Keyring({ ss58Format: 42, type: "sr25519" });
}

export async function getSigner(mnemonic: string) {
  const keyring = await getKeyring();
  const signer = keyring.addFromUri(mnemonic);

  return signer;
}
