import { encodeAddress, getSubnetModules } from "@stakecom/commune-sdk";

import { queryLibreTranslate } from "./queryLibreTranslate";

const qq = await queryLibreTranslate({
  prompt: "Handel, Handwerk und Dienstleistung vor Ort - näher geht nicht!\n",
  source: "de",
  target: "zh",
});

console.log("🔥", qq);

process.exit(0);
