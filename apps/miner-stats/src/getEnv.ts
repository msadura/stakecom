import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    network: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const NETWORK = Number(values.network || process.env.NETWORK) || 0;

export const getEnv = () => {
  console.log("🔥 NETWORK_ID", NETWORK);

  return {
    NETWORK_ID: NETWORK,
  };
};
