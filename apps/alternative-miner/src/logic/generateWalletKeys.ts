import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";
import {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  sr25519PairFromSeed,
} from "@polkadot/util-crypto";

// create a keyring with some non-default values specified
// ss58Format specific to Commune
const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

export const generateWalletKeys = () => {
  // Create mnemonic string using BIP39
  const mnemonic = mnemonicGenerate();
  const seed = mnemonicToMiniSecret(mnemonic);
  const hexSeed = u8aToHex(seed);
  const { publicKey, secretKey } = sr25519PairFromSeed(seed);

  const address = keyring.encodeAddress(publicKey, 42);

  return {
    publicKey: u8aToHex(publicKey).slice(2),
    privateKey: u8aToHex(secretKey).slice(2),
    address,
    mnemonic,
    hexSeed: hexSeed.slice(2),
  };
};
