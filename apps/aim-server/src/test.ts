import {
  deregister,
  estimateDeregisterFee,
  getBalances,
  getSigner,
  getSubnetModules,
  transferAll,
} from "@stakecom/commune-sdk";
import { formatCOMAmount } from "@stakecom/core/formatters";

import { classifyModules } from "./classifyModules";
import { getActiveModules } from "./getActiveModules";
import { loadComKey } from "./loadComKey";
import { queryMiner } from "./queryMiner";

// await queryMiner({
//   keyName: "chani1",
//   prompt:
//     "crypto forensics lang:en -is:retweet -meme -🚀 -t.me -https -http is:verified",
//   minerName: "",
// });

// await classifyModules();

// const mod = await getSubnetModules({ networkId: 17 });
// console.log("🔥a:", mod.active.length);
// console.log("🔥v:", mod.validators.length);
// console.log("🔥i:", mod.inactive.length);

const key = await loadComKey("hakuna2");
const signer = await getSigner(key.mnemonic);

const { balance } = await getBalances({
  networkId: 17,
  address: key.ss58_address,
});
console.log("🔥b", formatCOMAmount(balance));
// await transferAll({
//   recipient: "5Fh5GBGmsDV5Sz11Vj6KcPCixHoTtBNK2LQLK5jq9VjQTK5w",
//   signer,
// });

await estimateDeregisterFee({ networkId: 17, signer }).then((data) => {
  console.log("🔥fee:", formatCOMAmount(data.toBigInt()));
});

await deregister({ networkId: 17, signer })
  .then((data) => {
    console.log("🔥", data);
  })
  .catch((e) => {
    console.log("🔥", "qq");
  });

process.exit(0);
