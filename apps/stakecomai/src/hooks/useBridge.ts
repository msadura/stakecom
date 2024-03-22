"use client";

import type { BaseError } from "wagmi";
import { useCallback, useEffect } from "react";
import { skipToken } from "@tanstack/react-query";
import { bridgeAbi } from "~core/bridge";
import { BRIDGE_ADDRESS } from "~core/constants";
import { toast } from "sonner";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { useStaker } from "~/hooks/useStaker";
import { api } from "~/trpc/react";

const bridgeContract = {
  address: BRIDGE_ADDRESS,
  abi: bridgeAbi,
};

export function useBridge() {
  const { evmAddress, isConnected } = useStaker();
  const utils = api.useUtils();

  const {
    writeContract,
    isPending: isClaiming,
    data: claimHash,
    error: claimError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: claimHash });

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

  const claimFromBridge = useCallback(async () => {
    if (evmAddress && withdrawalSeedQuery.data) {
      writeContract({
        ...bridgeContract,
        functionName: "claimTokens",
        args: [
          withdrawalSeedQuery.data.signature as `0x${string}`,
          BigInt(withdrawalSeedQuery.data.amount),
        ],
      });
    }
  }, [evmAddress, withdrawalSeedQuery.data, writeContract]);

  const { data } = withdrawalSeedQuery;

  useEffect(() => {
    if (isConfirmed && evmAddress) {
      refreshDeposit(evmAddress);
      toast.success("Claimed successfully");
    }

    if (claimError) {
      toast.error((claimError as BaseError).shortMessage);
    }
  }, [claimError, evmAddress, isConfirmed, refreshDeposit]);

  return {
    withdrawalSeedQuery,
    refreshDeposit,
    claimableAmount: BigInt(data?.amount || "0"),
    isClaiming: isClaiming || isConfirming,
    claimFromBridge,
  };
}
