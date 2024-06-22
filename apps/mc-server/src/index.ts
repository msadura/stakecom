import type { StatusCode } from "hono/utils/http-status";
import { Hono } from "hono";
import { logger } from "hono/logger";
import ky, { HTTPError } from "ky";

import type { TweetsRes } from "./types";
import { checkMinerHealth, getMinerHealth } from "./checkMinerHealth";
import { getEnv } from "./getEnv";
import { getModules } from "./getModules";
import { validatorRequestBodySchema } from "./types";
import { getRequestIp } from "./utils/getRequestIp";
import { verifyValidator } from "./utils/verifyValidator";

const app = new Hono();

app.use(logger());

const { PORT, DEV_MODE, MINER_NAME, API_URL } = getEnv();

export default {
  port: PORT,
  fetch: app.fetch,
  host: "0.0.0.0",
};

app.post("/method/generate", async (c) => {
  // Do not fetch api if miner is unregistered or banned
  let health = getMinerHealth();
  // TODO - refresh health in this case to verify if miner is still unregistered

  if (!health.registered) {
    await checkMinerHealth(MINER_NAME);
    health = getMinerHealth();
  }

  if (!health.registered || health.lowEmission) {
    return c.json({ error: "Invalid miner state" }, 400);
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
      const { icon, ...minerHealth } = getMinerHealth();
      console.log(icon, `[${MINER_NAME}] health:`, minerHealth);
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
