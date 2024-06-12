import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { z } from "zod";

import { queryMiner } from "./queryMiner";

const app = new Hono();

app.use(logger());

const port = process.env.PORT || 8813;

console.log("🔥 PORT: ", port);

export default {
  hostname: "0.0.0.0",
  port,
  fetch: app.fetch,
};

app.post("/method/generate", async (c) => {
  const req = c.req;

  const body = await req.json();
  console.log("🔥 query: ", req.query());
  console.log("🔥 headers", req.header());
  console.log("🔥 body", body);

  return c.json({ data: [], meta: {} });
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
