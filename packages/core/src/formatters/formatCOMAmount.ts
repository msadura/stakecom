import { COMAI_DECIMALS, COMAI_UNIT } from "~core/constants";
import { formatAmount } from "~core/formatters/formatAmount";

export function formatCOMAmount(
  amount: string | number | bigint,
  options?: { maxDecimals?: number; withUnit?: boolean },
) {
  return formatAmount(amount, {
    decimals: COMAI_DECIMALS,
    displayUnit: options?.withUnit ? COMAI_UNIT : undefined,
    maxDecimals: options?.maxDecimals,
  });
}
