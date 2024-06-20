import { z } from "zod";

const patternSchema = z.string().transform((value) => new RegExp(value, "i"));

const minerSchema = z.object({
  pattern: patternSchema,
  label: z.string().optional(),
});

const configSchema = z.object({
  stats: z.array(minerSchema),
  unstake: z.array(minerSchema),
  unstakeTargetAddress: z.string().min(1),
  unstakeMinLeftAmount: z.number().int().nonnegative().default(11), // 10 for registration fee + 1 for gas
  register: z.array(minerSchema.extend({ ipTemplate: z.string() })),
});

export async function getConfig() {
  const current = import.meta.dir;
  const path = `${current}/config.json`;
  const file = Bun.file(path);

  const content: unknown = await file.json();

  return configSchema.parse(content);
}
