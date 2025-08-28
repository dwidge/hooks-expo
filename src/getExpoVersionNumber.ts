import Constants from "expo-constants";

export const getExpoVersionNumber = () =>
  Constants.expoConfig?.version || "unknown";
