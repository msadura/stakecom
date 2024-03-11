"use client";

import { skipToken } from "@tanstack/react-query";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";

import { api } from "~/trpc/react";

export function useStaker() {
  const { address } = useAccount();

  const { data, refetch: refetchUser } = api.stake.getStaker.useQuery(
    address ? address : skipToken,
  );

  const { mutate: refreshUserBalances } = api.stake.refreshStaker.useMutation({
    onSettled(data) {
      if (data?.refreshed) {
        refetchUser().catch(console.error);
      }
    },
  });

  useInterval(
    () => {
      address && refreshUserBalances(address);
    },
    // Delay in milliseconds or null to stop it
    data?.isStaleData && data?.module ? 10000 : null,
  );

  console.log("🔥staker", data);
}
