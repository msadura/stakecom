import { getSubnetModules } from "@stakecom/commune-sdk";

import { classifyModules } from "./classifyModules";
import { getActiveModules } from "./getActiveModules";
import { queryMiner } from "./queryMiner";

// await queryMiner({
//   keyName: "chani1",
//   prompt:
//     "crypto forensics lang:en -is:retweet -meme -🚀 -t.me -https -http is:verified",
//   minerName: "",
// });

// await classifyModules();

const mod = await getSubnetModules({ networkId: 17 });
console.log("🔥a:", mod.active.length);
console.log("🔥v:", mod.validators.length);
console.log("🔥i:", mod.inactive.length);

process.exit(0);
