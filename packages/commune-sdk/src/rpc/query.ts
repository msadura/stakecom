import type { AccountBalances, NetworkEmission } from "../types";
import { getClient } from "./client";

export const getEmission = async ({
  networkId = 0,
}: {
  networkId?: number;
}): Promise<NetworkEmission> => {
  const api = await getClient();
  const emissionData = await api.query.subspaceModule.emission(networkId);

  return emissionData.toJSON() as number[];
};

export const getBalances = async ({
  networkId = 0,
  address,
}: {
  address: string;
  networkId?: number;
}): Promise<AccountBalances> => {
  const api = await getClient();
  const [balanceData, stakeToData, uidsData] = await api.queryMulti([
    [api.query.system.account, address],
    [api.query.subspaceModule.stakeTo, [networkId, address]],
    [api.query.subspaceModule.uids, [networkId, address]],
  ]);

  const uid = uidsData?.toJSON() as number;
  const accountBalanceData = balanceData?.toJSON() as {
    data: { free: number };
  };
  const balance = BigInt(accountBalanceData.data.free);

  const stakeData = stakeToData?.toJSON() as
    | [string, number][]
    | Record<string, number>;

  const stake = getStakesDict(stakeData);
  const stakeTotal = Object.values(stake).reduce((acc, v) => acc + v, 0n);

  return { balance, stake, stakeTotal, uid };
};

export const getStakeByModule = async ({
  networkId = 0,
  address,
  moduleKey,
}: {
  address: string;
  moduleKey: string;
  networkId?: number;
}): Promise<bigint> => {
  const api = await getClient();

  const stakeToData = await api.query.subspaceModule.stakeTo(
    networkId,
    address,
  );

  const stakeData = stakeToData?.toJSON();
  const stake = getStakesDict(stakeData);

  return stake[moduleKey] || 0n;
};

function getStakesDict(stakes: Record<string, any>) {
  return Object.entries(stakes).reduce(
    (acc, [key, value]) => {
      acc[key] = BigInt(value);
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

export const getBurn = async (networkId = 0) => {
  const api = await getClient();
  const burn = await api.query.subspaceModule.burn(networkId);

  return BigInt(burn.toString());
};

export const getSubnetName = async (networkId = 0) => {
  const api = await getClient();
  const name = await api.query.subspaceModule.subnetNames(networkId);

  return name.toHuman() as string;
};

export const getMinStake = async (networkId = 0) => {
  const api = await getClient();
  const minStake = await api.query.subspaceModule.minStake(networkId);

  return BigInt(minStake.toString());
};

export const getSubnetModules = async ({
  networkId = 0,
}: {
  networkId: number;
}): Promise<any> => {
  const api = await getClient();
  const uidsRes = await api.query.subspaceModule.uids.entries(networkId);
  const uidsArr = uidsRes.map(([_, value]) => {
    return Number(value.toHuman());
  });
  // const keyss = await api.query.subspaceModule.name.entries(17);
  // console.log("🔥", uidsArr);

  // keyss.forEach(([key, name]) => {
  //   console.log("     uid:", name.toHuman());
  // });

  const keyz = await getKeys(17);

  // console.log("🔥k", keyz);

  const [
    keys,
    address,
    uids,
    name,
    delegationFee,
    emission,
    incentive,
    dividends,
    lastUpdate,
    metadata,
    stakeFrom,
  ] = await api.queryMulti([
    [api.query.subspaceModule.keys.multi(uids), [networkId]],
    // [api.query.subspaceModule.address, networkId],
    // [api.query.subspaceModule.uids, [networkId]],
    // [api.query.subspaceModule.name, [networkId]],
    // [api.query.subspaceModule.delegationFee, [networkId]],
    // [api.query.subspaceModule.emission, [networkId]],
    // [api.query.subspaceModule.incentive, [networkId]],
    // [api.query.subspaceModule.dividends, [networkId]],
    // [api.query.subspaceModule.lastUpdate, [networkId]],
    // [api.query.subspaceModule.metadata, [networkId]],
    // [api.query.subspaceModule.stakeFrom, [networkId]],
  ]);

  console.log("🔥", keys?.toJSON(), name?.toJSON());
};

async function getKeys(networkId = 0) {
  const api = await getClient();
  const keys = await api.query.subspaceModule.keys.entries(networkId);
  keys.forEach(([key, address]) => {
    const subnetId = key.args[0]?.toJSON();
    console.log("🔥", subnetId);
    const uid = key.args[1]?.toJSON();
    console.log("🔥", uid);

    console.log(
      "key arguments:",
      key.args.map((k) => k.toHuman()),
    );
    console.log("     address:", address.toHuman());
  });
  return keys;
}
