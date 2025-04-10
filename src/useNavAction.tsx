// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useDeepMemo } from "@dwidge/hooks-react";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { NavPush, useNavigation } from "./useNavigation";

export const useNavAction = (
  href: string,
  action: () => Promise<
    Record<string, string | number | undefined> | undefined
  > = async () => undefined,
) => {
  const navigation = useNavigation();
  if (!action) return;
  return async () => navigation.push(href, await action());
};

export const useNav = (): NavPush => {
  const local = useDeepMemo(useLocalSearchParams() as Record<string, string>);
  const navigation = useNavigation();
  return useCallback(
    (href, params) =>
      href === ".."
        ? navigation.up()
        : href
          ? navigation.push(href, { ...local, ...params })
          : navigation.dismissAll(),
    [local, navigation],
  );
};

export const useNavAction2 = <A extends any[]>(
  href: string,
  action?: (
    ...a: A
  ) => Promise<Record<string, string | number | undefined> | null | undefined>,
  nav = useNav(),
): ((...a: A) => Promise<void>) | undefined =>
  action
    ? (...a: A) =>
        action(...a).then(async (pc) => {
          pc && (await nav(href, pc));
        })
    : undefined;
