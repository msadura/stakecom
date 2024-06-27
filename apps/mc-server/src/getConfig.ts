import { z } from "zod";

const configSchema = z.object({
  bankKeyName: z.string().min(1),
  maxBurn: z.number().int().default(12),
  unstakeTargetAddress: z.string().min(1),
  serverIp: z.string().ip(),
});

export async function getConfig() {
  const current = import.meta.dir;
  const path = `${current}/config.json`;
  const file = Bun.file(path);

  const content: unknown = await file.json();

  const config = configSchema.parse(content);

  return config;
}
