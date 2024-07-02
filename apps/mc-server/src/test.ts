import { getSubnetModules } from "@stakecom/commune-sdk";

import { loadComKey } from "./utils/loadComKey";
import { handleNewKey } from "./utils/regenerateMiner";

const mod = await getSubnetModules({ networkId: 17 });
console.log("🔥 all count:", mod.all.length);
// console.log("🔥a:", mod.active.length);
// console.log("🔥v:", mod.validators.length);
console.log("🔥i:", mod.inactive.length);

// const minerKey = await loadComKey("abarai1");
// await handleNewKey({ minerKey });

process.exit(0);
