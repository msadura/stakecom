import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    miner: {
      type: "string",
    },
    port: {
      type: "string",
    },
    apiUrl: {
      type: "string",
      default: "http://good-fucking-proxy.com:3000",
    },
    dev: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

const PORT = values.port || process.env.PORT;
const MINER_NAME = values.miner || process.env.MINER_NAME;
const API_URL =
  values.apiUrl || process.env.API_URL || "http://good-fucking-proxy.com:3000";
const DEV_MODE = values.dev || process.env.DEV_MODE === "true";

export const getEnv = () => {
  if (!MINER_NAME) {
    throw new Error("MINER_NAME var is required");
  }

  if (!PORT) {
    throw new Error("PORT var is required");
  }

  if (!API_URL) {
    throw new Error("API_URL var is required");
  }

  console.log("🔥 MINER_NAME: ", MINER_NAME);
  console.log("🔥 PORT: ", PORT);
  console.log("🔥 API_URL: ", API_URL);
  console.log("🔥 DEV_MODE: ", DEV_MODE);

  return {
    MINER_NAME,
    PORT,
    API_URL,
    DEV_MODE,
  };
};
