import { useMemo } from "react";
import { WCOMAI_DECIMALS } from "~core/constants";
import { parseUnits } from "viem";

import { bigIntPercent } from "~/lib/bigIntPercent";

export interface StakeFeesType {
  bridgeFee: bigint;
  serviceFee: bigint;
  transferFee: bigint;
  totalFee: bigint;
  daysToBreakEven: bigint;
}

const BRIDGE_FEE_PERCENT = 0.3;
const MIN_BRIDGE_FEE = 1;
const SERVICE_FEE = 0;
const TRANSFER_FEE = 0.36;

// use WCOM decimals by default
export function useFees({
  amount,
  decimals = WCOMAI_DECIMALS,
  apy,
}: {
  amount: bigint;
  decimals?: number;
  apy?: number;
}): StakeFeesType {
  const bridgeFee = bigIntPercent(amount, BRIDGE_FEE_PERCENT);
  const minBridgeFee = parseUnits(MIN_BRIDGE_FEE.toString(), decimals);
  const finalBridgeFee = bridgeFee < minBridgeFee ? minBridgeFee : bridgeFee;
  const transferFee = parseUnits(TRANSFER_FEE.toString(), decimals);
  const serviceFee = amount * BigInt(SERVICE_FEE);
  const totalFee = finalBridgeFee + transferFee + serviceFee;
  const estimatedStake = amount - totalFee;

  const daysToBreakEven = useMemo(() => {
    const yearlyEarn = bigIntPercent(estimatedStake, apy || 0);
    const dailyEarn = yearlyEarn / 365n;

    const days = dailyEarn > 0 ? totalFee / dailyEarn : 0n;

    return days;
  }, [apy, estimatedStake, totalFee]);

  return {
    bridgeFee: finalBridgeFee,
    serviceFee,
    transferFee,
    totalFee,
    daysToBreakEven,
  };
}
