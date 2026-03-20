import type { BrewStage, ResolvedBrewProfile } from "@/types/brew";

export function formatGrindNote(profile: ResolvedBrewProfile) {
  switch (profile.grindLabel) {
    case "slightly-finer":
      return "Slightly finer than your usual baseline.";
    case "slightly-coarser":
      return "Slightly coarser than your usual baseline.";
    default:
      return profile.grindLabel;
  }
}

export function formatStageWindow(stage: BrewStage) {
  return `${stage.startSec}s-${stage.endSec}s`;
}
