import { z } from "zod";

import type { CommuneTxResponse } from "@stakecom/commune-sdk/types";

import type { PendingAction } from "~/events/getPendingActions";

export function changeModuleAction(
  action: PendingAction,
): Promise<{ result: CommuneTxResponse | null; canRetry?: boolean }> {
  const params = getActionParams(action);
  console.log("🔥", `Processing stake action ${action.evmAddress}`);

  console.log("🔥", params);

  throw new Error("Change Module not implemented");
}

function getActionParams(action: PendingAction) {
  const actionSchema = z.object({});

  try {
    return actionSchema.parse(action);
  } catch (e) {
    return null;
  }
}
