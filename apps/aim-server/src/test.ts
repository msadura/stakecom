import { queryMiner } from "./queryMiner";

await queryMiner({
  keyName: "chani1",
  prompt:
    "crypto forensics lang:en -is:retweet -meme -🚀 -t.me -https -http is:verified",
  minerName: "",
});

process.exit(0);
