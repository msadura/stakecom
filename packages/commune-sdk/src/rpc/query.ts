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
