import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { z } from "zod";

import { getActiveModules } from "./getActiveModules";
import { queryMiner } from "./queryMiner";
import { sleep } from "./sleep";
import { validatorRequestBodySchema } from "./types";

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

  const body = await req.json();
  const parsedBody = validatorRequestBodySchema.parse(body);

  const res = await Promise.race([
    queryMiner({
      prompt: parsedBody.params.prompt,
      keyName: MINER_NAME,
    }),
    queryMiner({
      prompt: parsedBody.params.prompt,
      keyName: MINER_NAME,
    }),
    queryMiner({
      prompt: parsedBody.params.prompt,
      keyName: MINER_NAME,
    }),
    sleep(15000),
  ]);

  // TODO: what if request fails?

  return c.json(res || []);
});

const queryMinerSchema = z.object({
  // todo - accept only valid keys?
  keyName: z.string(),
});

app.post("/queryMiner", zValidator("query", queryMinerSchema), async (c) => {
  const query = c.req.valid("query");

  try {
    const result = await queryMiner({
      keyName: query.keyName,
      prompt:
        "crypto futures lang:en -is:retweet -meme -🚀 -t.me -https -http is:verified",
    });

    return c.json({ data: result, meta: {} });
  } catch (e) {
    throw new HTTPException(400, { message: "Unrecognized keyName" });
  }
});

// refresh modules periodically
const refreshModules = () => {
  console.log("🔥", "Refreshing modules list");
  getActiveModules({ ignoreBlacklist: true, refresh: true }).catch(() =>
    console.log("Failed to refresh modules"),
  );
};

refreshModules();

setInterval(
  refreshModules,
  5 * 60 * 1000, // 5 minutes
);
