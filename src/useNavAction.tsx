// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { NavPush, useNavigation } from "./useNavigation";
import { useLocalSearchParams } from "expo-router";

export const useNavAction = (
  href: string,
  action: () => Promise<
    Record<string, string | number | undefined> | undefined
  > = async () => undefined
) => {
  const navigation = useNavigation();
  if (!action) return;
  return async () => navigation.push(href, await action());
};

export const useNav = (): NavPush => {
  const local = useLocalSearchParams() as Record<string, string>;
  const navigation = useNavigation();
  return (href, params) =>
    href === ".."
      ? navigation.up()
      : href
        ? navigation.push(href, { ...local, ...params })
        : navigation.dismissAll();
};

export const useNavAction2 = <A extends any[]>(
  href: string,
  action?: (
    ...a: A
  ) => Promise<Record<string, string | number | undefined> | null | undefined>,
  nav = useNav()
): ((...a: A) => Promise<void>) | undefined =>
  action
    ? (...a: A) =>
        action(...a).then(async (pc) => {
          pc && (await nav(href, pc));
        })
    : undefined;
