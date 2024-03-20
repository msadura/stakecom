import { toMaxDecimals } from "~core/formatters/toMaxDecimals";
import { formatUnits } from "viem";

export function formatAmount(
  amount: string | number,
  options: { maxDecimals?: number; displayUnit?: string; decimals: number },
) {
  let formatted = formatUnits(BigInt(amount), options.decimals);

  if (options.maxDecimals) {
    formatted = toMaxDecimals(formatted, options?.maxDecimals);
  }

  if (options.displayUnit) {
    formatted += ` ${options.displayUnit}`;
  }

  return formatted;
}
