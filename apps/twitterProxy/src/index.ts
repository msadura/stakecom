import type { Context, Handler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import ky from "ky";

import type { CacheValue } from "./cache";
import type { TweetsRes, TwitterError } from "./types";
import { getCachedValue, setCachedValue, setPendingPromise } from "./cache";
import { getAuthToken } from "./getAuthToken";
import { queuedRequest } from "./requestQueue";
import { sleep } from "./sleep";

const app = new Hono();

app.use(logger());

const port = process.env.PORT || 3000;
const maxAgeMs = Number(process.env.MAX_AGE_MS) || 180_000;

console.log("🔥 PORT: ", port);
console.log("🔥 MAX_AGE_MS: ", maxAgeMs);

export default {
  port,
  fetch: app.fetch,
};

app.get("*", async (c, next) => {
  const { req } = c;
  const queryParams = req.query();
  const cacheKey = queryParams.query!;
  const cachedValue: CacheValue | undefined = await getCachedValue(
    cacheKey,
    maxAgeMs,
  );

  if (cachedValue) {
    const ageInSeconds = cachedValue?.age
      ? Math.floor(cachedValue.age / 1000)
      : 0;

    console.log(
      `🔵 AGE: [${ageInSeconds.toFixed(2)}s] Using cached value for key:`,
      cacheKey,
    );

    return c.json(cachedValue.value, 200);
  }

  return next();
});

app.get("/titter", basicProxy("https://api.twitter.com/2/tweets/search/all"));

const proxyHandler = async (c: Context, url: string, startTime: number) => {
  if (!url) {
    throw new HTTPException(400, { message: "destUrl is required" });
  }

  const cacheKey = c.req.query().query!;

  await sleep(10);
  // get value from cache
  const cachedValue: CacheValue | undefined = await getCachedValue(
    cacheKey,
    maxAgeMs,
  );

  if (cachedValue) {
    const ageInSeconds = cachedValue?.age
      ? Math.floor(cachedValue.age / 1000)
      : 0;

    console.log(
      `🔵 AGE: [${ageInSeconds.toFixed(2)}s] Using cached value for key:`,
      cacheKey,
    );

    return c.json(cachedValue.value, 200);
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
      // delay: () => getRandomNumber(500, 2500),
    },
    hooks: {
      beforeRequest: [
        async () => {
          await sleep(getRandomNumber(50, 1000));
        },
      ],
      beforeRetry: [
        ({ retryCount }) => {
          console.log("🟡", "FAIL, retries:", retryCount);
        },
      ],
    },
  });

  try {
    setPendingPromise(cacheKey, req);

    const res = await req;
    const tweets: TweetsRes = await res.json();
    setCachedValue(cacheKey, tweets);

    const requestTimeSec = (Date.now() - startTime) / 1000;
    console.log(`🟢 [${requestTimeSec.toFixed(2)}s] FETCHED:`, cacheKey);

    return c.json(tweets, 200);
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const errorJson: TwitterError = await error.response.json();

      const oldCacheValue = await getCachedValue(cacheKey, 900_000);

      if (oldCacheValue) {
        console.log("🔵 USING OLD CACHE VALUE:", cacheKey);
        return c.json(oldCacheValue.value, 200);
      }

      if (!errorJson) {
        return c.json({ message: "Unknown error in proxy qq" }, 500);
      }

      console.log("🔴 FAILED QUERY:", cacheKey);

      return c.json(errorJson, errorJson.status as StatusCode);
    }
  }
};

function basicProxy(url: string): Handler {
  return async (c) => queuedRequest(() => proxyHandler(c, url, Date.now()));
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
