import TTLCache from "@isaacs/ttlcache";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import { getSubnetModules } from "@stakecom/commune-sdk";

const networkId = 17;

export const modulesCache = new TTLCache<string, ModuleInfo[]>({
  ttl: 120 * 60 * 1000, // 120 minutes
  checkAgeOnGet: true,
});

export async function getValidators({ refresh }: { refresh?: boolean }) {
  const cached: ModuleInfo[] | undefined = refresh
    ? undefined
    : await modulesCache.get("validators");

  const modules = cached || (await getSubnetModules({ networkId })).validators;

  if (!cached) {
    modulesCache.set("validators", modules);
  }

  return modules;
}
