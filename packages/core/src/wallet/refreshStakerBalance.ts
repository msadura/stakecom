import { getComKey } from "~core/commune/getComKey";
import { getStakerWallet } from "~core/wallet";
import { updateStaker } from "~core/wallet/updateStaker";

import { getBalance, getStake } from "@stakecom/commune-sdk";

export async function refreshStakerBalance(evmAddress: string) {
  const staker = await getStakerWallet(evmAddress);
  await getComKey(staker.evmAddress, staker.mnemonicEncrypted);

  if (!staker?.ss58Address || !staker.module) {
    return;
  }

  const stakePromise = await getStake({
    key: staker.evmAddress,
    module: staker.module,
  });

  const balancePromise = await getBalance(staker.evmAddress);

  try {
    const [loadedStake, loadedBalance] = await Promise.all([
      stakePromise,
      balancePromise,
    ]);

    const stake = Number(loadedStake) ? String(loadedStake) : null;
    const balance = Number(loadedBalance) ? String(loadedBalance) : null;

    return updateStaker({
      evmAddress,
      updateInput: {
        stake: stake || staker.stake || "0",
        balance: balance || staker.balance || "0",
      },
    });
  } catch (e) {
    console.error(`Failed to refresh user balances ${evmAddress}`, e);
  }
}
