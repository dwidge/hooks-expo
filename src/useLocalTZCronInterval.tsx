import { AsyncState, useConvert } from "@dwidge/hooks-react";
import { convertCronToLocal, convertCronToUTC } from "@dwidge/timezone";
import { useTimeZone } from "./useDeviceInfo.js";

type IntervalType = string | null;

export const useLocalTZCronInterval = (
  v: AsyncState<IntervalType>,
  tz = useTimeZone(),
): AsyncState<IntervalType> =>
  useConvert<IntervalType, IntervalType>(
    (utcCron) => (tz ? convertCronToLocal(utcCron, tz) : utcCron),
    (localCron) => (tz ? convertCronToUTC(localCron, tz) : localCron),
  )(v);
