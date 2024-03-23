import { processPendingActions } from "~core/events/processPendingActions";
import { pullEvents } from "~core/events/pullEvents";

let isProcessing = false;

export async function processEvents() {
  console.log("🔥", "test process reload");
  if (isProcessing) {
    console.log("🚧 Already processing events, skipping.");
    return;
  }

  console.log("⚙️ Processing events...");
  isProcessing = true;

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

  isProcessing = false;
}
