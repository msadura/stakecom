import { exec } from "child_process";

import type { CommuneKey, CommuneTxResponse, ObjectResponse } from "./types";
import { toCamelCaseObj } from "./toCamelCaseObj";

export async function getOrCreateKey({
  name,
  phrase,
}: {
  name: string;
  phrase: string;
}) {
  try {
    const key = await execAsync<CommuneKey>(`c key_info ${name}`);
    return key;
  } catch (e) {
    return await execAsync<CommuneKey>(`c add_key ${name} "${phrase}"`);
  }
}

export async function getBalance(key: string) {
  try {
    return await execAsync<number>(`c get_balance ${key}`);
  } catch (e) {
    return null;
  }
}

export async function stake({
  key,
  module,
  amount,
}: {
  key: string;
  module: string;
  amount: number;
}) {
  const res = await execAsync<ObjectResponse>(
    `c stake ${key} ${module} ${amount}`,
  );
  return res ? toCamelCaseObj<CommuneTxResponse>(res) : null;
}

export async function unstake({
  key,
  module,
  amount,
}: {
  key: string;
  module: string;
  amount?: number;
}) {
  // If not amount is provided, it will unstake all
  const res = await execAsync<ObjectResponse>(
    `c unstake ${key} ${module}${amount ? ` ${amount}` : ""}`,
  );

  return res ? toCamelCaseObj<CommuneTxResponse>(res) : null;
}

export async function transfer({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}) {
  const res = await execAsync<ObjectResponse>(
    `c transfer ${from} ${to} ${amount}`,
  );

  return res ? toCamelCaseObj<CommuneTxResponse>(res) : null;
}

const execAsync = <T = unknown>(command: string): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        reject(err);
      }

      try {
        const result = getParsedStdOut(stdout);
        resolve(result as T);
      } catch (e) {
        resolve(null);
      }
    });
  });
};

const getParsedStdOut = (stdout: string) => {
  try {
    return JSON.parse(stdout) as unknown;
  } catch (e) {
    const sanitized = stdout
      .replaceAll("True", "true")
      .replaceAll("False", "false")
      .replaceAll("None", "null")
      .replace(/(\r\n|\n|\r|\s)/gm, "");

    return eval(`(${sanitized})`) as unknown;
  }
};
