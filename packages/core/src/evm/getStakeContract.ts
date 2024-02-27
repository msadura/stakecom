import type { WalletClient } from "viem";
import { getContract } from "viem";

import { stakeComAIV1 } from "~/abi/stakeComAIV1";
import { publicClient } from "~/client";
import { STAKE_ADDRESS } from "~/constants";

export function getStakeContract(walletClient?: WalletClient) {
  return getContract({
    address: STAKE_ADDRESS,
    abi: stakeComAIV1,
    client: { public: publicClient, wallet: walletClient },
  });
}
