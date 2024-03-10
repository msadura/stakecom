import { getComAddressSignature } from "~core/utils/getComAddressSignature";
import { getStakerWallet } from "~core/wallet/getStakerWallet";
import { refreshStakerBalance } from "~core/wallet/refreshStakerBalance";
import { isAddress } from "viem";

import type { Staker } from "~core/wallet/getStakerWallet";

export const STALE_DATA_THRESHOLD = 1000 * 60 * 5; // 5 minutes

export type StakeUser = Omit<Staker, "mnemonicEncrypted"> & {
  addressSignature: string;
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

  const { mnemonicEncrypted: _, ...stakerUser } = await getStakerWallet(
    evmAddress,
    createIfNotExists,
  );

  const isStaleData =
    !stakerUser.updatedAt ||
    new Date(stakerUser.updatedAt).getTime() <
      Date.now() - STALE_DATA_THRESHOLD;

  const addressSignature = await getComAddressSignature({
    evmAddress,
    ss58Address: stakerUser.ss58Address,
  });

  if (isStaleData || forceRefresh) {
    refreshStakerBalance(evmAddress).catch((e) => {
      console.error(`Failed to refresh staker balance for ${evmAddress}`, e);
    });
  }

  return {
    ...stakerUser,
    addressSignature,
    isStaleData,
  };
}
