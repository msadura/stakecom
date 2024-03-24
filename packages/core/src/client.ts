import { chain } from "~core/constants";
import { env } from "~core/env";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
  chain,
  transport: http(env.RPC_URL),
});
