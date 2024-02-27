import { createPublicClient, http } from "viem";
import { blastSepolia, mainnet } from "viem/chains";

const chain = process.env.USE_TESTNET ? blastSepolia : mainnet;

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.RPC_URL),
});
