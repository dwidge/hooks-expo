import { Platform } from "react-native";

import Constants from "expo-constants";

export const getExpoBuildNumber = () =>
  Platform.select({
    android:
      Constants.expoConfig &&
      Constants.expoConfig.android &&
      Constants.expoConfig.android.versionCode !== null
        ? String(Constants.expoConfig.android.versionCode)
        : undefined,
    ios:
      Constants.expoConfig &&
      Constants.expoConfig.ios &&
      Constants.expoConfig.ios.buildNumber !== null
        ? String(Constants.expoConfig.ios.buildNumber)
        : undefined,
    default: "unknown",
  });
