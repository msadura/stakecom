const keys = [
  process.env.BEARER_1,
  process.env.BEARER_2,
  process.env.BEARER_2,
].filter((t): t is string => !!t);

console.log("🔥 Self tokens count:", keys.length);

export default function getRandomAuthToken(): string {
  const randomIndex = Math.floor(Math.random() * keys.length);

  return keys[randomIndex]!;
}
