import type { ResponsePromise } from "ky";

import type { TweetsRes } from "./types";
import { shuffleCachedTweetsRes } from "./shuffleCachedTweetsRes";
import { sleep } from "./sleep";

export interface CacheValue {
  age: number;
  value: TweetsRes;
}

const cache: Record<
  string,
  {
    timestamp: number | null;
    value: TweetsRes | null;
    pendingPromise: ResponsePromise | null;
  }
> = {};

export const setPendingPromise = (key: string, promise: ResponsePromise) => {
  cache[key] = { timestamp: null, value: null, pendingPromise: promise };
};

export function setCachedValue(key: string, value: TweetsRes) {
  cache[key] = { timestamp: Date.now(), value, pendingPromise: null };
}

export async function getCachedValue(key: string, maxAgeMs: number) {
  const cachedValue = cache[key];

  if (cachedValue?.value && cachedValue.timestamp) {
    const age = Date.now() - cachedValue.timestamp;
    if (age < maxAgeMs) {
      return { age, value: shuffleCachedTweetsRes(cachedValue.value) };
    }

    const ageInSeconds = Math.floor(age / 1000);

    console.log("🔵🟡", `[${ageInSeconds}s] Stale cache entry`, key);

    delete cache[key];
  }

  // if request is pending, wait for it to finish
  if (cachedValue?.pendingPromise) {
    console.log("🔵", "Waiting pending promise");
    try {
      await cachedValue?.pendingPromise;
      await sleep(100);

      console.log("🔵🟢", "Resolved pending cache promise");

      return getCachedValue(key, maxAgeMs);
    } catch (error: any) {
      console.log("🔵🟡", "Failed to wait for cache promise", key, error);
      return undefined;
    }
  }
}
