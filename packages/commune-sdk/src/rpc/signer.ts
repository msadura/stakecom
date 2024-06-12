import type { KeyringPair } from "@polkadot/keyring/types";
import Keyring from "@polkadot/keyring";
import { stringToU8a } from "@polkadot/util";
import { cryptoWaitReady, mnemonicGenerate } from "@polkadot/util-crypto";

export async function getKeyring() {
  await cryptoWaitReady();

  return new Keyring({ ss58Format: 42, type: "sr25519" });
}

export async function getSigner(mnemonic: string) {
  const keyring = await getKeyring();
  const signer = keyring.addFromUri(mnemonic);

  return signer;
}

export async function getRandomSigner() {
  const mnemonic = mnemonicGenerate();
  return getSigner(mnemonic);
}

export function getSignedMessage({
  signer,
  message,
}: {
  signer: KeyringPair;
  message: string;
}) {
  const messageToSign = stringToU8a(message);

  return signer.sign(messageToSign);
}
