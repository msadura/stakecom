import { getStakerWallet } from "~core/wallet";
import { updateStaker } from "~core/wallet/updateStaker";

import { getBalances } from "@stakecom/commune-sdk";

export async function refreshStakerBalance(evmAddress: string) {
  const staker = await getStakerWallet(evmAddress);

  if (!staker?.ss58Address || !staker.module) {
    return;
  }

  try {
    const { balance, stake: allStakes } = await getBalances({
      address: staker.ss58Address,
    });
    const stake = allStakes[staker.module];

    return updateStaker({
      evmAddress,
      updateInput: {
        stake: stake?.toString() || staker.stake || "0",
        balance: balance?.toString() || staker.balance || "0",
      },
    });
  } catch (e) {
    console.error(`Failed to refresh user balances ${evmAddress}`, e);
  }
}
