"use client";

import { useEffect } from "react";
import { skipToken } from "@tanstack/react-query";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";

import { api } from "~/trpc/react";

export function useStaker() {
  const { address } = useAccount();

  const stakerQuery = api.stake.getStaker.useQuery(
    address ? address : skipToken,
  );

  const { data, refetch: refetchUser } = stakerQuery;

  const { mutate: refreshUserBalances } = api.stake.refreshStaker.useMutation({
    onSettled() {
      refetchUser().catch(console.error);
    },
  });

  useEffect(() => {
    if (data?.isStaleData && data?.module) {
      refetchUser().catch(console.error);
    }
  }, [data?.isStaleData, data?.module, refetchUser]);

  useInterval(
    () => {
      address && refreshUserBalances(address);
    },
    data?.isStaleData && data?.module ? 15000 : null,
  );

  return stakerQuery;
}
