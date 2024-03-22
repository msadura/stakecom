import { changeModuleAction } from "~core/events/actions/changeModuleAction";
import { initUnstakeAction } from "~core/events/actions/initUnstakeAction";
import { stakeComAction } from "~core/events/actions/stakeComAction";
import { updateEvent } from "~core/events/updateEvent";
import { refreshStakerBalance } from "~core/wallet/refreshStakerBalance";

import type { PendingAction } from "~core/events/getPendingActions";

const MAX_RETRIES = 3;

export async function actionHandler(action: PendingAction) {
  try {
    const res = await handleAction(action);

    // success
    if (res.result?.success) {
      await updateEvent({
        id: action.id,
        updateInput: { status: "completed", communeTxHash: res.result.txHash },
      });

      try {
        await refreshStakerBalance(action.evmAddress);
      } catch (e) {
        console.error(
          `Failed to refresh user balances ${action.evmAddress} after action ${action.eventType}`,
          e,
        );
      }

      return true;
    }

    if (res.skipUpdate) {
      // do nothing, just skip
      return false;
    }

    // transfer funds step did not work, retry later
    if (res.pendingTransfer) {
      await updateEvent({
        id: action.id,
        updateInput: { pendingTransfer: true },
      });

      return false;
    }

    // wrong data, no need to retry
    if (!res.result && !res.canRetry) {
      await updateEvent({ id: action.id, updateInput: { status: "failed" } });
      return false;
    }

    // something went wrong, retry
    return handleUnsuccessfulAction(action);
  } catch (e) {
    console.log("🔥 action failed", e);
    return handleUnsuccessfulAction(action);
  }
}

async function handleAction(action: PendingAction) {
  switch (action.eventType) {
    case "stake":
      return stakeComAction(action);
    case "initUnstake":
      return initUnstakeAction(action);
    case "changeModule":
      return changeModuleAction(action);
    default:
      return { result: null, canRetry: false, pendingTransfer: false };
  }
}

async function handleUnsuccessfulAction(action: PendingAction) {
  if (!action.retries || action?.retries < MAX_RETRIES) {
    await updateEvent({
      id: action.id,
      updateInput: { status: "pending", retries: (action.retries || 0) + 1 },
    });
  } else {
    await updateEvent({ id: action.id, updateInput: { status: "failed" } });
  }

  return false;
}
