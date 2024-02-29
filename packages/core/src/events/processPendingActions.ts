import { getPendingActions } from "~/events/getPendingActions";

export async function processPendingActions() {
  const actions = await getPendingActions();

  console.log("🔥", `Found ${actions.length} pending actions to process`);

  console.log("🔥", actions);

  // actions for each type stake / initUnstake / changeValidator
}
