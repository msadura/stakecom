// @ts-expect-error - no types
import { homedir } from "bun-utilities/os";
import { z } from "zod";

const comKeySchema = z.object({
  path: z.string(),
  mnemonic: z.string(),
  public_key: z.string(),
  private_key: z.string(),
  ss58_address: z.string(),
  seed_hex: z.string(),
  ss58_format: z.number(),
  crypto_type: z.number(),
  derive_path: z.string().nullable(),
});

export type ComKey = z.infer<typeof comKeySchema>;

export async function loadComKey(keyName: string): Promise<ComKey> {
  const path = `${homedir()}/.commune/key/${keyName}.json`;
  const file = Bun.file(path);
  const fileData = await file.json();
  const comKey = JSON.parse(fileData.data as string);

  return comKeySchema.parse(comKey);
}
