import TTLCache from "@isaacs/ttlcache";

import type { ModuleInfo } from "@stakecom/commune-sdk/types";
import { getSubnetModules } from "@stakecom/commune-sdk";

import { getProModules } from "./proModules";
import { filterByReliability, getAllServerStats } from "./serverStats";

const networkId = 17;

const protectedIps = [
  "213.199.60.156",
  "84.247.161.60",
  "194.247.186.132",
  "144.76.237.11",
  "45.136.19.87",
  " 136.243.67.174",
];

export const modulesCache = new TTLCache<string, ModuleInfo[]>({
  ttl: 5 * 60 * 1000, // 3 minutes
  checkAgeOnGet: true,
});

export async function getActiveModules({
  ignoreBlacklist,
  refresh,
}: {
  ignoreBlacklist?: boolean;
  refresh?: boolean;
}) {
  const cached: ModuleInfo[] | undefined = refresh
    ? undefined
    : await modulesCache.get("activeModules");

  const modules = cached || (await getSubnetModules({ networkId })).active;

  if (!cached) {
    modulesCache.set("activeModules", modules);
  }

  const pro = await getProModules();
  const stats = await getAllServerStats();

  const activeModules = ignoreBlacklist
    ? modules
    : modules
        .filter((module) => {
          const address = module.address.split(":")[0] || module.address;

          return (
            // verified that server is not blacklisted and responds
            pro.includes(address) &&
            // do not include our ips
            !protectedIps.includes(address)
          );
        })
        // get only fast or unverified servers
        .filter((server) => filterByReliability(server, stats));

  console.log("🔥 [ACTIVE] count:", activeModules.length);

  return activeModules;
}
