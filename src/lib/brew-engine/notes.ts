import { dripperMap } from "@/data/drippers";
import { filterMap } from "@/data/filters";
import { uniqueStrings } from "@/lib/brew-engine/helpers";
import type { ResolvedBrewProfile } from "@/types/brew";

export function buildPlanNotes(profile: ResolvedBrewProfile) {
  const dripper = dripperMap[profile.dripperId];
  const filter = filterMap[profile.filterId];

  return uniqueStrings([
    ...profile.notes,
    dripper.id === "ct62"
      ? "If drawdown lags, keep the bed level and open the grind slightly."
      : "If the brew runs too fast, tighten the grind slightly.",
    profile.brewMode === "iced"
      ? "Iced flash brew – avoid treating the first pour like a bloom."
      : "",
    profile.metrics.clarityScore > profile.metrics.bodyScore
      ? "Expect a cleaner, more articulate cup shape."
      : "Expect a rounder, fuller mouthfeel.",
  ].filter(Boolean));
}
