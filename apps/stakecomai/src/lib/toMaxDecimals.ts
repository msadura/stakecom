export function toMaxDecimals(toFormat: string | number, maxDecimals = 6) {
  const formatted = Number(toFormat).toFixed(maxDecimals);
  // cut 0s from the end
  return formatted.replace(/(\.0+|0+)$/, "");
}
