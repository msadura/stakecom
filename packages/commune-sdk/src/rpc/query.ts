import type { AccountBalances } from "../types";
import { getClient } from "./client";

export const getBalances = async ({
  networkId = 0,
  address,
}: {
  address: string;
  networkId?: number;
}): Promise<AccountBalances> => {
  const api = await getClient();

  const [balanceData, stakeToData] = await api.queryMulti([
    [api.query.system.account, address],
    [api.query.subspaceModule.stakeTo, [networkId, address]],
  ]);

  const accountBalanceData = balanceData?.toJSON() as {
    data: { free: number };
  };
  const balance = BigInt(accountBalanceData.data.free);

  const stakeData = stakeToData?.toJSON() as [string, number][];
  const stake = getStakesDict(stakeData);

  return { balance, stake };
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

  const stakeData = stakeToData?.toJSON() as [string, number][];
  const stake = getStakesDict(stakeData);

  return stake[moduleKey] || 0n;
};

function getStakesDict(stakes: [string, number][]) {
  return stakes.reduce(
    (acc, stake) => {
      acc[stake[0]] = BigInt(stake[1]);
      return acc;
    },
    {} as Record<string, bigint>,
  );
}
