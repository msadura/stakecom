import type { Handler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import type { ResponsePromise } from "ky";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import ky from "ky";

import type { TweetsRes, TwitterError } from "./types";
import { getCachedValue, setCachedValue, setPendingPromise } from "./cache";
import { getAuthToken } from "./getAuthToken";
import { sleep } from "./sleep";

const app = new Hono();

const port = process.env.PORT || 3000;
const maxAgeMs = Number(process.env.MAX_AGE_MS) || 60_000;

console.log("🔥 PORT: ", port);
console.log("🔥 MAX_AGE_MS: ", maxAgeMs);

export default {
  port,
  fetch: app.fetch,
};

let tempPendingPromise: ResponsePromise | null = null;

app.get("*", async (c, next) => {
  const { req } = c;
  const queryParams = req.query();
  const cacheKey = queryParams.query!;
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
    if (tempPendingPromise) {
      // only 1 twitter request at time
      console.log("⚪", "Waiting for temp pending promise");
      try {
        await tempPendingPromise;
      } catch (e) {
        // noop
      }
    }

    if (!url) {
      throw new HTTPException(400, { message: "destUrl is required" });
    }

    const queryParams = new URLSearchParams(c.req.query()).toString();
    const headers = c.req.header();

    const requestUrl = `${url}?${queryParams}`;
    const bearerToken = getAuthToken();

    const authorization = bearerToken
      ? `Bearer ${bearerToken}`
      : headers.authorization;

    const req = ky.get(requestUrl, {
      headers: {
        Authorization: authorization,
        "user-agent": "v2FullArchiveSearchPython",
      },
      retry: {
        limit: 10,
        delay: () => getRandomNumber(1000, 3000),
      },
      hooks: {
        beforeRequest: [
          async () => {
            await sleep(getRandomNumber(50, 2000));
          },
        ],
        beforeRetry: [
          ({ retryCount }) => {
            console.log("🟡", "Request failed, retries:", retryCount);
          },
        ],
      },
    });

    const cacheKey = c.req.query().query!;

    try {
      setPendingPromise(cacheKey, req);
      tempPendingPromise = req;

      const res = await req;
      const tweets: TweetsRes = await res.json();
      setCachedValue(cacheKey, tweets);

      console.log("🟢 FETCHED QUERY:", cacheKey);

      return c.json(tweets, 200);
    } catch (error: any) {
      if (error.name === "HTTPError") {
        const errorJson: TwitterError = await error.response.json();

        if (!errorJson) {
          return c.json({ message: "Unknown error in proxy qq" }, 500);
        }

        console.log("🔴 FAILED QUERY:", cacheKey);

        return c.json(errorJson, errorJson.status as StatusCode);
      }
    } finally {
      tempPendingPromise = null;
    }
  };
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
