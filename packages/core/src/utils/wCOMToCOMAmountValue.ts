import { COMAI_DECIMALS, WCOMAI_DECIMALS } from "~core/constants";

export function wCOMToCOMAmountValue(
  wCOMAmount: string | number | bigint,
): bigint {
  const removeDecimals = WCOMAI_DECIMALS - COMAI_DECIMALS;
  const wCOMAmountValue = wCOMAmount.toString().slice(0, -removeDecimals);

  return BigInt(wCOMAmountValue);
}
