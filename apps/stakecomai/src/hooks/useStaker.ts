"use client";

import { useCallback } from "react";
import { skipToken } from "@tanstack/react-query";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";

import { api } from "~/trpc/react";

export function useStaker() {
  const { address, chain } = useAccount();
  const isConnected = !!address && chain?.id === 1;
  const utils = api.useUtils();

  const stakerQuery = api.stake.getStaker.useQuery(
    isConnected ? address : skipToken,
  );

  const { data, refetch: refetchUser } = stakerQuery;

  const { mutate, isPending: isRefreshing } =
    api.stake.refreshStaker.useMutation({
      onSettled(data) {
        if (data && isConnected) {
          utils.stake.getStaker.setData(address, data);
        }
      },
    });

  const { mutate: mutateUserEvents } = api.stake.refreshUserEvents.useMutation({
    onSettled(data) {
      if (data && isConnected) {
        utils.stake.getStaker.setData(address, data);
      }
    },
  });

  useInterval(
    () => {
      address && refetchUser().catch(console.error);
    },
    data?.isStaleData && data?.moduleKey ? 10000 : null,
  );

  const refreshUserBalances = useCallback(() => {
    if (isConnected) {
      mutate(address);
    }
  }, [address, isConnected, mutate]);

  const refreshUserEvents = useCallback(() => {
    if (isConnected) {
      mutateUserEvents(address);
    }
  }, [address, isConnected, mutateUserEvents]);

  return {
    stakerQuery,
    isConnected,
    refreshUserBalances,
    refreshUserEvents,
    isRefreshing,
    evmAddress: address,
  };
}
