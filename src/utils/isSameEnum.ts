/**
 * Compares two arrays to determine if they contain the same enum values
 *
 * @param a - First array of enum values to compare
 * @param b - Second array of enum values to compare
 * @returns boolean - True if arrays contain same values, false otherwise
 *
 * @example
 * isSameEnum(['A', 'B'], ['B', 'A']) // returns true
 * isSameEnum([1, 2], [1, 3]) // returns false
 *
 * @note Arrays are sorted before comparison to handle different ordering
 */
export default function isSameEnum(a: unknown[], b: unknown[]) {
  // Check if arrays have different lengths
  if (a.length !== b.length) return false;

  // Sort and compare each element
  return a.sort().every((v, index) => v === b.sort()[index]);
}
