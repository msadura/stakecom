import { HTTPException } from "hono/http-exception";

import { getValidators } from "../getValidators";
import { sleep } from "../sleep";

export async function verifyValidator(ip: string | undefined) {
  const validators = await getValidators({ refresh: false });
  const validatorIps = validators.map(
    (v) => v.address.split(":")[0] || v.address,
  );

  if (ip && validatorIps.includes(ip || "")) {
    return true;
  }

  // fake request - block with delay
  console.log("🔥", "Fake request - blocking with delay");
  await sleep(1000000);
  throw new HTTPException(400, { message: "NGMI" });
}
