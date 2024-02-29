export function toAmount(toValue: string | number, toDecimals: number): bigint {
  // convert float string to big int which will have the same value as the float
  const parts = toValue.toString().split(".");
  if (parts.length > 2) {
    throw new Error("Invalid number");
  }

  const [int = "", dec = ""] = parts;

  return BigInt(int + dec.padEnd(toDecimals, "0"));
}
