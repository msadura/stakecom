import type { PendingAction } from "~/events/getPendingActions";
import { changeModuleAction } from "~/events/actions/changeModuleAction";
import { initUnstakeAction } from "~/events/actions/initUnstakeAction";
import { stakeComAction } from "~/events/actions/stakeComAction";
import { updateEvent } from "~/events/updateEvent";

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

      return;
    }

    // wrong data, no need to retry
    if (!res.result && !res.canRetry) {
      await updateEvent({ id: action.id, updateInput: { status: "failed" } });
      return;
    }

    // something went wrong, retry
    return handleUnsuccessfulAction(action);
  } catch (e) {
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
      return { result: null, canRetry: false };
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
}
