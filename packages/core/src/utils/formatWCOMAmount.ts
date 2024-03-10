import { WCOMAI_DECIMALS } from "~core/constants";
import { formatUnits } from "viem";

export function formatWCOMAmount(amount: string | number) {
  return formatUnits(BigInt(amount), WCOMAI_DECIMALS);
}
