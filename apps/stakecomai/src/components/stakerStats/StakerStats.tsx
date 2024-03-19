"use client";

import { formatCOMAmount } from "~core/formatters";
import { RefreshCcw } from "lucide-react";

import { Spinner } from "~/components/Spinner";
import { StatsRow } from "~/components/stakerStats/StatsRow";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useStaker } from "~/hooks/useStaker";

export const StakerStats = () => {
  const { stakerQuery, isConnected } = useStaker();
  const { error, data } = stakerQuery;

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

          <Button variant="outline" size="iconXs">
            <RefreshCcw width={16} height={14} />
          </Button>
        </Box>
      </CardHeader>

      <CardContent>
        <Box direction="col" className="gap-1">
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
          <StatsRow label="Initial stake" value={data?.deposit || "-"} />
          <StatsRow label="Earned" value="1.24 COMAI" />
          <StatsRow label="APY" value="44.4%" />
        </Box>
      </CardContent>
    </Card>
  );
};
