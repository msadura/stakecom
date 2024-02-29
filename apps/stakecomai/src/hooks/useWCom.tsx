"use client";

import { erc20Abi, formatUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";

import { WCOM_ADDRESS, WCOM_DECIMALS } from "~/lib/constants";

const wComContract = {
  address: WCOM_ADDRESS,
  abi: erc20Abi,
} as const;

export function useWCom() {
  const { address } = useAccount();

  const result = useReadContracts({
    contracts: [
      {
        ...wComContract,
        functionName: "balanceOf",
        args: [address || "0x"],
      },
    ],
    query: { enabled: !!address },
  });

  const balance = {
    value: result.data?.[0].result || 0n,
    isLoaded: !!result.data?.[0],
    formatted: result.data?.[0].result
      ? formatUnits(result.data?.[0].result, WCOM_DECIMALS)
      : "0",
  };

  return { ...result, balance };
}
