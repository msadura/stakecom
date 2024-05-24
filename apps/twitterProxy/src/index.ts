import type { Handler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import ky from "ky";

import type { TweetsRes, TwitterError } from "./types";
import { getCachedValue, setCachedValue, setPendingPromise } from "./cache";

const app = new Hono();

const port = process.env.PORT || 3000;
const maxAgeMs = Number(process.env.MAX_AGE_MS) || 20000;

console.log("🔥 PORT: ", port);
console.log("🔥 MAX_AGE_MS: ", maxAgeMs);

export default {
  port,
  fetch: app.fetch,
};

app.get("*", async (c, next) => {
  const { req } = c;
  const queryParams = req.query();
  const cacheKey = new URLSearchParams(queryParams).toString();
  const cachedValue: TweetsRes | undefined = await getCachedValue(
    cacheKey,
    maxAgeMs,
  );

  if (cachedValue) {
    console.log("🔵 Using cached value for key:", cacheKey);

    return c.json(cachedValue, 200);
  }

  return next();
});

app.get("/titter", basicProxy("https://api.twitter.com/2/tweets/search/all"));

function basicProxy(url: string): Handler {
  return async (c) => {
    if (!url) {
      throw new HTTPException(400, { message: "destUrl is required" });
    }

    const queryParams = new URLSearchParams(c.req.query()).toString();
    const headers = c.req.header();

    console.log("🟢 FETCH QUERY:", c.req.query().query);

    const requestUrl = `${url}?${queryParams}`;

    const req = ky.get(requestUrl, {
      headers: {
        Authorization: headers.authorization,
        "user-agent": "v2FullArchiveSearchPython",
      },
      retry: {
        limit: 10,
      },
      hooks: {
        beforeRetry: [
          ({ retryCount }) => {
            console.log("🟡", "Request failed, retries:", retryCount);
          },
        ],
      },
    });

    try {
      setPendingPromise(new URLSearchParams(c.req.query()).toString(), req);

      const res = await req;
      const tweets: TweetsRes = await res.json();
      setCachedValue(new URLSearchParams(c.req.query()).toString(), tweets);

      return c.json(tweets, 200);
    } catch (error: any) {
      if (error.name === "HTTPError") {
        const errorJson: TwitterError = await error.response.json();

        if (!errorJson) {
          return c.json({ message: "Unknown error in proxy qq" }, 500);
        }

        return c.json(errorJson, errorJson.status as StatusCode);
      }
    }
  };
}
