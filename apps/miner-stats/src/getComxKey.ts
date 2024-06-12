// @ts-expect-error - no types
import { homedir } from "bun-utilities/os";

import type { ComKey } from "./getKeys";

export async function getComxKey(keyName: string) {
  const path = `${homedir()}/.commune/key/${keyName}.json`;
  const file = Bun.file(path);
  const data = await file.json();

  // TODO: zod schema
  const comKey = JSON.parse(data.data) as ComKey;
  console.log("🔥", comKey);
  return comKey;
}
