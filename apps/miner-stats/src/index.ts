import { Glob } from "bun";

import { getBalances } from "@stakecom/commune-sdk";
import { formatCOMAmount } from "@stakecom/core/formatters";

interface ComKey {
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

const getKeys = async () => {
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

await getKeys();

const getKeyBalance = async (address: string) => {
  const { balance, stakeTotal } = await getBalances({ address, networkId: 17 });

  return balance + stakeTotal;
};

const getMarketCompassMinedBalance = async () => {
  const keys = await getKeys();
  const filteredKeys = keys.filter((key) => key.path.startsWith("ex"));

  const balances = await Promise.all(
    filteredKeys.map(async (key) => {
      const balance = await getKeyBalance(key.ss58_address);

      // console.log("🔥", key.path, formatCOMAmount(balance));

      return {
        balance,
        key,
      };
    }),
  );

  const sumBalance = balances.reduce((acc, { balance }) => acc + balance, 0n);

  console.log("🔥 Market compass sum:", formatCOMAmount(sumBalance));

  return sumBalance;
};

const getFilteredBalance = async ({
  pattern,
  label,
}: {
  pattern: RegExp;
  label: string;
}) => {
  const keys = await getKeys();
  const filteredKeys = keys.filter((key) => pattern.test(key.path));

  // console.log("🔥 FK:", filteredKeys);

  const balances = await Promise.all(
    filteredKeys.map(async (key) => {
      const balance = await getKeyBalance(key.ss58_address);

      // console.log("🔥", key.path, formatCOMAmount(balance));

      return {
        balance,
        key,
      };
    }),
  );

  const sumBalance = balances.reduce((acc, { balance }) => acc + balance, 0n);

  console.log(`${label}:`, formatCOMAmount(sumBalance));

  return sumBalance;
};

const s1 = await getFilteredBalance({
  pattern: /^epi[0-9]$/i,
  label: "🔥 MC hostkey sum",
});

const s2 = await getFilteredBalance({
  pattern: /^ex[0-9]$/i,
  label: "🔥 MC contabo5 sum",
});

const s3 = await getFilteredBalance({
  pattern: /^epco[0-9]$/i,
  label: "🔥 MC contabo4 sum",
});

console.log("🔥 Market compass total:", formatCOMAmount(s1 + s2 + s3));
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

// await getFilteredBalance({
//   pattern: /^(epic\.miner|ep-m)/i,
//   label: "🔥 Open router",
// });

// await getFilteredBalance({
//   pattern: /^epic$/i,
//   label: "🔥 Epic",
// });
