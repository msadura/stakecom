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
  SDK_SERVER_SECRET: z.string(),
  SDK_SERVER_URL: z.string().url(),
  RPC_URL: z.string().url().optional(),
});

export type ProcessEnv = TypeOf<typeof zodEnv>;

export const env: ProcessEnv = zodEnv.parse(process.env);
