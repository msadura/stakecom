"use client";

import { skipToken } from "@tanstack/react-query";
import { formatCOMAmount, formatWCOMAmount } from "~core/formatters";
import { RefreshCw } from "lucide-react";

import { Spinner } from "~/components/Spinner";
import { StatsRow } from "~/components/stakerStats/StatsRow";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useStaker } from "~/hooks/useStaker";
import { toMaxDecimals } from "~/lib/toMaxDecimals";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export const StakerStats = () => {
  const { stakerQuery, isConnected, refreshUserBalances, isRefreshing } =
    useStaker();
  const { error, data } = stakerQuery;

  const { stake, deposit, moduleKey } = data || {};
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

  if (!isConnected) {
    return null;
  }

  if (!data && !error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size={20} />
      </div>
    );
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <Box justify="between" align="center">
          <CardTitle>Your stats</CardTitle>

          <Button variant="outline" size="iconXs" onClick={refreshUserBalances}>
            <RefreshCw
              width={16}
              height={14}
              className={cn({ "animate-spin": isRefreshing })}
            />
          </Button>
        </Box>
      </CardHeader>

      <CardContent>
        <Box direction="col" className="gap-1">
          <StatsRow
            label="APY"
            value={`${toMaxDecimals(validatorData?.apy || 0, 2) || "-"} %`}
          />
          <StatsRow
            label="Current stake"
            value={
              data?.stake
                ? formatCOMAmount(data.stake, {
                    withUnit: true,
                    maxDecimals: 4,
                  })
                : "-"
            }
          />
          <StatsRow
            label="Initial stake"
            value={
              data?.deposit
                ? formatWCOMAmount(data.deposit, {
                    withUnit: true,
                    maxDecimals: 4,
                  })
                : "-"
            }
          />
          <StatsRow
            label="Earned"
            value={`${earnedAmount} COMAI`}
            highlighted
          />
        </Box>
      </CardContent>
    </Card>
  );
};
