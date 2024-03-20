import type { WalletClient } from "viem";
import { stakeComAIAbi } from "~core/abi/stakeComAI";
import { publicClient } from "~core/client";
import { STAKE_ADDRESS } from "~core/constants";
import { getContract } from "viem";

export function getStakeContract(walletClient?: WalletClient) {
  return getContract({
    address: STAKE_ADDRESS,
    abi: stakeComAIAbi,
    client: { public: publicClient, wallet: walletClient },
  });
}
