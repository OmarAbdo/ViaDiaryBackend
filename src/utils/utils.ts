export function stringToBoolean(str: string): boolean {
  const truthyValues = ['true', '1', 'yes'];
  return truthyValues.includes(str.toLowerCase());
}
