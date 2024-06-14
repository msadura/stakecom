import { z } from "zod";

const patternSchema = z.string().transform((value) => new RegExp(value, "i"));

const minerSchema = z.object({
  pattern: patternSchema,
  label: z.string().optional(),
});

const configSchema = z.object({
  stats: z.array(minerSchema),
  unstake: z.array(minerSchema),
  register: z.array(minerSchema.extend({ ipTemplate: z.string() })),
});

export async function getConfig() {
  const current = import.meta.dir;
  const path = `${current}/config.json`;
  const file = Bun.file(path);

  const content: unknown = await file.json();

  return configSchema.parse(content);
}
