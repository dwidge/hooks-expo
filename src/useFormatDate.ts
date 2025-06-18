import { formatDate } from "@dwidge/utils-js";
import { useRegionCode, useTimeZone } from "./useDeviceInfo.js";

/**
 * React hook that returns a function to format dates according to the specified timezone and region.
 *
 * @param timezone - The timezone to use for formatting. Defaults to the value returned by `useTimeZone()`.
 * @param region - The region code to use for formatting. Defaults to the value returned by `useRegionCode()`.
 * @returns A function that takes a date (as a `Date`, `string`, `number`, or `null`) and returns a formatted date string, or `undefined` if the input is invalid.
 *
 * @example
 * const formatDate = useFormatDate();
 * const formatted = formatDate(new Date());
 */
export const useFormatDate =
  (timezone = useTimeZone(), region = useRegionCode()) =>
  (date?: Date | string | number | null): string | undefined =>
    formatDate(date, timezone, region);
