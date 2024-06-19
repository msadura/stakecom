import { cryptoWaitReady } from "@polkadot/util-crypto";
import { NameForgeJS } from "nameforgejs";

import { comKeySchema } from "../entities/comKeySchema";
import { generateWalletKeys } from "./generateWalletKeys";
import { getCurrentUnixTimestamp } from "./getCurrentUnixTimestamp";
import { readGeneratedKeys } from "./readGeneratedKeys";
import { writeComKey } from "./writeComKey";
import { writeGeneratedKeys } from "./writeGeneratedKeys";

const generator = new NameForgeJS();

export const createKey = async () => {
  // we only need to do this once per app, somewhere in our init code
  // (when using the API and waiting on `isReady` this is done automatically)
  await cryptoWaitReady();

  const readingKeyResult = await readGeneratedKeys();

  let existingKeys: Lowercase<string>[] = [];
  if (readingKeyResult.success) {
    existingKeys = readingKeyResult.data;
  }

  let done = false;
  let newKeyName: Lowercase<string>;

  while (!done) {
    const generatedNames: string[] = generator
      .generateNames({
        name_type: "human",
        generate_last_name: false,
        country: "japan",
        count: 30,
      })
      .map((name: string) => name.toLowerCase().trim());

    const newKey = generatedNames.find(
      (newName) => !existingKeys.includes(newName as Lowercase<string>),
    );
    if (newKey) {
      newKeyName = newKey as Lowercase<string>;
      existingKeys.push(newKeyName);
      done = true;
    }
  }

  const updatedKeys = existingKeys;
  await writeGeneratedKeys(updatedKeys);

  console.info("created new key: ", newKeyName);
  const { address, publicKey, privateKey, mnemonic, hexSeed } =
    generateWalletKeys();
  const timestamp = getCurrentUnixTimestamp();

  const comKey = comKeySchema.parse({
    path: newKeyName,
    mnemonic,
    public_key: publicKey,
    private_key: privateKey,
    ss58_address: address,
    seed_hex: hexSeed,
    ss58_format: 42,
    crypto_type: 1,
    derive_path: null,
  });

  const comKeyFile = {
    data: JSON.stringify(comKey),
    encrypted: false,
    timestamp,
  };

  await writeComKey(comKeyFile, newKeyName);

  console.info("comKeyFile", comKeyFile);
};
