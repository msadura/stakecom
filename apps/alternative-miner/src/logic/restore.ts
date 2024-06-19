import { Keyring } from "@polkadot/keyring";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { cryptoWaitReady, sr25519PairFromSeed } from "@polkadot/util-crypto";

void (async () => {
  // we only need to do this once per app, somewhere in our init code
  // (when using the API and waiting on `isReady` this is done automatically)
  await cryptoWaitReady();

  // Your secret key as a hex string (replace with your actual secret key)
  const secretKeyHex =
    "0x5864ddbd19fa4de00c42a029d9a8f5cecf49039547e0c33f2e2be5cbf0d59475889b6719db13ebba75f4eaec0e4eabd7a5553db79674f44f30633134730df456";

  // Convert the secret key hex string to a Uint8Array
  const secretKey = hexToU8a(secretKeyHex);

  // Generate the key pair from the secret key
  const keyPair = sr25519PairFromSeed(secretKey.slice(0, 32));

  // Create a keyring instance with the desired ss58 format (42 for Polkadot)
  const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

  // Add the restored key pair to the keyring
  keyring.addFromPair(keyPair);

  // Derive the address from the public key
  const address = keyring.encodeAddress(keyPair.publicKey);

  console.log(`Restored Address: ${address}`);
  console.log(`Public Key: ${u8aToHex(keyPair.publicKey)}`);
  console.log(`Secret Key: ${u8aToHex(keyPair.secretKey)}`);
})();
