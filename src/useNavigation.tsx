// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  usePathname,
  useRouter,
  useLocalSearchParams,
  type Href,
} from "expo-router";

export type NavPush = (
  href?: string,
  params?: Record<string, string | number | undefined>
) => void;

export const useNavigation = (
  navigation = useRouter(),
  pathname = usePathname(),
  searchParams = useLocalSearchParams() as Record<string, string>
) => ({
  ...navigation,
  up: () => {
    const path = pathname.split("/").slice(0, -1).join("/") || "/";
    const queryParams = new URLSearchParams(searchParams).toString();
    navigation.push(`${path}?${queryParams}` as Href);
  },
  push: ((href, params) =>
    navigation.push(
      (href +
        (params
          ? "?" + new URLSearchParams(toStringValues(params)).toString()
          : "")) as Href
    )) as NavPush,
});
export type Navigation = ReturnType<typeof useNavigation>;

const toStringValues = (o: object) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.toString()]));
