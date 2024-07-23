import { getModules } from "./apps/mc-server/src/getModules";

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

  Object.keys(groupedData).forEach((key) => {
    if (KNOWN_MINER_NAMES.includes(key as KnownMinerName)) {
      summary.known += 1;
    } else {
      summary.others += 1;
    }
  });

  return summary;
};

const printNetworkSummary = (summary: NetworkSummary) => {
  console.table([summary], ["others", "known"]);
};

const printSummary = (groupedData: GroupedByKnownMinerData) => {
  const tableHeader = ["miner", "count", "isDick"];
  const tableData = Object.entries(groupedData).map(([miner, data]) => {
    return { miner, count: data.count, isDick: data.isDick ? "🍆" : "" };
  });

  console.table(tableData, tableHeader);
};

const main = async () => {
  const res = await getModules({ refresh: false });
  const groupedData = groupByIp(res);
  const groupedByMiner = groupByMiner(groupedData);

  const networkSummary = getNetworkSummary(groupedByMiner);
  printNetworkSummary(networkSummary);
  printSummary(groupedByMiner);
  process.exit();
};

main();
