import type { Address } from "viem";
import { getStakeContract } from "~core/evm";
import { getStakerWallet } from "~core/wallet";
import { updateStaker } from "~core/wallet/updateStaker";

import { getBalances } from "@stakecom/commune-sdk";

export async function refreshStakerBalance(evmAddress: string) {
  const staker = await getStakerWallet({ evmAddress });

  if (!staker?.ss58Address) {
    return;
  }

  try {
    const { balance, stake: allStakes } = await getBalances({
      address: staker.ss58Address,
    });
    const stake = staker.moduleKey
      ? allStakes[staker.moduleKey]
      : staker.stake || "0";

    const stakeContract = getStakeContract();
    const [depositBalance, _, moduleKey] = await stakeContract.read.stakers([
      evmAddress as Address,
    ]);

    return updateStaker({
      evmAddress,
      updateInput: {
        stake: stake?.toString() || "0",
        balance: balance?.toString() || "0",
        deposit: depositBalance?.toString() || staker.deposit || "0",
        moduleKey: moduleKey || staker.moduleKey || "",
      },
    });
  } catch (e) {
    console.error(`Failed to refresh user balances ${evmAddress}`, e);
  }
}
