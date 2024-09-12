// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useLocalSearchParams } from "expo-router";
import { z } from "zod";

export const useIdNumberParam = () =>
  z.coerce.number().optional().parse(useLocalSearchParams().id);

export const useIdStringParam = () =>
  z.coerce.string().optional().parse(useLocalSearchParams().id);
