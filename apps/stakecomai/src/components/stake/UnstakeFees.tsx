import { formatWCOMAmount } from "~core/formatters";

import type { StakeFeesType } from "~/hooks/useFees";
import { StatsRow } from "~/components/stakerStats/StatsRow";
import { Box } from "~/components/ui/box";

interface Props {
  fees: StakeFeesType;
  amount: bigint;
}

export const UnstakeFees = ({ fees, amount }: Props) => {
  const estimated = amount - fees.totalFee < 0 ? 0n : amount - fees.totalFee;

  return (
    <Box direction="col" className="gap-1">
      <Box className="mb-2 flex-1">
        <StatsRow
          highlighted
          valueClassName="text-primary"
          labelClassName="text-primary"
          label="Estimated claim"
          value={`${formatWCOMAmount(estimated, { maxDecimals: 4 })} wCOM`}
        />
      </Box>
      <StatsRow
        valueTooltip="Bridge charges 0.3% fee per transaction (min 1COM)"
        label="Bridge fee"
        value={`${formatWCOMAmount(fees.bridgeFee, { maxDecimals: 4 })} COM`}
      />
      <StatsRow
        valueTooltip={`Fee to cover transfer gas cost`}
        label="Transfer fee"
        value={`${formatWCOMAmount(fees.transferFee, { maxDecimals: 4 })} COM`}
      />
    </Box>
  );
};
