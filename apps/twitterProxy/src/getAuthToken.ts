const keys = [
  process.env.BEARER_1,
  process.env.BEARER_2,
  process.env.BEARER_2,
].filter((t): t is string => !!t);

const maxIndex = keys.length - 1;
let lastIndex = 0;

console.log("🔥 Self tokens count:", keys.length);

export function getAuthToken(): string {
  // pick items in a round-robin fashion
  lastIndex = lastIndex === maxIndex ? 0 : lastIndex + 1;

  console.log("🔥", "Using auth token number:", lastIndex);

  return keys[lastIndex]!;
}
