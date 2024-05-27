import { ApiPromise, WsProvider } from "@polkadot/api";

import "../interfaces/types-lookup";
import "../interfaces/augment-api";
import "../interfaces/augment-types";

let api: ApiPromise;

export async function initClient(providerUrl: string | string[]) {
  const wsProvider = new WsProvider(providerUrl);
  api = await ApiPromise.create({
    provider: wsProvider,
    noInitWarn: true,
  });
}

export async function getClient(
  providerUrl: string | string[] = [
    "wss://commune-api-node-1.communeai.net",
    "wss://commune-api-node-2.communeai.net",
    "wss://commune-api-node-3.communeai.net",
    "wss://commune-api-node-4.communeai.net",
    "wss://commune-api-node-5.communeai.net",
    "wss://commune-api-node-6.communeai.net",
    "wss://commune-api-node-7.communeai.net",
    "wss://commune-api-node-8.communeai.net",
    "wss://commune-api-node-9.communeai.net",
    "wss://commune-api-node-10.communeai.net",
  ],
  reinit = false,
) {
  if (api && !reinit) {
    return api;
  }

  if (providerUrl) {
    await initClient(providerUrl);
    return api;
  }

  throw new Error("Api client not initialized - missing provider url  ");
}
