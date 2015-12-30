
/**
 * Rounds a float number and fixes the decimals to a specified number of digits.
 * @param n
 * @param decimals by default is 0
 * @returns {Number}
 */
export function roundFloat(n, decimals = 0) {
  return (Math.round(n * 10) / 10).toFixed(decimals);
}
