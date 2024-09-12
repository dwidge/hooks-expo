// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useGetLocal } from "@dwidge/crud-api-react";
import * as Device from "expo-device";
import { useCalendars, useLocales } from "expo-localization";
import * as Network from "expo-network";
import { TimeZoneCode } from "@dwidge/timezone";
import { CountryCode } from "@dwidge/country";

export const osName = Device.osName;
export const osVersion = Device.osVersion;

export const useTimeZone = () =>
  useCalendars()[0]?.timeZone as TimeZoneCode | null | undefined;

export const useLanguageCode = () => useLocales()[0]?.languageCode;

export const useCurrencyCode = () => useLocales()[0]?.currencyCode;

export const useCurrencySymbol = () => useLocales()[0]?.currencySymbol;

export const useRegionCode = () =>
  useLocales()[0]?.regionCode as CountryCode | null;

export const useIsInternetReachable = () =>
  useGetLocal("networkState", Network.getNetworkStateAsync)
    ?.isInternetReachable;
