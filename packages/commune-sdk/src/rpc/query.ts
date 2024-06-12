import type { u16 } from "@polkadot/types";
import type { StorageKey } from "@polkadot/types/primitive";
import type { Codec } from "@polkadot/types/types";

import type { AccountBalances, ModuleInfo, NetworkEmission } from "../types";
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

export const getIncentive = async ({
  networkId = 0,
}: {
  networkId?: number;
}): Promise<NetworkEmission> => {
  const api = await getClient();
  const data = await api.query.subspaceModule.incentive(networkId);

  return data.toJSON() as number[];
};

export async function getDividends({ networkId = 0 }: { networkId?: number }) {
  const api = await getClient();
  const entries = await api.query.subspaceModule.dividends(networkId);

  return entries.toJSON() as number[];
}

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
}) => {
  const [uids, keys, names, addresses, emission, dividends, incentive] =
    await Promise.all([
      getUids(networkId),
      getKeys(networkId),
      getNames(networkId),
      getAddresses(networkId),
      getEmission({ networkId }),
      getDividends({ networkId }),
      getIncentive({ networkId }),
    ]);

  const allModules: ModuleInfo[] = uids.map((uid) => ({
    uid: uid,
    key: keys[uid] || "",
    name: names[uid] || "",
    emission: emission[uid] || 0,
    address: addresses[uid] || "",
    dividends: dividends[uid] || 0,
    incentive: incentive[uid] || 0,
  }));

  const modules = {
    all: allModules,
    active: allModules.filter((m) => m.dividends < m.incentive),
    validators: allModules.filter(
      (m) => m.emission > 0 && m.dividends >= m.incentive,
    ),
    inactive: allModules.filter((m) => m.incentive === 0 && m.dividends === 0),
  };

  return modules;
};

export async function getUids(networkId = 0) {
  const api = await getClient();
  const uidsRes = await api.query.subspaceModule.uids.entries(networkId);

  return uidsRes.map(([_, value]) => value.toJSON() as number);
}

export async function getKeys(networkId = 0) {
  const api = await getClient();
  const entries = await api.query.subspaceModule.keys.entries(networkId);

  return getMapFromEntries(entries);
}

export async function getNames(networkId = 0) {
  const api = await getClient();
  const entries = await api.query.subspaceModule.name.entries(networkId);

  return getMapFromEntries(entries);
}

export async function getAddresses(networkId = 0) {
  const api = await getClient();
  const entries = await api.query.subspaceModule.address.entries(networkId);

  return getMapFromEntries(entries);
}

function getMapFromEntries<T = string>(
  entries: [StorageKey<[u16, u16]> | StorageKey<[u16]>, Codec][],
) {
  return entries.reduce(
    (acc, [key, value]) => {
      const uid = key.args[1]?.toJSON() as number;
      acc[uid] = value.toHuman() as T;

      return acc;
    },
    {} as Record<string, T>,
  );
}
