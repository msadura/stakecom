import { processPendingActions } from "~/events/processPendingActions";
import { pullEvents } from "~/events/pullEvents";

export async function processEvents() {
  console.log("⚙️ Processing events...");

  try {
    await pullEvents();
  } catch (error) {
    console.error("Error pulling events", error);
  }

  try {
    await processPendingActions();
  } catch (error) {
    console.error("Error processing pending actions", error);
  }
}
