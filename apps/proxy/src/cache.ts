const cache: Record<string, { timestamp: number; value: string }> = {};

export function setCachedValue(key: string, value: string) {
  cache[key] = { timestamp: Date.now(), value };
}

export function getCachedValue(key: string, maxAgeMs: number) {
  const cachedValue = cache[key];

  if (cachedValue) {
    const age = Date.now() - cachedValue.timestamp;
    if (age < maxAgeMs) {
      return cachedValue.value;
    }

    delete cache[key];
  }
}
