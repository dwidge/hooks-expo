// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useEffect } from "react";
import { AppState, Platform } from "react-native";

export const useOnBlurApp = (f: () => Promise<void>) => {
  useEffect(() => {
    if (Platform.OS === "web") {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        f();
        event.preventDefault();
      };

      window.addEventListener("blur", handleBeforeUnload);
      return () => window.removeEventListener("blur", handleBeforeUnload);
    } else {
      const handleAppStateChange = (nextAppState: string) => {
        if (nextAppState.match(/inactive|background/)) f();
      };

      AppState.addEventListener("change", handleAppStateChange);
    }
  });
};
