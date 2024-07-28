import { COMAI_DECIMALS, getSubnetModules } from "./packages/commune-sdk/src";

type ComModuleInfo = {
  uid: number;
  key: string;
  emission: number;
  address: string;
  dividends: number;
  incentive: number;
};

type GroupedByIPData = Record<
  ComModuleInfo["address"],
  {
    count: number;
    emission: number;
  }
>;

const KNOWN_MINER_NAMES = [
  "ernest",
  "karol",
  "radek",
  "marek",
  "mariusz",
] as const;

type KnownMinerName = (typeof KNOWN_MINER_NAMES)[number];

const KNOWN_IPS: Record<string, string[]> = {
  ernest: ["66.151.32.171"],
  karol: ["88.99.209.216", "94.130.214.251"],
  radek: ["136.243.67.174"],
  marek: ["213.199.60.156", "144.76.237.12"],
  mariusz: ["49.12.175.12", "156.67.26.110", "49.12.175.2"],
  fam: ["162.84.196.28"],
  suspiciousDick: ["94.241.31.84"],
};

type GroupedByKnownMinerData = Record<
  ComModuleInfo["address"] | KnownMinerName,
  {
    count: number;
    emission: number;
    isDick: boolean;
  }
>;

const groupByIp = (data: ComModuleInfo[]): GroupedByIPData =>
  data.reduce((acc, item) => {
    const [addressWithoutPort] = item.address.split(":");

    if (!acc[addressWithoutPort]) {
      acc[addressWithoutPort] = {
        count: 0,
        emission: 0,
      };
    }

    acc[addressWithoutPort].count++;
    acc[addressWithoutPort].emission += item.emission;

    return acc;
  }, {} as GroupedByIPData);

const groupByMiner = (
  groupedByIPData: GroupedByIPData,
): GroupedByKnownMinerData => {
  const groupedByMinerData = Object.entries(groupedByIPData).reduce(
    (acc, [ip, data]) => {
      const miner = Object.entries(KNOWN_IPS).find(([_, ips]) =>
        ips.includes(ip),
      )?.[0];

      if (!miner) {
        // It's not one of us
        acc[ip] = data;
        return acc;
      }

      if (!acc[miner]) {
        acc[miner] = {
          count: 0,
          emission: 0,
        };
      }

      acc[miner].count += data.count;
      acc[miner].emission += data.emission;

      return acc;
    },
    {} as Record<string, { count: number; emission: number }>,
  );

  return Object.entries(groupedByMinerData).reduce((acc, [miner, data]) => {
    acc[miner] = {
      ...data,
      isDick: data.count > 30,
    };

    return acc;
  }, {} as GroupedByKnownMinerData);
};

type NetworkSummary = { others: number; known: number };
const getNetworkSummary = (groupedData: GroupedByKnownMinerData) => {
  const summary: NetworkSummary = { others: 0, known: 0 };
  const trackedKnown = [];

  Object.keys(groupedData).forEach((key) => {
    if (KNOWN_MINER_NAMES.includes(key as KnownMinerName)) {
      if (!trackedKnown.includes(key)) {
        summary.known += 1;
        trackedKnown.push(key);
      }
    } else {
      summary.others += 1;
    }
  });

  return summary;
};

type TotalSummary = Record<
  string,
  {
    activeCount: number;
    inactiveCount: number;
    totalCount: number;
    emission: number;
    isDick: boolean;
    isGay: boolean;
  }
>;

const getTotalSummary = (
  groupedInactive: GroupedByKnownMinerData,
  groupedActive: GroupedByKnownMinerData,
): TotalSummary => {
  const activeMinerKeys = Object.keys(groupedActive);
  const inactiveOnlyMinerKeys = Object.keys(groupedInactive).filter(
    (key) => !activeMinerKeys.includes(key),
  );
  const minerKeys = [...activeMinerKeys, ...inactiveOnlyMinerKeys];

  return minerKeys.reduce((acc, key) => {
    const activeCount = groupedActive[key]?.count || 0;
    const inactiveCount = groupedInactive[key]?.count || 0;
    const totalCount = activeCount + inactiveCount;
    const emission =
      (groupedInactive[key]?.emission || 0) +
      (groupedActive[key]?.emission || 0);
    const isDick = totalCount > 30;
    const isGay = activeCount > 30;

    acc[key] = {
      activeCount,
      inactiveCount,
      totalCount,
      emission,
      isDick,
      isGay,
    };

    return acc;
  }, {} as TotalSummary);
};

const printNetworkSummary = (summary: NetworkSummary) => {
  console.table([summary], ["others", "known"]);
};

const printTotalSummary = (groupedData: TotalSummary) => {
  const tableHeader = [
    "miner",
    "count",
    "active",
    "inactive",
    "emission",
    "isDick",
    "isGay",
  ];
  const tableData = Object.entries(groupedData).map(([miner, data]) => ({
    miner,
    count: data.totalCount,
    active: data.activeCount,
    inactive: data.inactiveCount,
    emission: `~${Number(data.emission / 10 ** COMAI_DECIMALS).toFixed(2)}`,
    isDick: data.isDick ? "🍆" : "",
    isGay: data.isGay ? "🌈" : "",
  }));

  console.table(tableData, tableHeader);
};

const main = async () => {
  const subnetModules = await getSubnetModules({ networkId: 17 });

  // All
  const groupedAllData = groupByIp(subnetModules.all);
  const groupedAllByMiner = groupByMiner(groupedAllData);
  const networkSummary = getNetworkSummary(groupedAllByMiner);

  // Inactive
  const groupedInactiveData = groupByIp(subnetModules.inactive);
  const groupedInactiveByMiner = groupByMiner(groupedInactiveData);

  // Active only
  const groupedActive = groupByIp(subnetModules.active);
  const groupedActiveByMiner = groupByMiner(groupedActive);

  const totalSummary = getTotalSummary(
    groupedInactiveByMiner,
    groupedActiveByMiner,
  );

  printNetworkSummary(networkSummary);
  printTotalSummary(totalSummary);

  process.exit();
};

main();
