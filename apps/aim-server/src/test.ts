import { classifyModules } from "./classifyModules";
import { queryMiner } from "./queryMiner";

// await queryMiner({
//   keyName: "chani1",
//   prompt:
//     "crypto forensics lang:en -is:retweet -meme -🚀 -t.me -https -http is:verified",
//   minerName: "",
// });

await classifyModules();

process.exit(0);
