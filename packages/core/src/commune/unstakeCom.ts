import type { KeyringPair } from "@polkadot/keyring/types";

import { unstake } from "@stakecom/commune-sdk";

export interface StakeComInput {
  module: string;
  amount: bigint;
  unstakeAll?: boolean;
  signer: KeyringPair;
}

export async function unstakeCom({
  module,
  amount,
  unstakeAll,
  signer,
}: StakeComInput) {
  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0");
  if (!module) throw new Error("Module to stake is required");

  return unstake({
    signer,
    moduleKey: module,
    amount: unstakeAll ? 0n : amount,
  });
}
