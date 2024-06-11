import ky from "ky";

import {
  getSignedMessage,
  getSigner,
  getSubnetModules,
} from "@stakecom/commune-sdk";
import { u8aToHex, u8aToString } from "@stakecom/commune-sdk/utils";

import { getKeyByName } from "./getKeys";

export async function generate() {
  await getSubnetModules({ networkId: 17 });
  return;
  const chani2 = await getKeyByName("chani2");
  console.log("🔥", chani2);
  if (!chani2) {
    throw new Error("Key not found");
  }

  const signer = await getSigner(chani2.mnemonic);

  const timestamp = new Date().toISOString();

  const body = {
    params: {
      // get from original request
      prompt:
        "crypto forensics lang:en -is:retweet -meme -🚀 -t.me -https -http is:verified",
      // get target from chain modules list
      target_key: "5EXJ7QeeDU61m8Ymi9eMub8mFAW7DULNtPuiECRV6enJL3xo",
      timestamp,
    },
  };

  const bodyMessage = JSON.stringify({ ...body });
  const signedBody = getSignedMessage({
    signer,
    message: bodyMessage,
  });
  const signature = u8aToHex(signedBody);

  console.log("🔥 s", signature);

  try {
    const json = await ky
      .post("http://213.199.60.156:8141/method/generate", {
        json: body,
        headers: {
          "Content-Type": "application/json",
          "X-Signature": signature,
          "X-Timestamp": timestamp,
          "X-Crypto": "1",
          "X-Key": chani2.public_key,
        },
      })
      .json();

    console.log("🔥", json);
  } catch (e) {
    console.log("🔥", e.response);
  }
}

await generate();
