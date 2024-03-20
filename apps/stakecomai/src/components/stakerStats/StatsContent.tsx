import { skipToken } from "@tanstack/react-query";
import {
  formatCOMAmount,
  formatWCOMAmount,
  toMaxDecimals,
} from "~core/formatters";

import type { StakeUser } from "@stakecom/core";

import { StatsRow } from "~/components/stakerStats/StatsRow";
import { Box } from "~/components/ui/box";
import { api } from "~/trpc/react";

interface Props {
  staker?: StakeUser;
  hasError?: boolean;
}

export const StatsContent = ({ staker, hasError }: Props) => {
  const hasStake = !!staker?.stake !== null && !!staker?.moduleKey;

  const { stake, deposit, moduleKey } = staker || {};
  const stakeAmount = stake ? formatCOMAmount(stake, { maxDecimals: 4 }) : "-";
  const depositAmount = deposit
    ? formatWCOMAmount(deposit, { maxDecimals: 4 })
    : "-";

  const earned = Number(stakeAmount) - Number(depositAmount);
  const earnedAmount =
    earned && !isNaN(earned) && earned > 0 ? toMaxDecimals(earned, 4) : "-";

  const { data: validatorData } = api.stats.getValidator.useQuery(
    moduleKey ? moduleKey : skipToken,
  );

  if (hasError) {
    return (
      <Box direction="col" className="gap-1">
        <p className="text-warning text-sm">
          An error occurred while fetching your stats. Please try again later.
        </p>
      </Box>
    );
  }

  if (staker && !hasStake) {
    return (
      <Box direction="col" className="gap-1">
        <p className="text-sm text-muted-foreground">
          No stake found or transaction is pending. It can take a while for the
          stake to be registered.
        </p>
      </Box>
    );
  }

  if (hasStake) {
    return (
      <Box direction="col" className="gap-1">
        <StatsRow
          label="APY"
          value={`${toMaxDecimals(validatorData?.apy || 0, 2) || "-"} %`}
        />
        <StatsRow
          label="Module"
          value={validatorData?.name || validatorData?.address || "-"}
        />
        <StatsRow
          label="Current stake"
          value={
            staker.stake
              ? formatCOMAmount(staker.stake, {
                  withUnit: true,
                  maxDecimals: 4,
                })
              : "-"
          }
        />
        <StatsRow
          label="Initial stake"
          value={
            staker.deposit
              ? formatWCOMAmount(staker.deposit, {
                  withUnit: true,
                  maxDecimals: 4,
                })
              : "-"
          }
        />
        <StatsRow label="Earned" value={`${earnedAmount} COMAI`} highlighted />
      </Box>
    );
  }
};
