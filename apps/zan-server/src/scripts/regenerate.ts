import { getEnv } from "../getEnv";
import { regenerateMiner } from "../utils/regenerateMiner";

const env = getEnv();
const { MINER_NAME, PORT } = env;

await regenerateMiner({ minerName: MINER_NAME, port: PORT });

console.log("🔥", `Regen done: ${MINER_NAME} :${PORT}`);

process.exit(0);
