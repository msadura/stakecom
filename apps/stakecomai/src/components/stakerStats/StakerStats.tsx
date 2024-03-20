"use client";

import { RefreshCw } from "lucide-react";

import { StatsContent } from "~/components/stakerStats/StatsContent";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useStaker } from "~/hooks/useStaker";
import { cn } from "~/lib/utils";

export const StakerStats = () => {
  const { stakerQuery, isConnected, refreshUserBalances, isRefreshing } =
    useStaker();
  const { error, data, isFetching } = stakerQuery;

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
            onClick={refreshUserBalances}
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
        </CardContent>
      )}
    </Card>
  );
};
