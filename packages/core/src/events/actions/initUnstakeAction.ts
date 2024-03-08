import type { CommuneTxResponse } from "node_modules/@stakecom/commune-sdk/src/types";
import { z } from "zod";

import type { PendingAction } from "~/events/getPendingActions";
import { unstakeCom } from "~/commune/unstakeCom";
import { formatWCOMAmount } from "~/utils/formatWCOMAmount";

export async function initUnstakeAction(
  action: PendingAction,
): Promise<{ result: CommuneTxResponse | null; canRetry?: boolean }> {
  console.log("🔥", `Processing initUnstake action ${action.evmAddress}`);

  const params = getActionParams(action);
  if (!params) {
    return { result: null, canRetry: false };
  }

  const result = await unstakeCom({
    key: params.evmAddress,
    module: params.module,
    unstakeAll: params.unstakeAll,
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
    unstakeAll: z.boolean().optional(),
    mnemonicEncrypted: z.string().min(10),
  });

  try {
    return actionSchema.parse(action);
  } catch (e) {
    return null;
  }
}
