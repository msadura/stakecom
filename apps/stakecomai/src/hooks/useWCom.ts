"use client";

import type { BaseError } from "wagmi";
import { useCallback, useEffect } from "react";
import { STAKE_ADDRESS } from "~core/constants";
import { toast } from "sonner";
import { erc20Abi, formatUnits } from "viem";
import {
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useStaker } from "~/hooks/useStaker";
import { WCOM_ADDRESS, WCOM_DECIMALS } from "~/lib/constants";

const wComContract = {
  address: WCOM_ADDRESS,
  abi: erc20Abi,
} as const;

export function useWCom() {
  const { isConnected, evmAddress } = useStaker();
  const {
    writeContract,
    isPending: isApproving,
    data: approveHash,
    error: approveError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const {
    data,
    refetch: refreshWComData,
    isPending,
  } = useReadContracts({
    contracts: [
      {
        ...wComContract,
        functionName: "balanceOf",
        args: [evmAddress || "0x"],
      },
      {
        ...wComContract,
        functionName: "allowance",
        args: [evmAddress || "0x", STAKE_ADDRESS],
      },
    ],
    query: { enabled: isConnected },
  });

  const [balanceData, allowanceData] = data || [null, null];

  const balance = {
    value: balanceData?.result || 0n,
    isLoaded: !!balanceData,
    formatted: balanceData?.result
      ? formatUnits(balanceData.result, WCOM_DECIMALS)
      : "0",
  };

  const bridgeAllowance =
    typeof allowanceData?.result !== "undefined" ? allowanceData.result : null;

  const approveBridge = useCallback(
    async (approveAmount: bigint) => {
      writeContract({
        ...wComContract,
        functionName: "approve",
        args: [STAKE_ADDRESS, approveAmount],
      });
    },
    [writeContract],
  );

  useEffect(() => {
    if (isConfirmed) {
      refreshWComData().catch(console.error);
      toast.success("Approved successfully");
    }

    if (approveError) {
      toast.error((approveError as BaseError).shortMessage);
    }
  }, [approveError, isConfirmed, refreshWComData]);

  return {
    isPending: isPending,
    balance,
    bridgeAllowance,
    isApproving: isApproving || isConfirming,
    approveBridge,
  };
}
