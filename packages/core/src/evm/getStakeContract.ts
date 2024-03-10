import type { WalletClient } from "viem";
import { stakeComAIV1Abi } from "~core/abi/stakeComAIV1";
import { publicClient } from "~core/client";
import { STAKE_ADDRESS } from "~core/constants";
import { getContract } from "viem";

export function getStakeContract(walletClient?: WalletClient) {
  return getContract({
    address: STAKE_ADDRESS,
    abi: stakeComAIV1Abi,
    client: { public: publicClient, wallet: walletClient },
  });
}
