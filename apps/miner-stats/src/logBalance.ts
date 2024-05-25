import { getBalances } from "@stakecom/commune-sdk";
import { statsApiRouter } from "@stakecom/core";
import { formatCOMAmount } from "@stakecom/core/formatters";

import type { ComKey } from "./getKeys";

export async function logBalance({
  showDetails,
  key,
}: {
  showDetails?: boolean;
  key: ComKey;
}) {
  const { balance, stakeTotal } = await getBalances({
    address: key.ss58_address,
    networkId: 17,
  });

  // console.log("🔥", key.path, formatCOMAmount(balance));

  if (showDetails) {
    let isRegistered = stakeTotal > 0n;
    if (stakeTotal === 0n) {
      try {
        await statsApiRouter.getValidator(key.ss58_address, 17);
        isRegistered = true;
      } catch (e) {
        isRegistered = false;
      }
    }

    console.log(
      "🔥",
      key.path,
      `balance: ${formatCOMAmount(balance)}`,
      `staked: ${formatCOMAmount(stakeTotal)}`,
      isRegistered ? "✅" : "❌",
    );
  }

  return {
    balance: balance + stakeTotal,
    key,
  };
}
