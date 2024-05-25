import { getFilteredKeys } from "./getKeys";
import { logBalance } from "./logBalance";

export async function getBalances(pattern: RegExp) {
  const keys = await getFilteredKeys(pattern);

  for (const key of keys) {
    await logBalance({ key, showDetails: true });
  }
}

await getBalances(/^jottei[1-9]+$/i);

process.exit();
