import { processEvents } from "~core/events";

export async function GET() {
  await processEvents();

  return Response.json({ message: "Events processed" });
}
