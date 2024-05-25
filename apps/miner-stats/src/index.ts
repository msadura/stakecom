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

  fileNames.sort();

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
      const { balance, stakeTotal, emission, uid } = await getBalances({
        address: key.ss58_address,
        networkId: 17,
      });

      // console.log("🔥", key.path, formatCOMAmount(balance));

      return {
        balance: balance + stakeTotal,
        name: key.path,
        address: key.ss58_address,
        key,
        emission,
        uid,
      };
    }),
  );

  const sumBalance = balances.reduce((acc, { balance }) => acc + balance, 0n);

  console.table(
    balances
      .map(({ name, balance, address, uid, emission }) => ({
        name,
        address,
        balance: formatCOMAmount(balance),
        uid: String(uid),
        emission: formatCOMAmount(emission),
      }))
      .concat([
        {
          name: "---------",
          address: "------------------------------------------------",
          uid: "---------",
          balance: "-------------",
          emission: "-------------",
        },
        {
          name: "",
          address: "",
          uid: `${balances.filter(({ uid }) => typeof uid === "number").length} / ${balances.length}`,
          balance: formatCOMAmount(sumBalance),
          emission: `${balances.filter(({ emission }) => emission).length} / ${balances.length}`,
        },
      ]),
  );

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
  pattern: /^epco[0-9]+$/i,
  label: "🔥 MC contabo4 sum",
});

const s4 = await getFilteredBalance({
  pattern: /^kop[0-9]+$/i,
  label: "🔥 MC contabo3 kop sum",
});

console.log("🔥 Market compass total:", formatCOMAmount(s1 + s2 + s3 + s4));
console.log("🔥 Time:", new Date().toLocaleString("pl-PL"));
console.log("===========================");

process.exit();
