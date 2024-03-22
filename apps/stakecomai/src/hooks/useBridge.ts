"use client";

import { skipToken } from "@tanstack/react-query";

import { useStaker } from "~/hooks/useStaker";
import { api } from "~/trpc/react";

export function useBridge() {
  const { evmAddress, isConnected } = useStaker();
  const utils = api.useUtils();

  const withdrawalSeedQuery = api.bridge.getWithdrawalSeed.useQuery(
    isConnected && evmAddress ? evmAddress : skipToken,
  );

  const { mutate: refreshDeposit } = api.bridge.refreshComDeposit.useMutation({
    onSettled(data) {
      if (data && evmAddress) {
        utils.bridge.getWithdrawalSeed.setData(evmAddress, data);
      }
    },
  });

  const { data } = withdrawalSeedQuery;

  return {
    withdrawalSeedQuery,
    refreshDeposit,
    claimableAmount: BigInt(data?.amount || "0"),
  };
}
