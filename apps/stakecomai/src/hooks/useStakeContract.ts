"use client";

import type { BaseError } from "wagmi";
import { useCallback, useEffect } from "react";
import { skipToken } from "@tanstack/react-query";
import { stakeComAIAbi } from "~core/abi";
import { STAKE_ADDRESS } from "~core/constants";
import { toast } from "sonner";
import {
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useStaker } from "~/hooks/useStaker";
import { api } from "~/trpc/react";

const stakeContract = {
  address: STAKE_ADDRESS,
  abi: stakeComAIAbi,
} as const;

export function useStakeContract({ moduleKey }: { moduleKey?: string }) {
  const { isConnected, evmAddress } = useStaker();
  const {
    data: stakeHash,
    isPending: isStaking,
    writeContract,
    error,
  } = useWriteContract();
  const { isLoading: isConfirmingStake, isSuccess: isConfirmedStake } =
    useWaitForTransactionReceipt({ hash: stakeHash });

  const { data: signatureData } = api.stake.getSignature.useQuery(
    !!evmAddress && moduleKey
      ? {
          evmAddress,
          moduleKey,
        }
      : skipToken,
  );

  // TODO: unstake constact call

  useEffect(() => {
    if (error) {
      toast.error((error as BaseError).shortMessage);
    }

    if (isConfirmedStake) {
      toast.success("Stake confirmed");
    }
  });

  const { data: baseData } = useReadContracts({
    contracts: [
      {
        ...stakeContract,
        functionName: "totalStaked",
        args: [],
      },
      {
        ...stakeContract,
        functionName: "allowCustomModule",
        args: [],
      },
      {
        ...stakeContract,
        functionName: "stakingPaused",
        args: [],
      },
      {
        ...stakeContract,
        functionName: "defaultModule",
        args: [],
      },
    ],
    query: { enabled: isConnected },
  });

  const [totalStaked, allowCustomModule, stakingPaused, defaultModule] =
    baseData || [];

  const stakeWCOM = useCallback(
    (amount: bigint) => {
      if (
        !moduleKey ||
        !signatureData?.ss58Address ||
        !signatureData?.signature
      ) {
        return;
      }

      const { signature, ss58Address } = signatureData;
      writeContract({
        ...stakeContract,
        functionName: "stake",
        args: [amount, ss58Address, moduleKey, signature],
      });
    },
    [moduleKey, signatureData, writeContract],
  );

  useEffect(() => {
    if (isConfirmedStake) {
      // TODO: trigger offchain worker + refresh user + refresh wCOM
      toast.success(
        "Deposit confirmed. It takes a few minutes to bridge and stake.",
      );
    }
  }, [isConfirmedStake]);

  return {
    totalStaked: totalStaked?.result,
    allowCustomModule: allowCustomModule?.result || false,
    stakingPaused: stakingPaused?.result || false,
    defaultModule: defaultModule?.result || "",
    stakeWCOM,
    isStaking: isStaking || isConfirmingStake,
  };
}
