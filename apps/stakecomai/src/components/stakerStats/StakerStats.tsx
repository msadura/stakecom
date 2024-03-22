"use client";

import { formatWCOMAmount } from "~core/formatters";
import { RefreshCw } from "lucide-react";

import { StatsContent } from "~/components/stakerStats/StatsContent";
import { StatsRow } from "~/components/stakerStats/StatsRow";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useBridge } from "~/hooks/useBridge";
import { useStaker } from "~/hooks/useStaker";
import { cn } from "~/lib/utils";

export const StakerStats = () => {
  const {
    stakerQuery,
    isConnected,
    refreshUserBalances,
    isRefreshing,
    evmAddress,
  } = useStaker();
  const { error, data, isFetching } = stakerQuery;
  const { claimableAmount, refreshDeposit } = useBridge();

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <Box justify="between" align="center">
          <CardTitle>Your stats</CardTitle>

          <Button
            variant="outline"
            size="iconXs"
            onClick={() => {
              refreshUserBalances();
              if (evmAddress) {
                refreshDeposit(evmAddress);
              }
            }}
            disabled={isRefreshing || isFetching}
          >
            <RefreshCw
              width={16}
              height={14}
              className={cn({ "animate-spin": isRefreshing || isFetching })}
            />
          </Button>
        </Box>
      </CardHeader>

      {(data || !!error) && (
        <CardContent>
          <StatsContent staker={data} hasError={!!error} />
          {claimableAmount > 0n && (
            <Box className="mt-3">
              <StatsRow
                labelClassName="text-warning"
                label="Pending withdrawal"
                highlighted
                valueClassName="text-warning"
                value={formatWCOMAmount(claimableAmount, {
                  withUnit: true,
                  maxDecimals: 4,
                })}
              />
            </Box>
          )}
        </CardContent>
      )}
    </Card>
  );
};
