"use client";

import { useMemo } from "react";
import { calculateBrewPlan } from "@/lib/brew-engine/calculateBrewPlan";
import type { BrewInput } from "@/types/brew";

export function useBrewCalculation(input: BrewInput) {
  return useMemo(() => {
    try {
      return {
        plan: calculateBrewPlan(input),
        error: null,
      };
    } catch (error) {
      return {
        plan: null,
        error: error instanceof Error ? error.message : "Unable to calculate brew plan.",
      };
    }
  }, [input]);
}
