import { stakeCom } from "~core/commune/stakeCom";
import { formatWCOMAmount } from "~core/utils/formatWCOMAmount";
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

  const result = await stakeCom({
    key: params.evmAddress,
    module: params.module,
    mnemonicEncrypted: params.mnemonicEncrypted,
    amount: formatWCOMAmount(params.amount),
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