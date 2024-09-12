// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useEffect } from "react";
import {
  getUnhandledPromiseRejectionTracker,
  setUnhandledPromiseRejectionTracker,
} from "react-native-promise-rejection-utils";

export const useUnhandledPromiseRejection = (f: (e: unknown) => unknown) => {
  useEffect(() => {
    const prevTracker = getUnhandledPromiseRejectionTracker();
    setUnhandledPromiseRejectionTracker((id, error) => {
      f(error);
      // if (prevTracker !== undefined) prevTracker(id, error);
    });
    return () =>
      prevTracker && setUnhandledPromiseRejectionTracker(prevTracker);
  }, []);
};
