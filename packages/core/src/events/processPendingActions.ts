import { getPendingActions } from "~/events/getPendingActionts";

export async function processPendingActions() {
  const actions = await getPendingActions();

  console.log("🔥", actions);

  // actions for each type stake / initUnstake / changeValidator
}
