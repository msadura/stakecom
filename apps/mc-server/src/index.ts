import type { StatusCode } from "hono/utils/http-status";
import { Hono } from "hono";
import { logger } from "hono/logger";
import ky, { HTTPError } from "ky";

import type { TweetsRes } from "./types";
import { checkMinerHealth, getMinerHealth } from "./checkMinerHealth";
import { getModules } from "./getModules";
import { validatorRequestBodySchema } from "./types";
import { getRequestIp } from "./utils/getRequestIp";
import { verifyValidator } from "./utils/verifyValidator";

const app = new Hono();

app.use(logger());

const PORT = process.env.PORT;
const MINER_NAME = process.env.MINER_NAME;
const API_URL = process.env.API_URL || "http://good-fucking-proxy.com:3000";
const DEV_MODE = process.env.DEV_MODE === "true";

if (!MINER_NAME) {
  throw new Error("MINER_NAME var is required");
}

if (!PORT) {
  throw new Error("PORT var is required");
}

if (!API_URL) {
  throw new Error("API_URL var is required");
}

console.log("🔥 MINER_NAME: ", MINER_NAME);
console.log("🔥 PORT: ", PORT);
console.log("🔥 API_URL: ", API_URL);

export default {
  port: PORT,
  fetch: app.fetch,
  host: "0.0.0.0",
};

app.post("/method/generate", async (c) => {
  // Do not fetch api if miner is unregistered or banned
  const health = getMinerHealth();
  if (!health.registered || health.lowEmission) {
    return c.json({ error: "Invalid request" }, 400);
  }

  const req = c.req;

  if (!DEV_MODE) {
    const reqIp = getRequestIp(c);
    await verifyValidator(reqIp);
  } else {
    console.log("🔥", "DEV_MODE enabled, skipping ip check");
  }

  const body = await req.json();
  const parsedBody = validatorRequestBodySchema.parse(body);

  const queryParams = new URLSearchParams({
    query: parsedBody.params.prompt,
  }).toString();
  const requestUrl = `${API_URL}?${queryParams}`;

  const startTimestamp = performance.now();

  try {
    const res = await ky.get(requestUrl, {
      timeout: 12000,
    });

    const data: TweetsRes = await res.json();
    const endTimestamp = performance.now();
    const time = endTimestamp - startTimestamp;
    const timeInSec = time / 1000;

    console.log(`🟢 [SUCCESS] [${MINER_NAME}] - ${timeInSec.toFixed(2)}s`);

    return c.json(data.data, 200);
  } catch (error: any) {
    if (error instanceof HTTPError) {
      console.log(`🔴 [ERROR] [${MINER_NAME}] - ${error.response.status}`);

      return c.json(
        { error: error.response.statusText },
        error.response.status as StatusCode,
      );
    }

    console.log(`🔴 [ERROR] [${MINER_NAME}] - ${error.message}`);

    return c.json({ error: error.message }, 500);
  }
});

// refresh modules periodically
const refreshData = () => {
  console.log("🔥", "[REFRESH DATA]");

  checkMinerHealth(MINER_NAME)
    .then(() => {
      const minerHealth = getMinerHealth();
      console.log(minerHealth.icon, `[${MINER_NAME}] health:`, minerHealth);
    })
    .catch(() => console.log("Failed to refresh health"));
  getModules({ refresh: true }).catch(() =>
    console.log("Failed to refresh modules"),
  );
};

refreshData();

setInterval(
  refreshData,
  5 * 60 * 1000, // 5 minutes
);
