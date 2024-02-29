import { isAddress } from "viem";

import type { Staker } from "~/wallet/getStakerWallet";
import { getStakerWallet } from "~/wallet/getStakerWallet";

export type StakeUser = Omit<Staker, "mnemonicEncrypted">;

export async function getStakerUser(
  evmAddress: string,
  createIfNotExists = false,
): Promise<StakeUser> {
  if (!isAddress(evmAddress)) {
    throw new Error(`Invalid evm address: ${evmAddress}`);
  }

  const { mnemonicEncrypted: _, ...stakerUser } = await getStakerWallet(
    evmAddress,
    createIfNotExists,
  );

  return stakerUser;
}
