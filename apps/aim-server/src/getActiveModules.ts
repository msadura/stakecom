import TTLCache from "@isaacs/ttlcache";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import { getSubnetModules } from "@stakecom/commune-sdk";

import { getBlacklistedModules } from "./blacklistedModules";

const networkId = 17;

export const modulesCache = new TTLCache<string, Promise<any>>({
  ttl: 3 * 60 * 1000, // 3 minutes
  checkAgeOnGet: true,
});

export async function getActiveModules({
  ignoreBlacklist,
}: {
  ignoreBlacklist?: boolean;
}) {
  const cached: ModuleInfo[] | undefined =
    await modulesCache.get("activeModules");

  const modules = cached || (await getSubnetModules({ networkId })).active;
  const blacklisted = await getBlacklistedModules();

  const activeModules = ignoreBlacklist
    ? modules
    : modules.filter(
        (module) =>
          !blacklisted.includes(module.address.split(":")[0] || module.address),
      );

  // filter our "protected" ips

  return activeModules;
}
