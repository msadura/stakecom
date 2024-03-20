import { refreshStakerBalance } from "~core/wallet";
import { getStakerWallet } from "~core/wallet/getStakerWallet";
import { isAddress } from "viem";

import type { Staker } from "~core/wallet/getStakerWallet";

export const STALE_DATA_THRESHOLD = 1000 * 60 * 5; // 5 minutes

export type StakeUser = Omit<Staker, "mnemonicEncrypted"> & {
  isStaleData: boolean;
};

export async function getStakerUser({
  evmAddress,
  createIfNotExists = false,
  forceRefresh = false,
}: {
  evmAddress: string;
  createIfNotExists?: boolean;
  forceRefresh?: boolean;
}): Promise<StakeUser> {
  if (!isAddress(evmAddress)) {
    throw new Error(`Invalid evm address: ${evmAddress}`);
  }

  if (forceRefresh) {
    await refreshStakerBalance(evmAddress);
  }

  const { mnemonicEncrypted: _, ...stakerUser } = await getStakerWallet({
    evmAddress,
    createIfNotExists,
  });

  const isStaleData =
    !stakerUser.updatedAt ||
    new Date(stakerUser.updatedAt).getTime() <
      Date.now() - STALE_DATA_THRESHOLD;

  if (isStaleData) {
    return getStakerUser({ evmAddress, forceRefresh: true });
  }

  return {
    ...stakerUser,
    isStaleData,
  };
}
