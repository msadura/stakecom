import { getSignerForEvmAddress } from "~core/commune/getSignerForEvmAddress";
import { stakeCom } from "~core/commune/stakeCom";
import { z } from "zod";

import type { CommuneTxResponse } from "@stakecom/commune-sdk/types";
import { getBalances } from "@stakecom/commune-sdk";

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
  const { balance } = await getBalances({ address: signer.address });

  const result = await stakeCom({
    key: params.evmAddress,
    module: params.module,
    amount: balance,
    signer,
  });

  console.log(`🔥 stake result for ${signer.address}`, result);

  return { result };
}

function getActionParams(action: PendingAction) {
  const actionSchema = z.object({
    evmAddress: z.string(),
    module: z.string().min(3),
    amount: z.string(),
  });

  try {
    return actionSchema.parse(action);
  } catch (e) {
    return null;
  }
}
