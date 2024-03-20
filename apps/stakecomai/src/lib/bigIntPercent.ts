export function bigIntPercent(bigIntValue: bigint, percentage: number): bigint {
  // Convert the percentage to a string to handle it generically
  const percentageStr = percentage.toString();

  // Determine the position of the decimal point, if any
  const decimalIndex = percentageStr.indexOf(".");

  let numerator, denominator;
  if (decimalIndex !== -1) {
    // If there's a decimal point, scale the percentage to a whole number
    const decimalPlaces = percentageStr.length - decimalIndex - 1;
    numerator = BigInt(percentageStr.replace(".", "")); // Remove decimal point
    denominator = BigInt(10 ** decimalPlaces * 100); // Adjust denominator for the decimal and convert to percentage
  } else {
    // No decimal point
    numerator = BigInt(percentageStr);
    denominator = BigInt(100); // Direct percentage conversion
  }

  // Calculate the percentage
  return (bigIntValue * numerator) / denominator;
}
