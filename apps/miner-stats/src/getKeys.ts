import { Glob } from "bun";
// @ts-expect-error - no types
import { homedir } from "bun-utilities/os";

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
  const communePath = `${homedir()}/.commune`;

  const fileNames: string[] = [];

  // Scans the current working directory and each of its sub-directories recursively
  for await (const file of glob.scan(`${communePath}/key`)) {
    fileNames.push(file);
  }

  fileNames.sort();

  console.log("🔥", fileNames);

  // load and parse files
  const keys = await Promise.all(
    fileNames.map(async (fileName) => {
      const path = `${communePath}/key/${fileName}`;
      const file = Bun.file(path);

      try {
        const fileContent = (await file.json()) as { data: string };
        const content = JSON.parse(fileContent.data) as ComKey;

        if (!content.path) {
          return null;
        }

        return content;
      } catch {
        return null;
      }
    }),
  );

  return keys.filter((key): key is ComKey => key !== null);
};

export const getFilteredKeys = async (pattern: RegExp) => {
  const keys = await getKeys();
  keys.sort((a, b) => a.path.localeCompare(b.path));

  return keys.filter((key) => pattern.test(key.path));
};

export const getKeyByName = async (name: string) => {
  const keys = await getKeys();

  return keys.find((key) => key.path === name);
};
