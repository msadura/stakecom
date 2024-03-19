"use client";

import { useEffect } from "react";
import { skipToken } from "@tanstack/react-query";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";

import { api } from "~/trpc/react";

export function useStaker() {
  const { address } = useAccount();

  const stakerQuery = api.stake.getStaker.useQuery(
    address ? { evmAddress: address } : skipToken,
  );

  const { data, refetch: refetchUser } = stakerQuery;

  useEffect(() => {
    if (data?.isStaleData && data?.module) {
      refetchUser().catch(console.error);
    }
  }, [data?.isStaleData, data?.module, refetchUser]);

  useInterval(
    () => {
      address && refetchUser().catch(console.error);
    },
    data?.isStaleData && data?.module ? 15000 : null,
  );

  return stakerQuery;
}
