// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useDeepMemo } from "@dwidge/hooks-react";
import {
  useLocalSearchParams,
  usePathname,
  useRouter,
  type Href,
} from "expo-router";
import { useMemo } from "react";

export type NavPush = (
  href?: string,
  params?: Record<string, string | number | undefined>,
) => void;

export const useNavigation = (
  navigation = useRouter(),
  pathname = usePathname(),
  searchParams = useDeepMemo(useLocalSearchParams() as Record<string, string>),
) => {
  return useMemo(
    () => ({
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
              : "")) as Href,
        )) as NavPush,
    }),
    [navigation, pathname, searchParams],
  );
};
export type Navigation = ReturnType<typeof useNavigation>;

const toStringValues = (o: object) =>
  Object.fromEntries(
    Object.entries(o)
      .filter(([k, v]) => v != undefined)
      .map(([k, v]) => [k, v.toString()]),
  );
