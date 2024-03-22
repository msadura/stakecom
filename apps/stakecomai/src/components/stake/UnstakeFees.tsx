import { formatCOMAmount } from "~core/formatters";

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
          value={`${formatCOMAmount(estimated, { maxDecimals: 4 })} wCOM`}
        />
      </Box>
      <StatsRow
        label="Bridge fee"
        value={`${formatCOMAmount(fees.bridgeFee, { maxDecimals: 4 })} COM`}
      />
      <StatsRow
        label="Transfer fee"
        value={`${formatCOMAmount(fees.transferFee, { maxDecimals: 4 })} COM`}
      />
    </Box>
  );
};
