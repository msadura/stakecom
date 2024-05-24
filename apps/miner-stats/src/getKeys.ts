import { Glob } from "bun";

export interface ComKey {
  path: string;
  mnemonic: string;
  public_key: string;
  private_key: string;
  ss58_address: string;
  seed_hex: string;
  ss58_format: number;
  crypto_type: 1;
  derive_path: null | string;
}

export const getKeys = async () => {
  const glob = new Glob("**/*.json");
  const current = import.meta.dir;

  const fileNames: string[] = [];

  // Scans the current working directory and each of its sub-directories recursively
  for await (const file of glob.scan(`${current}/keys`)) {
    fileNames.push(file);
  }

  // load and parse files
  const keys = await Promise.all(
    fileNames.map(async (fileName) => {
      const path = `${current}/keys/${fileName}`;
      const file = Bun.file(path);

      const fileContent = (await file.json()) as { data: string };
      const content = JSON.parse(fileContent.data) as ComKey;

      return content;
    }),
  );

  return keys;
};

export const getFilteredKeys = async (pattern: RegExp) => {
  const keys = await getKeys();

  return keys.filter((key) => pattern.test(key.path));
};

export const getKeyByName = async (name: string) => {
  const keys = await getKeys();

  return keys.find((key) => key.path === name);
};
