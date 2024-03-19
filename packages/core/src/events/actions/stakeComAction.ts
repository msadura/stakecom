import { getSignerForEvmAddress } from "~core/commune/getSignerForEvmAddress";
import { stakeCom } from "~core/commune/stakeCom";
import { z } from "zod";

import type { CommuneTxResponse } from "@stakecom/commune-sdk/types";

import type { PendingAction } from "~core/events/getPendingActions";

export async function stakeComAction(action: PendingAction): Promise<{
  result: CommuneTxResponse | null;
  canRetry?: boolean;
  pendingTransfer?: boolean;
}> {
  console.log("🔥", `Processing stake action ${action.evmAddress}`);

  const params = getActionParams(action);
  if (!params) {
    return { result: null, canRetry: false };
  }

  const signer = await getSignerForEvmAddress(params.evmAddress);

  const result = await stakeCom({
    key: params.evmAddress,
    module: params.module,
    amount: BigInt(params.amount),
    signer,
  });

  return { result };
}

function getActionParams(action: PendingAction) {
  const actionSchema = z.object({
    evmAddress: z.string(),
    module: z.string().min(3),
    amount: z.string(),
    mnemonicEncrypted: z.string().min(10),
  });

  try {
    return actionSchema.parse(action);
  } catch (e) {
    return null;
  }
}
