import ky, { HTTPError } from "ky";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import { getSignedMessage } from "@stakecom/commune-sdk";
import { u8aToHex } from "@stakecom/commune-sdk/utils";

import type { Tweet } from "./types";
import { addBlacklistedModule } from "./blacklistedModules";
import { getActiveModules } from "./getActiveModules";
import { getSignerByKeyName } from "./utils/getSignerByKeyName";

const immuneIps: string[] = [];

function getRandomModule(modules: ModuleInfo[]) {
  const index = Math.floor(Math.random() * modules.length);
  const module = modules[index];

  if (!module) {
    throw new Error("Module not found - empty list");
  }

  if (immuneIps.some((ip) => module.address.includes(ip))) {
    return getRandomModule(modules);
  }

  return module;
}

export async function queryMiner({
  keyName,
  prompt,
  minerName = "",
}: {
  keyName: string;
  prompt: string;
  minerName?: string;
}) {
  const modules = await getActiveModules({ ignoreBlacklist: !!minerName });
  const specificModule =
    minerName && modules.find((module) => module.name === minerName);
  const moduleToQuery = specificModule || getRandomModule(modules);

  const signer = await getSignerByKeyName(keyName);
  const timestamp = new Date().toISOString();

  const body = {
    params: {
      prompt,
      target_key: moduleToQuery.key,
      timestamp,
    },
  };

  const bodyMessage = JSON.stringify({ ...body });
  const signedBody = getSignedMessage({
    signer,
    message: bodyMessage,
  });
  const signature = u8aToHex(signedBody);

  console.log("🔥 Miner to query:", moduleToQuery.name);

  const xKey = u8aToHex(signer.publicKey).replace(/^0x/, "");

  try {
    const res = await ky.post(
      `http://${moduleToQuery.address}/method/generate`,
      {
        json: body,
        headers: {
          "Content-Type": "application/json",
          "X-Signature": signature,
          "X-Timestamp": timestamp,
          "X-Key": xKey,
          "X-Crypto": "1",
        },
      },
    );

    const data = await res.json();

    return data as Tweet[];
  } catch (error: any) {
    // TODO: handle error
    // NOTE: some modules errors with connection refused (probably they whitelisted only validator's ip)
    // add them do blacklist (redis) to not query them again

    // connection refused - blacklist module
    if (error.code === "ConnectionRefused") {
      await addBlacklistedModule(moduleToQuery.address);
    }

    if (error instanceof HTTPError) {
      const res = await error.response.json();
      console.log("🔥 e res", res);
    }
  }
}
