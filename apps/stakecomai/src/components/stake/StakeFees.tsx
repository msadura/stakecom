import { formatWCOMAmount } from "~core/formatters";

import type { StakeFeesType } from "~/hooks/useFees";
import { StatsRow } from "~/components/stakerStats/StatsRow";
import { Box } from "~/components/ui/box";

interface Props {
  fees: StakeFeesType;
}

export const StakeFees = ({ fees }: Props) => {
  return (
    <Box direction="col" className="gap-0.5">
      <StatsRow
        label="Bridge fee"
        value={`${formatWCOMAmount(fees.bridgeFee)} COM`}
      />
      <StatsRow
        label="Transfer fee"
        value={`${formatWCOMAmount(fees.transferFee)} COM`}
      />
      <StatsRow label="stake.com.ai fee" value={`FREE`} highlighted />
      <StatsRow
        label="Time to break even"
        value={`~${fees.daysToBreakEven} ${fees.daysToBreakEven === 1n ? "day" : "days"}`}
      />
    </Box>
  );
};
