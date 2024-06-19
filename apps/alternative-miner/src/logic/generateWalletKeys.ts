import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
} from "@polkadot/util-crypto";

import { callPythonScript, PythonScripts } from "../utils/callPythonScript";

export const generateWalletKeys = async () => {
  // Need to be run one time before interacting with the API
  await cryptoWaitReady();

  // create a keyring with some non-default values specified
  // ss58Format specific to Commune
  const keyring = new Keyring({ type: "sr25519" });

  // Create mnemonic string using BIP39
  const mnemonic = mnemonicGenerate();

  // Derive the seed from the mnemonic
  const seed = mnemonicToMiniSecret(mnemonic);
  const hexSeed = u8aToHex(seed);

  // Add a new pair to the keyring using the seed
  const keyPair = keyring.addFromSeed(seed);

  const address = keyring.encodeAddress(keyPair.publicKey, 42);

  // Get private key based on seed
  // Python script needed as TS implementation suck monkey balls
  const privateKey: Buffer = await new Promise((resolve, reject) => {
    callPythonScript({
      scriptFile: PythonScripts.derivePrivateKey,
      params: [hexSeed.slice(2)],
      onSuccess: resolve,
      onError: reject,
      onClose: () => void 0,
    });
  });

  return {
    publicKey: u8aToHex(keyPair.publicKey).slice(2),
    privateKey: privateKey.toString().slice(2),
    address,
    mnemonic,
    hexSeed: hexSeed.slice(2),
  };
};
