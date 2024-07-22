import type { StatusCode } from "hono/utils/http-status";
import { Hono } from "hono";
import ky, { HTTPError } from "ky";
import { random } from "lodash";
import ms from "pretty-ms";

import type { TweetsRes } from "./types";
import { getEnv } from "./getEnv";
import { getModules } from "./getModules";
import { validatorRequestBodySchema } from "./types";
import { checkMinerHealth, getMinerHealth } from "./utils/checkMinerHealth";
import { fixMinerHealth } from "./utils/fixMinerHealth";
import { getRequestIp } from "./utils/getRequestIp";
import { sleep } from "./utils/sleep";
import { verifyValidator } from "./utils/verifyValidator";

const app = new Hono();

const { PORT, DEV_MODE, MINER_NAME, API_URL, EMPTY_RES_MODE } = getEnv();

export default {
  port: PORT,
  fetch: app.fetch,
  host: "0.0.0.0",
};

const MAX_RESULTS = 50;
const START_TIME = "2024-04-01T5:00:00Z";
const NETWORK_ID = 17;

app.post("/method/generate", async (c) => {
  // Do not fetch api if miner is unregistered or banned
  let health = getMinerHealth();
  // TODO - load miner key and check if targe_key from body is the same

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

  if (EMPTY_RES_MODE) {
    await sleep(random(50, 200));

    return c.json([], 200);
  }

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
    max_results: MAX_RESULTS.toString(),
    start_time: START_TIME,
    "user.fields": "id,username,name",
    "tweet.fields": "created_at,author_id",
  }).toString();

  const requestUrl = `${API_URL}?${queryParams}`;

  const startTimestamp = performance.now();

  try {
    const res = await ky.get(requestUrl, {
      retry: 0, // retries handled by the proxy
      timeout: 16 * 1000, // proxy times out after 15s so we need to give it extra margin
    });

    const data: TweetsRes = await res.json();
    const endTimestamp = performance.now();
    const time = endTimestamp - startTimestamp;

    console.log(
      `✔️ ${res.status} ${res.statusText} (${MINER_NAME}) ${ms(time)}`,
    );

    return c.json(data.data, 200);
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
