"use client";

import { formatWCOMAmount } from "~core/formatters";
import { RefreshCw } from "lucide-react";

import { Spinner } from "~/components/Spinner";
import { PendingTxsInfo } from "~/components/stake/PendingTxsInfo";
import { StatsContent } from "~/components/stakerStats/StatsContent";
import { StatsRow } from "~/components/stakerStats/StatsRow";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useBridge } from "~/hooks/useBridge";
import { useStaker } from "~/hooks/useStaker";
import { useTxHistory } from "~/hooks/useTxHistory";
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
  const { claimableAmount, refreshDeposit, claimFromBridge, isClaiming } =
    useBridge();
  const { txHistory, refreshTxHistory } = useTxHistory();

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
              refreshTxHistory();
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
          <PendingTxsInfo txs={txHistory} />
          {claimableAmount > 0n && (
            <Box direction="col" className="mt-3 gap-1">
              <StatsRow
                valueTooltip="The amount of wCOMAI you can claim from the bridge to your wallet."
                labelClassName="text-warning"
                label="Pending withdrawal"
                highlighted
                valueClassName="text-warning"
                value={formatWCOMAmount(claimableAmount, {
                  withUnit: true,
                  maxDecimals: 4,
                })}
              />

              <Button
                onClick={claimFromBridge}
                variant="warning"
                size="lg"
                disabled={isClaiming}
              >
                Claim wCOMAI
                {isClaiming && <Spinner className="ml-1" size={16} />}
              </Button>
            </Box>
          )}
        </CardContent>
      )}
    </Card>
  );
};
