import ky from "ky";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import {
  getSignedMessage,
  getSigner,
  getSubnetModules,
} from "@stakecom/commune-sdk";
import { u8aToHex } from "@stakecom/commune-sdk/utils";

import { getComxKey } from "./getComxKey";

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

export async function generate({ keyName }: { keyName: string }) {
  const modules = await getSubnetModules({ networkId: 17 });
  const moduleToQuery = getRandomModule(modules.active);

  const comKey = await getComxKey(keyName);
  const signer = await getSigner(comKey.mnemonic);
  const timestamp = new Date().toISOString();

  const body = {
    params: {
      // get from original request
      prompt:
        "crypto forensics lang:en -is:retweet -meme -🚀 -t.me -https -http is:verified",
      // get target from chain modules list
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
          "X-Crypto": "1",
          "X-Key": comKey.public_key,
        },
      },
    );

    const data = await res.json();

    console.log("🔥", data);
  } catch (e) {
    console.log("🔥e", e);
  }
}

await generate({ keyName: "chani0" });