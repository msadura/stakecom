import { Hono } from "hono";
import { logger } from "hono/logger";
import { get } from "lodash";

import { classifyModules } from "./classifyModules";
import { getActiveModules } from "./getActiveModules";
import { queryMiner } from "./queryMiner";
import { sleep } from "./sleep";
import { validatorRequestBodySchema } from "./types";
import { getRequestIp } from "./utils/getRequestIp";
import { verifyValidator } from "./utils/verifyValidator";

const app = new Hono();

app.use(logger());

const PORT = process.env.PORT;
const MINER_NAME = process.env.MINER_NAME;

if (!MINER_NAME) {
  throw new Error("MINER_NAME var is required");
}

if (!PORT) {
  throw new Error("PORT var is required");
}

console.log("🔥 MINER_NAME: ", MINER_NAME);
console.log("🔥 PORT: ", PORT);

export default {
  port: PORT,
  fetch: app.fetch,
};

app.post("/method/generate", async (c) => {
  const req = c.req;
  const reqIp = getRequestIp(c);
  await verifyValidator(reqIp);

  const body = await req.json();
  const parsedBody = validatorRequestBodySchema.parse(body);

  try {
    const res = await Promise.any([
      queryMiner({
        prompt: parsedBody.params.prompt,
        keyName: MINER_NAME,
      }),
      // queryMiner({
      //   prompt: parsedBody.params.prompt,
      //   keyName: MINER_NAME,
      // }),
      // queryMiner({
      //   prompt: parsedBody.params.prompt,
      //   keyName: MINER_NAME,
      // }),
      sleep(12000),
    ]);

    return c.json(res || []);
  } catch (e) {
    // TODO: what if request fails?
    return c.json([]);
  }
});

app.post("/classifyMiners", async (c) => {
  await classifyModules();

  return c.json([]);
});

// refresh modules periodically
const refreshModules = () => {
  console.log("🔥", "Refreshing modules list");
  getActiveModules({ ignoreBlacklist: true, refresh: true })
    .then(() => classifyModules({ skipLogs: true }))
    .catch(() => console.log("Failed to refresh and classify P>modules"));
};

refreshModules();

setInterval(
  refreshModules,
  5 * 60 * 1000, // 5 minutes
);
