import type { StatusCode } from "hono/utils/http-status";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPError } from "ky";
import { random } from "lodash";
import ms from "pretty-ms";

import { getEnv } from "./getEnv";
import { getModules } from "./getModules";
import { queryLibreTranslate } from "./queryLibreTranslate";
import { validatorRequestBodySchema } from "./types";
import { checkMinerHealth, getMinerHealth } from "./utils/checkMinerHealth";
import { fixMinerHealth } from "./utils/fixMinerHealth";
import { verifyValidator } from "./utils/verifyValidator";

const LIBRE_TRANSLATE_API_KEY = process.env.LIBRE_TRANSLATE_API_KEY;

if (!LIBRE_TRANSLATE_API_KEY) {
  throw new Error("LIBRE_TRANSLATE_API_KEY var is required");
}

const app = new Hono();
app.use(logger());

const { PORT, DEV_MODE, MINER_NAME } = getEnv();

export default {
  port: PORT,
  fetch: app.fetch,
  host: "0.0.0.0",
};

const NETWORK_ID = 13;

app.post("/method/generate", async (c) => {
  // Do not fetch api if miner is unregistered or banned
  let health = getMinerHealth();
  // TODO - load miner key and check if target_key from body is the same

  if (!health.registered) {
    await checkMinerHealth(MINER_NAME);
    health = getMinerHealth();
  }

  if (!health.registered || health.lowEmission) {
    console.log(
      "🔥",
      "Invalid miner state - 400 qq",
      `[${MINER_NAME}] registered: ${health.registered}, active: ${health.active}, lowEmission: ${health.lowEmission}, deregistrations: ${health.registrations}, bans: ${health.bans}`,
    );
    return c.json({ error: "Invalid miner state" }, 400);
  }

  const req = c.req;

  const reqPublicKey = req.header("X-KEY");
  if (!reqPublicKey) {
    console.log("❌", "Missing X-KEY header");
    return c.json({ error: "Missing X-KEY header" }, 400);
  }

  if (!DEV_MODE) {
    await verifyValidator(c);
  } else {
    console.log("🔥", "DEV_MODE enabled, skipping ip check");
  }

  const body = await req.json();
  console.log("🔥 body", body);
  const parsedBody = validatorRequestBodySchema.parse(body);

  const startTimestamp = performance.now();

  try {
    const res = await queryLibreTranslate({
      prompt: parsedBody.params.prompt,
      source: parsedBody.params.source_language,
      target: parsedBody.params.target_language,
    });
    const endTimestamp = performance.now();
    const time = endTimestamp - startTimestamp;

    console.log(`✔️ 200 OK (${MINER_NAME}) ${ms(time)}`);

    return c.json({ answer: res }, 200);
  } catch (error: any) {
    if (error instanceof HTTPError) {
      console.log(
        `⭕ ${error.response.status} ${error.response.statusText} (${MINER_NAME}) '${await error.response.text()}'`,
      );

      return c.json(
        { error: error.response.statusText },
        error.response.status as StatusCode,
      );
    }

    console.log(`⭕ (${MINER_NAME}) '${await error.message}'`);

    return c.json({ error: error.message }, 500);
  }
});

// refresh miner state periodically
const refreshData = () => {
  checkMinerHealth(MINER_NAME)
    .then(() => {
      const { icon, ...minerHealth } = getMinerHealth();
      console.log(
        icon,
        `[${MINER_NAME}] registered: ${minerHealth.registered}, active: ${minerHealth.active}, lowEmission: ${minerHealth.lowEmission}, deregistrations: ${minerHealth.registrations}, bans: ${minerHealth.bans}`,
      );

      return fixMinerHealth({
        minerName: MINER_NAME,
        port: Number(PORT),
        networkId: NETWORK_ID,
      });
    })
    .catch(() => console.log("Failed to refresh health"));

  getModules({ refresh: true }).catch(() =>
    console.log("Failed to refresh modules"),
  );
};

// init between 0-90 seconds to avoid registering multiple miners at the same time
setTimeout(refreshData, random(0, 1.5, true) * 60 * 1000);

// run every 2-3 minutes at random to avoid spamming rpc at the same time
setInterval(refreshData, random(2, 3, true) * 60 * 1000);
