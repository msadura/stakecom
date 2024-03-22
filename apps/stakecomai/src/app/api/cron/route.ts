import type { NextRequest } from "next/server";
import { processEvents } from "~core/events";

export async function GET(req: NextRequest) {
  console.log(
    "🔥auth",
    req.headers.get("Authorization"),
    process.env.CRON_SECRET,
  );
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await processEvents();

  return Response.json({ message: "Events processed" });
}
