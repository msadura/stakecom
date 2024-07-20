import { getSubnetModules } from "@stakecom/commune-sdk";

const mod = await getSubnetModules({ networkId: 17 });
console.log("🔥 all modules:", mod.all.length);
// console.log("🔥a:", mod.active.length);
// console.log("🔥v:", mod.validators.length);
console.log("🔥 inactive:", mod.inactive.length);

// const minerKey = await loadComKey("abarai1");
// await handleNewKey({ minerKey });

// group names by ip
const ipMap = mod.all.reduce(
  (acc, cur) => {
    const ip = cur.address.split(":")[0] || cur.address;
    if (!acc[ip]) {
      acc[ip] = [];
    }
    acc[ip].push(cur.name);
    return acc;
  },
  {} as Record<string, string[]>,
);

// log each ip lenght and first name from array
Object.entries(ipMap).forEach(([ip, names]) => {
  console.log("🔥", ip, names.length, names[0]);
});

process.exit(0);
