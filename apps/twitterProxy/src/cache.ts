import type { ResponsePromise } from "ky";

import type { TweetsRes } from "./types";

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
      return cachedValue.value;
    }

    delete cache[key];
  }

  // if request is pending, wait for it to finish
  if (cachedValue?.pendingPromise) {
    try {
      const res = await cachedValue?.pendingPromise;
      const tweets: TweetsRes = await res.json();
      return tweets;
    } catch (error: any) {
      return undefined;
    }
  }
}
