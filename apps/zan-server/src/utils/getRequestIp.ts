import type { Context } from "hono";
import { getConnInfo } from "hono/bun";
import { HTTPException } from "hono/http-exception";

export function getRequestIp(c: Context) {
  const connInfo = getConnInfo(c);

  if (connInfo.remote.addressType !== "IPv4") {
    throw new HTTPException(400, {
      message: `Invalid address type: ${connInfo.remote.addressType}`,
    });
  }

  return connInfo.remote.address;
}
