import TTLCache from "@isaacs/ttlcache";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import { getSubnetModules } from "@stakecom/commune-sdk";

const networkId = 17;

export const modulesCache = new TTLCache<string, ModuleInfo[]>({
  ttl: 5 * 60 * 1000, // 3 minutes
  checkAgeOnGet: true,
});

export async function getModules({ refresh }: { refresh?: boolean }) {
  const cached: ModuleInfo[] | undefined = refresh
    ? undefined
    : await modulesCache.get("modules");

  const modules = cached || (await getSubnetModules({ networkId })).all;

  if (!cached) {
    modulesCache.set("modules", modules);
  }

  return modules;
}
