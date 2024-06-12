import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { z } from "zod";

import { queryMiner } from "./queryMiner";
import { validatorRequestBodySchema } from "./types";

const app = new Hono();

app.use(logger());

const port = process.env.PORT || 8813;
const MINER_NAME = process.env.MINER_NAME;

if (!MINER_NAME) {
  throw new Error("MINER_NAME var is required");
}

console.log("🔥 MINER_NAME: ", MINER_NAME);
console.log("🔥 PORT: ", port);

export default {
  port,
  fetch: app.fetch,
};

app.post("/method/generate", async (c) => {
  const req = c.req;

  const body = await req.json();
  const parsedBody = validatorRequestBodySchema.parse(body);

  const res = await queryMiner({
    prompt: parsedBody.param.prompt,
    keyName: MINER_NAME,
  });

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
