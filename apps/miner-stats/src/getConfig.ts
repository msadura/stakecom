import { z } from "zod";

const patternSchema = z.string().transform((value) => new RegExp(value, "i"));

const minerSchema = z.object({
  pattern: patternSchema,
  label: z.string().optional(),
});

const minerExtendedSchema = z.object({
  pattern: patternSchema,
  label: z.string().optional(),
  name: z.string(),
  ipTemplate: z.string(),
});

const configSchema = z.object({
  stats: z.array(minerSchema).optional(),
  unstake: z.array(minerSchema).optional(),
  register: z.array(minerSchema.extend({ ipTemplate: z.string() })).optional(),
  miners: z.array(minerExtendedSchema).optional(),
});

function getConfigFromeExtendedMiners(
  miners: z.infer<typeof configSchema>["miners"],
) {
  if (!miners) {
    throw new Error("Miners with all information are required");
  }

  const stats = miners.map((miner) => ({
    pattern: miner.pattern,
    label: miner.label,
  }));

  const unstake = miners.map((miner) => ({
    pattern: new RegExp(`^${miner.name}$[0-9]`, "i"),
    label: miner.label,
  }));

  const register = miners.map((miner) => ({
    pattern: miner.pattern,
    label: miner.label,
    ipTemplate: miner.ipTemplate,
  }));

  return {
    stats,
    unstake,
    register,
  };
}

export async function getConfig() {
  const current = import.meta.dir;
  const path = `${current}/config.json`;
  const file = Bun.file(path);

  const content: unknown = await file.json();

  const config = configSchema.parse(content);

  if (config.miners) {
    return getConfigFromeExtendedMiners(config.miners);
  }
}
