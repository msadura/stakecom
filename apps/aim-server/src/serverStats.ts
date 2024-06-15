import type { ModuleInfo } from "@stakecom/commune-sdk/types";

interface ModuleStats {
  ip: string;
  requestCount: number;
  failureRatio: number;
  avgResponse: number;
}

const tempCache: Record<string, ModuleStats> = {};

// TODO - replace with async methods from redis
export const setServerStats = (ip: string, stats: ModuleStats) => {
  tempCache[ip] = stats;
};

export const getServerStats = (ip: string) => {
  return tempCache[ip];
};

export const getAllServerStats = () => {
  return tempCache;
};

export const addServerStats = ({
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
  const cached = getServerStats(ip);

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

  setServerStats(ip, updatedStats);

  console.log(
    `📊 [STATS] ${name}`,
    `Requests: ${updatedStats.requestCount}`,
    `Failure ratio: ${updatedStats.failureRatio}`,
    `Avg Response: ${(updatedStats.avgResponse / 1000).toFixed(2)}s`,
  );

  return updatedStats;
};

export const getServerStatsList = () => {
  return Object.values(getAllServerStats());
};

export const getFastestServersList = () => {
  // filter servers with more than 5, less tan 10% failure rate and less than 8s response time
  return Object.values(getAllServerStats()).filter(
    (server) =>
      server.requestCount > 5 &&
      server.failureRatio < 0.1 &&
      server.avgResponse < 8000,
  );
};

export const filterByReliability = (server: ModuleInfo) => {
  const ipRaw = server.address.split(":")[0] || server.address;
  const stats = getAllServerStats();
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
