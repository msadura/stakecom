import { isAddress } from "viem";

import type { Staker } from "~/wallet/getStakerWallet";
import { getComAddressSignature } from "~/utils/getComAddressSignature";
import { getStakerWallet } from "~/wallet/getStakerWallet";

export type StakeUser = Omit<Staker, "mnemonicEncrypted"> & {
  addressSignature: string;
};

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

  const addressSignature = await getComAddressSignature({
    evmAddress,
    ss58Address: stakerUser.ss58Address,
  });

  return {
    ...stakerUser,
    addressSignature,
  };
}
