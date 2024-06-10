import { Hono } from "hono";
import { logger } from "hono/logger";

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
