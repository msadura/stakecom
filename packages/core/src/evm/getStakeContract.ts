import type { WalletClient } from "viem";
import { getContract } from "viem";

import { stakeComAIV1Abi } from "~/abi/stakeComAIV1";
import { publicClient } from "~/client";
import { STAKE_ADDRESS } from "~/constants";

export function getStakeContract(walletClient?: WalletClient) {
  return getContract({
    address: STAKE_ADDRESS,
    abi: stakeComAIV1Abi,
    client: { public: publicClient, wallet: walletClient },
  });
}
