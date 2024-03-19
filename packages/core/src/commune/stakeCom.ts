import type { KeyringPair } from "@polkadot/keyring/types";

import { KEEP_STAKE_BALANCE, stake } from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";

export interface StakeComInput {
  key: string;
  module: string;
  amount: bigint;
  signer: KeyringPair;
}

export async function stakeCom({ module, amount, signer }: StakeComInput) {
  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0");
  if (!module) throw new Error("Module to stake is required");

  return stake({
    moduleKey: module,
    amount: amount - toAmountValue(KEEP_STAKE_BALANCE),
    signer,
  });
}
