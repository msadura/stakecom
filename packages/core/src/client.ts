import { createPublicClient, http } from "viem";

import { chain } from "~/constants";

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.RPC_URL),
});
