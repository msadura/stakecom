import type { ModuleInfo } from "@stakecom/commune-sdk/types";

import { redisServer } from "./redis";

interface ModuleStats {
  ip: string;
  requestCount: number;
  failureRatio: number;
  avgResponse: number;
}

const cacheKey = "serverStats";

// TODO - replace with async methods from redis
export const setServerStats = (ip: string, stats: ModuleStats) => {
  return redisServer.hset(cacheKey, ip, JSON.stringify(stats));
};

export const getServerStats = (ip: string) => {
  return redisServer
    .hget(cacheKey, ip)
    .then((res) => res && (JSON.parse(res) as ModuleStats));
};

export const getAllServerStats = () => {
  return redisServer.hgetall(cacheKey).then((res) => {
    return Object.fromEntries(
      Object.entries(res).map(([key, value]) => [
        key,
        JSON.parse(value) as ModuleStats,
      ]),
    );
  });
};

export const addServerStats = async ({
  ip,
  responseTime,
  failed,
  name,
}: {
  ip: string;
  responseTime: number;
  failed: boolean;
  name: string;
}) => {
  const ipRaw = ip.split(":")[0] || ip;
  const cached = await getServerStats(ip);

  const stats: ModuleStats = cached || {
    ip: ipRaw,
    requestCount: 0,
    failureRatio: 0,
    avgResponse: 0,
  };

  const updatedStats = {
    ...stats,
    requestCount: stats.requestCount + 1,
    failureRatio:
      (stats.failureRatio * stats.requestCount + (failed ? 1 : 0)) /
      (stats.requestCount + 1),
    avgResponse:
      (stats.avgResponse * stats.requestCount + responseTime) /
      (stats.requestCount + 1),
  };

  await setServerStats(ip, updatedStats);

  console.log(
    `📊 [STATS] ${name}`,
    `Requests: ${updatedStats.requestCount}`,
    `Failure ratio: ${updatedStats.failureRatio}`,
    `Avg Response: ${(updatedStats.avgResponse / 1000).toFixed(2)}s`,
  );

  return updatedStats;
};

export const getServerStatsList = async () => {
  const all = await getAllServerStats();
  return Object.values(all);
};

export const getReliableServers = async () => {
  const list = await getServerStatsList();
  // filter servers with more than 5, less tan 10% failure rate and less than 8s response time
  return list.filter(
    (server) =>
      server.requestCount > 5 &&
      server.failureRatio < 0.1 &&
      server.avgResponse < 8000,
  );
};

export const filterByReliability = (
  server: ModuleInfo,
  stats: Record<string, ModuleStats>,
) => {
  const ipRaw = server.address.split(":")[0] || server.address;
  const serverStats = stats[ipRaw];

  if (!serverStats || serverStats.requestCount < 5) {
    return true;
  }

  return (
    serverStats?.requestCount >= 5 &&
    serverStats?.failureRatio < 0.5 &&
    serverStats?.avgResponse < 8000
  );
};
