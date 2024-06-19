import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  sr25519PairFromSeed,
} from "@polkadot/util-crypto";

// create a keyring with some non-default values specified
// ss58Format specific to Commune
const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

export const generateWalletKeys = async () => {
  // Need to be run one time before interacting with the API
  await cryptoWaitReady();
  // Create mnemonic string using BIP39
  const mnemonic = mnemonicGenerate();
  const seed = mnemonicToMiniSecret(mnemonic);
  const hexSeed = u8aToHex(seed);
  const keyPair = sr25519PairFromSeed(seed);
  const address = keyring.encodeAddress(keyPair.publicKey, 42);

  return {
    publicKey: u8aToHex(keyPair.publicKey).slice(2),
    privateKey: u8aToHex(keyPair.secretKey).slice(2),
    address,
    mnemonic,
    hexSeed: hexSeed.slice(2),
  };
};
