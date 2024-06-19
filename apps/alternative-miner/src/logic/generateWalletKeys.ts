import { Keyring } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";
import {
  ed25519PairFromSeed,
  mnemonicGenerate,
  mnemonicToMiniSecret,
} from "@polkadot/util-crypto";

// create a keyring with some non-default values specified
// ss58Format specific to Commune
const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

export const generateWalletKeys = (keyName: Lowercase<string>) => {
  // Create mnemonic string using BIP39
  const mnemonic = mnemonicGenerate();

  const seed = mnemonicToMiniSecret(mnemonic);

  // create & add the pair to the keyring with the type and some additional
  // metadata specified
  const keyPair = keyring.addFromUri(
    mnemonic,
    { name: keyName, path: keyName },
    "ed25519",
  );

  const { secretKey } = ed25519PairFromSeed(seed);

  return {
    publicKey: u8aToHex(keyPair.publicKey), // .slice(2),
    privateKey: u8aToHex(secretKey), //.slice(2),
    address: keyPair.address,
    mnemonic,
    hexSeed: u8aToHex(seed).slice(2),
  };
};
