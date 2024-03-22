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

import { useBridge } from "~/hooks/useBridge";
import { useStaker } from "~/hooks/useStaker";
import { api } from "~/trpc/react";

const stakeContract = {
  address: STAKE_ADDRESS,
  abi: stakeComAIAbi,
} as const;

export function useStakeContract({ moduleKey }: { moduleKey?: string }) {
  const { isConnected, evmAddress, refreshUserEvents } = useStaker();
  const { refreshDeposit } = useBridge();
  const {
    data: stakeHash,
    isPending: isStaking,
    writeContract: writeContractStake,
    error: errorStake,
  } = useWriteContract();
  const { isLoading: isConfirmingStake, isSuccess: isConfirmedStake } =
    useWaitForTransactionReceipt({ hash: stakeHash });

  const {
    data: initUnstakeHash,
    isPending: isUnstaking,
    writeContract: writeContractUnstake,
    error: errorUnstake,
  } = useWriteContract();
  const { isLoading: isConfirmingUnstake, isSuccess: isConfirmedUnstake } =
    useWaitForTransactionReceipt({ hash: initUnstakeHash });

  const { data: signatureData } = api.stake.getSignature.useQuery(
    !!evmAddress && moduleKey
      ? {
          evmAddress,
          moduleKey,
        }
      : skipToken,
  );

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
      writeContractStake({
        ...stakeContract,
        functionName: "stake",
        args: [amount, ss58Address, moduleKey, signature],
      });
    },
    [moduleKey, signatureData, writeContractStake],
  );

  const unstakeWCOM = useCallback(
    (amount: bigint, unstakeAll: boolean) => {
      writeContractUnstake({
        ...stakeContract,
        functionName: "initUnstake",
        args: [amount, unstakeAll],
      });
    },
    [writeContractUnstake],
  );

  useEffect(() => {
    if (errorStake) {
      toast.error((errorStake as BaseError).shortMessage);
    }

    if (isConfirmedStake) {
      refreshUserEvents();
      toast.success(
        "Deposit confirmed. It takes a few minutes to bridge and stake.",
      );
    }
  }, [errorStake, isConfirmedStake, refreshUserEvents]);

  useEffect(() => {
    if (errorUnstake) {
      toast.error((errorUnstake as BaseError).shortMessage);
    }

    if (isConfirmedUnstake) {
      if (evmAddress) {
        refreshDeposit(evmAddress);
      }

      toast.success(
        "Unstake initialized. Your funds should be ready to claim in a few minutes.",
      );
    }
  }, [errorUnstake, evmAddress, isConfirmedUnstake, refreshDeposit]);

  return {
    totalStaked: totalStaked?.result,
    allowCustomModule: allowCustomModule?.result || false,
    stakingPaused: stakingPaused?.result || false,
    defaultModule: defaultModule?.result || "",
    stakeWCOM,
    isStaking: isStaking || isConfirmingStake,
    unstakeWCOM,
    isUnstaking: isUnstaking || isConfirmingUnstake,
  };
}
