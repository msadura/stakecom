import { getSubnetModules } from "@stakecom/commune-sdk";

import { handleNewKey } from "./utils/handleBannedMiner";
import { loadComKey } from "./utils/loadComKey";

// const mod = await getSubnetModules({ networkId: 17 });
// console.log("🔥a:", mod.active.length);
// console.log("🔥v:", mod.validators.length);
// console.log("🔥i:", mod.inactive.length);

const minerKey = await loadComKey("abarai1");
await handleNewKey({ minerKey });

process.exit(0);
