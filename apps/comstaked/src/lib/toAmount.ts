export function toAmount(toValue: string | number, toDecimals: number): bigint {
  // convert float string to big int which will have the same value as the float
  const [int = "", dec = ""] = toValue.toString().split(".");

  return BigInt(int + dec.padEnd(toDecimals, "0"));
}
