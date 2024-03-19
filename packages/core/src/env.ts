import type { TypeOf } from "zod";
import { z } from "zod";

const zodEnv = z.object({
  USE_TESTNET: z
    .string()
    .toLowerCase()
    .optional()
    .transform((x) => x === "true")
    .pipe(z.boolean()),
  ENCRYPTION_SECRET: z.string().min(20),
  SIGNER_MNEMONIC: z.string().min(30),
});

export type ProcessEnv = TypeOf<typeof zodEnv>;

export const env: ProcessEnv = zodEnv.parse(process.env);
