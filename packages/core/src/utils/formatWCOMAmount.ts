import { formatUnits } from "viem";

import { WCOMAI_DECIMALS } from "~/constants";

export function formatWCOMAmount(amount: string | number) {
  return formatUnits(BigInt(amount), WCOMAI_DECIMALS);
}
