import { cron } from "@elysiajs/cron";
import { Elysia } from "elysia";

import { processEvents } from "@stakecom/core";

const app = new Elysia()
  .get("/", () => "I'm ready!")
  .get("/j", () => ({ message: "Hello from Elysia", num: 1 }))
  .post(
    "/process",
    () => {
      console.log("🔥", "Manual process events trigger");

      processEvents().catch((error) => {
        console.log("🔥 Failed to run process events on request", error);
      });

      return { processingStarted: true };
    },
    {
      beforeHandle({ set, request: { headers } }) {
        const authorization = headers.get("Authorization") || "";
        const serverSecret = process.env.SERVER_SECRET;

        if (serverSecret && `Bearer ${serverSecret}` !== authorization) {
          set.status = 401;

          throw new Error("Unauthorized");
        }
      },
    },
  )
  .use(
    cron({
      name: "processEvents",
      // run every 1minute
      pattern: "0 */1 * * * *",
      run() {
        if (process.env.NODE_ENV !== "development") {
          processEvents().catch((error) => {
            console.log("🔥 Failed to run process events in cron", error);
          });
        }
      },
    }),
  )
  .on("start", () => {
    console.log("🚀 Elysia started");

    if (process.env.NODE_ENV !== "development") {
      processEvents().catch((error) => {
        console.log("🔥 Failed to run process events on start", error);
      });
    }
  })
  .listen(3535);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
