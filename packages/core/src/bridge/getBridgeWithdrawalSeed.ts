import type { Address } from "viem";
import { bridgeApiRouter } from "~core/bridge";
import { getBridgeContract } from "~core/bridge/getBridgeContract";

import type { BridgeWithdrawalSeed } from "~core/bridge";

export type BridgeWithdrawalData = {
  claimableAmount: string;
} & BridgeWithdrawalSeed;

export async function getBridgeWithdrawalSeed(evmAddress: string) {
  const seed = await bridgeApiRouter.getWithdrawalSeed(evmAddress);
  const claimed = await getBridgeContract().read.claimedTokens([
    evmAddress as Address,
  ]);
  const claimableAmount = BigInt(seed.amount) - claimed;

  return {
    ...seed,
    claimableAmount: claimableAmount.toString(),
  };
}
