import ky, { HTTPError, TimeoutError } from "ky";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import { getSignedMessage } from "@stakecom/commune-sdk";
import { u8aToHex } from "@stakecom/commune-sdk/utils";

import type { Tweet } from "./types";
import { addBlacklistedModule } from "./blacklistedModules";
import { getActiveModules } from "./getActiveModules";
import { getSignerByKeyName } from "./utils/getSignerByKeyName";

const immuneIps: string[] = [];
const maxRetries = 1;

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
  retry = 0,
}: {
  keyName: string;
  prompt: string;
  minerName?: string;
  retry?: number;
}) {
  const modules = await getActiveModules({ ignoreBlacklist: !!minerName });
  const specificModule =
    minerName && modules.find((module) => module.name === minerName);
  const moduleToQuery = specificModule || getRandomModule(modules);

  const signer = await getSignerByKeyName(keyName);
  const timestamp = new Date(new Date().toUTCString())
    .toISOString()
    .replace(/Z$/, "+00:00");

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

  console.log(`🔵 [QUERY] ${moduleToQuery.name}`);

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
        timeout: 8000,
      },
    );

    const data = await res.json();
    console.log(`🟢 [SUCCESS] ${moduleToQuery.name}`);

    return data as Tweet[];
  } catch (error: any) {
    // connection refused - blacklist module
    if (error.code === "ConnectionRefused") {
      console.log(`🔴 [BLACKLIST] ${moduleToQuery.name} - ConnectionRefused`);
      addBlacklistedModule(moduleToQuery.address).catch(console.error);
    }

    if (error instanceof TimeoutError) {
      console.log(`🟠 [TIMEOUT] ${moduleToQuery.name}`);
    } else if (error instanceof HTTPError) {
      if (error.response.status === 500) {
        // somethign wrong with the miner, do not bother to retry
        console.log(`🔴 [ERROR] ${moduleToQuery.name} - 500 skipping`);

        return queryMiner({ keyName, prompt, minerName, retry: retry + 1 });
      }

      if (error.response.status === 403) {
        // find out more about 403 causes
        // await addBlacklistedModule(moduleToQuery.address);
      }

      try {
        const res = await error.response.json();
        console.log(`🔴 [ERROR] ${moduleToQuery.name}`, res);
      } catch (e) {
        console.error(`🔴 [ERROR] ${moduleToQuery.name} request error:`, error);
      }
    } else {
      console.error(`🔴 [ERROR] ${moduleToQuery.name} request error:`, error);
    }

    if (retry < maxRetries) {
      console.log(`🟡 [RETRY] ${retry + 1} / ${maxRetries}`);
      return queryMiner({ keyName, prompt, minerName, retry: retry + 1 });
    }

    throw new Error(`NGMI`);
  }
}
