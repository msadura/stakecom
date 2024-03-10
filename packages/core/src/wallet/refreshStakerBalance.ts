import { getStakerUser } from "~core/wallet";
import { updateStaker } from "~core/wallet/updateStaker";

import { getBalance, getStake } from "@stakecom/commune-sdk";

export async function refreshStakerBalance(evmAddress: string) {
  const stakerUser = await getStakerUser({ evmAddress });

  if (!stakerUser?.ss58Address || !stakerUser.module) {
    return;
  }

  const stakePromise = await getStake({
    key: stakerUser.evmAddress,
    module: stakerUser.module,
  });

  const balancePromise = await getBalance(stakerUser.evmAddress);

  try {
    const [stake, balance] = await Promise.all([stakePromise, balancePromise]);

    return updateStaker({
      evmAddress,
      updateInput: {
        stake: String(stake) || stakerUser.stake || "0",
        balance: String(balance) || stakerUser.balance || "0",
      },
    });
  } catch (e) {
    console.error(`Failed to refresh user balances ${evmAddress}`, e);
  }
}
