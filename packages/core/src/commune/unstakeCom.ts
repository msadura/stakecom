import { unstake } from "@stakecom/commune-sdk";

import { getComKey } from "~/events/getComKey";

export interface StakeComInput {
  key: string;
  module: string;
  amount: string;
  unstakeAll?: boolean;
  mnemonicEncrypted?: string;
}

export async function unstakeCom({
  key,
  module,
  amount,
  unstakeAll,
  mnemonicEncrypted,
}: StakeComInput) {
  await getComKey(key, mnemonicEncrypted);

  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0");
  if (!module) throw new Error("Module to stake is required");

  return unstake({ key, module, amount: unstakeAll ? undefined : amount });
}
