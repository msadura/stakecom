import { bridgeApiRouter } from "~core/bridge";
import { getSignerForEvmAddress } from "~core/commune/getSignerForEvmAddress";
import { unstakeCom } from "~core/commune/unstakeCom";
import { MIN_WITHDRAW } from "~core/constants";
import { wCOMToCOMAmountValue } from "~core/utils/wCOMToCOMAmountValue";
import { getStakerWallet } from "~core/wallet";
import { updateStaker } from "~core/wallet/updateStaker";
import { z } from "zod";

import type { CommuneTxResponse } from "@stakecom/commune-sdk/types";
import {
  getBalances,
  KEEP_STAKE_BALANCE,
  transferAll,
} from "@stakecom/commune-sdk";
import { toAmountValue } from "@stakecom/commune-sdk/utils";

import type { PendingAction } from "~core/events/getPendingActions";

export async function initUnstakeAction(action: PendingAction): Promise<{
  result: CommuneTxResponse | null;
  canRetry?: boolean;
  pendingTransfer?: boolean;
  skipUpdate?: boolean;
}> {
  console.log("🔥", `Processing initUnstake action ${action.evmAddress}`);
  const { comAddress: bridgeComAddress } =
    await bridgeApiRouter.getDepositAddress(action.evmAddress);

  if (!bridgeComAddress) {
    return { result: null, canRetry: true };
  }

  const params = getActionParams(action);

  if (!params) {
    return { result: null, canRetry: false };
  }

  let result: CommuneTxResponse | null = null;
  const wallet = await getStakerWallet({ evmAddress: params.evmAddress });
  const signer = await getSignerForEvmAddress(params.evmAddress);
  const { stake } = await getBalances({ address: signer.address });
  const moduleStake = wallet?.moduleKey ? stake[wallet?.moduleKey] || 0n : 0n;

  const unstakeParamAmount = wCOMToCOMAmountValue(params.amount);
  const unstakeAll =
    params.unstakeAll ||
    moduleStake - unstakeParamAmount < toAmountValue(MIN_WITHDRAW);

  console.log("🔥", "unstakeAll", unstakeAll);

  // unstake
  if (!action.pendingTransfer) {
    result = await unstakeCom({
      moduleKey: wallet.moduleKey || "",
      unstakeAll,
      signer,
      amount: unstakeParamAmount,
    });

    console.log(`🔥 unstake res for ${signer.address}`, result);

    if (unstakeAll) {
      // unstaked - clear module key
      await updateStaker({
        evmAddress: params.evmAddress,
        updateInput: { moduleKey: "" },
      });
    }
  }

  // unstaked or having pending transfer
  if (result?.success || action.pendingTransfer) {
    console.log("🔥", "Transferring unstaked COM");
    try {
      // transfer funds to bridge address, to allow user claim them directly
      const transferRes = await transferAll({
        signer,
        recipient: bridgeComAddress,
        keepBalance: !unstakeAll ? toAmountValue(KEEP_STAKE_BALANCE) : 0n,
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
