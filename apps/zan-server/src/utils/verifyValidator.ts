import type { Context } from "hono";

import { encodeAddress } from "@stakecom/commune-sdk";
import { isHex } from "@stakecom/commune-sdk/utils";

import { getValidators } from "../getValidators";

export async function verifyValidator(c: Context) {
  // const ip = getRequestIp(c);

  const reqPublicKey = c.req.header("X-KEY");
  if (!reqPublicKey) {
    console.log("❌", "Missing X-KEY header");
    return c.json({ error: "Missing X-KEY header" }, 400);
  }

  const reqKey = encodeAddress(
    isHex(reqPublicKey) ? reqPublicKey : `0x${reqPublicKey}`,
  );

  const validators = await getValidators({ refresh: false });
  // const validatorIps = validators.map(
  //   (v) => v.address.split(":")[0] || v.address,
  // );

  const validator = validators.find((v) => v.key === reqKey);

  console.log("🔥 Vali req:", validator?.name || "unknown QQ");

  return true;

  // if (ip && validatorIps.includes(ip || "")) {
  //   return true;
  // }

  // fake request - block with delay
  // console.log("🔥", `Fake request - blocking with delay, ip: ${ip}`);
  // await sleep(1000000);
  // throw new HTTPException(400, { message: "NGMI" });
}
