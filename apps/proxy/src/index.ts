import type { Handler } from "hono";
import { Hono } from "hono";

import { getCachedValue, setCachedValue } from "./cache";

const app = new Hono();

const port = process.env.PORT || 3000;
const maxAgeMs = Number(process.env.MAX_AGE_MS) || 2000;
const defaultDestUrl = process.env.DEFAULT_DEST_URL || "";

console.log("🔥 PORT: ", port);
console.log("🔥 MAX_AGE_MS: ", maxAgeMs);
console.log("🔥 DEFAULT_DEST_URL: ", defaultDestUrl);

export default {
  port,
  fetch: app.fetch,
};

app.get("*", async (c, next) => {
  const { req } = c;
  const queryParams = req.query();
  const cacheKey = new URLSearchParams(queryParams).toString();
  const cachedValue = getCachedValue(cacheKey, maxAgeMs);

  if (cachedValue) {
    console.log("🔥 Using cached value for key:", cacheKey);
    try {
      const res = JSON.parse(cachedValue);

      return new Response(res, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(cachedValue);
    }
  }

  return next();
});

app.get("/", basicProxy(defaultDestUrl));

function basicProxy(destUrl = ""): Handler {
  return async (c) => {
    const destUrlQuery = decodeURIComponent(c.req.query().destUrl || "");

    let url = destUrl ? destUrl : destUrlQuery;

    if (!url) {
      return new Response("Destination URL not provided", { status: 400 });
    }

    // add params to URL
    if (c.req.query()) {
      const query = new URLSearchParams(c.req.query());
      query.delete("destUrl");

      url = `${url}?${query.toString()}`;
    }

    // request
    const rep = await fetch(url, {
      method: c.req.method,
      headers: c.req.raw.headers,
      body: c.req.raw.body,
    });

    if (rep.status === 101) return rep;

    if (rep.ok) {
      try {
        const tempRes = new Response(rep.body, rep);
        const data = await tempRes.text();

        setCachedValue(
          new URLSearchParams(c.req.query()).toString(),
          JSON.stringify(data),
        );
      } catch (error) {
        console.log("🔥 Failed to cache value", error);
      }
    }

    return new Response(rep.body, rep);
  };
}
