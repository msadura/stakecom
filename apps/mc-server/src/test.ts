import { getSubnetModules } from "@stakecom/commune-sdk";

const mod = await getSubnetModules({ networkId: 17 });
console.log("🔥a:", mod.active.length);
console.log("🔥v:", mod.validators.length);
console.log("🔥i:", mod.inactive.length);

process.exit(0);
