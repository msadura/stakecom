import { z } from "zod";

export const comKeySchema = z.object({
  path: z.string(),
  mnemonic: z.string(),
  public_key: z.string(),
  private_key: z.string(),
  ss58_address: z.string(),
  seed_hex: z.string(),
  ss58_format: z.literal(42),
  crypto_type: z.literal(1),
  derive_path: z.string().nullable(),
});

export type ComKey = z.infer<typeof comKeySchema>;
