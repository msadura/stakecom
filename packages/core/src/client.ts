import { chain } from "~core/constants";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.RPC_URL),
});
