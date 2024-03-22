import { bridgeApiRouter } from "~core/bridge";
import { getSignerForEvmAddress } from "~core/commune/getSignerForEvmAddress";
import { unstakeCom } from "~core/commune/unstakeCom";
import { getStakerWallet } from "~core/wallet";
import { z } from "zod";

import type { CommuneTxResponse } from "@stakecom/commune-sdk/types";
import { transferAll } from "@stakecom/commune-sdk";

import type { PendingAction } from "~core/events/getPendingActions";

export async function initUnstakeAction(action: PendingAction): Promise<{
  result: CommuneTxResponse | null;
  canRetry?: boolean;
  pendingTransfer?: boolean;
}> {
  console.log("🔥", `Processing initUnstake action ${action.evmAddress}`);
  const { comAddress: bridgeComAddress } =
    await bridgeApiRouter.getDepositAddress(action.evmAddress);

  if (!bridgeComAddress) {
    return { result: null, canRetry: true };
  }

  const params = getActionParams(action);
  console.log("🔥 up", params);
  if (!params) {
    return { result: null, canRetry: false };
  }

  let result: CommuneTxResponse | null = null;
  const wallet = await getStakerWallet({ evmAddress: params.evmAddress });
  const signer = await getSignerForEvmAddress(params.evmAddress);

  // unstake
  if (!action.pendingTransfer) {
    result = await unstakeCom({
      module: wallet.moduleKey || "",
      unstakeAll: params.unstakeAll,
      signer,
      amount: BigInt(params.amount),
    });

    console.log("🔥 unstake res", result);
  }

  // TODO: handle case when user has no funds to unstake

  // unstaked or having pending transfer
  if (result?.success || action.pendingTransfer) {
    try {
      // transfer funds to bridge address, to allow user claim them directly
      const transferRes = await transferAll({
        signer,
        recipient: bridgeComAddress,
      });

      if (!transferRes?.success) {
        console.error("Error transferring funds to bridge", transferRes);
        return { result: null, canRetry: true, pendingTransfer: true };
      }

      return { result: transferRes };
    } catch (e) {
      console.error("Error transferring funds to bridge", e);
      return { result: null, canRetry: true, pendingTransfer: true };
    }
  }

  console.log("🔥 initUnstake res", result);

  return { result };
}

function getActionParams(action: PendingAction) {
  const actionSchema = z.object({
    evmAddress: z.string(),
    amount: z.string(),
    unstakeAll: z.boolean().optional(),
  });

  try {
    return actionSchema.parse(action);
  } catch (e) {
    return null;
  }
}
