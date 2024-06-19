import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
  sr25519PairFromSeed,
} from "@polkadot/util-crypto";

export const generateWalletKeys = async () => {
  // Need to be run one time before interacting with the API
  await cryptoWaitReady();

  // create a keyring with some non-default values specified
  // ss58Format specific to Commune
  const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

  // Create mnemonic string using BIP39
  const mnemonic = mnemonicGenerate();

  const isValidMnemonic = mnemonicValidate(mnemonic);
  if (!isValidMnemonic) {
    throw new Error("Invalid mnemonic generated");
  }

  // Derive the seed from the mnemonic
  const seed = mnemonicToMiniSecret(mnemonic);
  const hexSeed = u8aToHex(seed);

  // Add a new pair to the keyring using the seed
  const keyPair = keyring.addFromSeed(seed);

  const { secretKey } = sr25519PairFromSeed(seed);

  const address = keyring.encodeAddress(keyPair.publicKey, 42);

  return {
    publicKey: u8aToHex(keyPair.publicKey).slice(2),
    privateKey: u8aToHex(secretKey).slice(2),
    address,
    mnemonic,
    hexSeed: hexSeed.slice(2),
  };
};
