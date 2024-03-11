"use client";

import { skipToken } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { api } from "~/trpc/react";

export function useBridge() {
  const { address } = useAccount();
  const utils = api.useUtils();

  const withdrawalSeedQuery = api.bridge.getWithdrawalSeed.useQuery(
    address ? address : skipToken,
  );

  const { mutate: refreshDeposit } = api.bridge.refreshComDeposit.useMutation({
    onSettled(data) {
      if (data && address) {
        utils.bridge.getWithdrawalSeed.setData(address, data);
      }
    },
  });

  return { withdrawalSeedQuery, refreshDeposit };
}
