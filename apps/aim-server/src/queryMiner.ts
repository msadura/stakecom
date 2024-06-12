import ky from "ky";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import {
  getSignedMessage,
  getSigner,
  getSubnetModules,
} from "@stakecom/commune-sdk";
import { u8aToHex } from "@stakecom/commune-sdk/utils";

import type { Tweet } from "./types";
import { loadComKey } from "./loadComKey";

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
}: {
  keyName: string;
  prompt: string;
}) {
  // TODO: cache modules in redis
  const modules = await getSubnetModules({ networkId: 17 });
  // TODO 2: filter modules by blacklist
  const moduleToQuery = getRandomModule(modules.active);

  const comKey = await loadComKey(keyName);
  const signer = await getSigner(comKey.mnemonic);
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

  try {
    const res = await ky.post(
      `http://${moduleToQuery.address}/method/generate`,
      {
        json: body,
        headers: {
          "Content-Type": "application/json",
          "X-Signature": signature,
          "X-Timestamp": timestamp,
          "X-Key": comKey.public_key,
          "X-Crypto": "1",
        },
      },
    );

    const data = await res.json();

    return data as Tweet[];
  } catch (e) {
    // TODO: handle error
    // NOTE: some modules errors with connection refused (probably they whitelisted only validator's ip)
    // add them do blacklist (redis) to not query them again
    console.log("🔥e", e);
  }
}
