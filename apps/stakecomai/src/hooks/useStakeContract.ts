"use client";

import { skipToken } from "@tanstack/react-query";
import { stakeComAIAbi } from "~core/abi";
import { STAKE_ADDRESS } from "~core/constants";
import { useAccount, useReadContracts } from "wagmi";

import { api } from "~/trpc/react";

const stakeContract = {
  address: STAKE_ADDRESS,
  abi: stakeComAIAbi,
} as const;

export function useStakeContract({
  evmAddress,
  moduleKey,
}: {
  evmAddress?: string;
  moduleKey?: string;
}) {
  const { address } = useAccount();

  const { data: signatureData } = api.stake.getSignature.useQuery(
    !!evmAddress && moduleKey
      ? {
          evmAddress,
          moduleKey,
        }
      : skipToken,
  );

  console.log("🔥 signature data:", signatureData);
  // TODO: stake contract call
  // TODO: unstake constact call
  // TODO: wait for tx / listen to event and refresh

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
    query: { enabled: !!address },
  });

  const [totalStaked, allowCustomModule, stakingPaused, defaultModule] =
    baseData || [];

  return { totalStaked, allowCustomModule, stakingPaused, defaultModule };
}
