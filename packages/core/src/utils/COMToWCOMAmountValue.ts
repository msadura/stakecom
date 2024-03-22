import { COMAI_DECIMALS, WCOMAI_DECIMALS } from "~core/constants";

export function COMToWCOMAmountValue(
  wCOMAmount: string | number | bigint,
): bigint {
  const addDecimals = WCOMAI_DECIMALS - COMAI_DECIMALS;
  const wCOMAmountValue = BigInt(
    wCOMAmount.toString() + "0".repeat(addDecimals),
  );
  return wCOMAmountValue;
}
