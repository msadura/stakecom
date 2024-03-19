import { WCOMAI_DECIMALS, WCOMAI_UNIT } from "~core/constants";
import { formatAmount } from "~core/formatters/formatAmount";

export function formatWCOMAmount(
  amount: string | number,
  options?: { maxDecimals?: number; withUnit?: boolean },
) {
  return formatAmount(amount, {
    decimals: WCOMAI_DECIMALS,
    displayUnit: options?.withUnit ? WCOMAI_UNIT : undefined,
    maxDecimals: options?.maxDecimals,
  });
}
