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
  providerUrl: string | string[] = "wss://commune.api.onfinality.io/public-ws",
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
