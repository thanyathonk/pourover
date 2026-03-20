import type { FlavorTargetProfile } from "@/types/domain";

export const flavorTargets: FlavorTargetProfile[] = [
  {
    id: "bright",
    label: "Bright",
    description: "Higher-clarity, livelier expression.",
    adjustments: {
      ratioDelta: 0.2,
      tempDeltaC: 1,
      brewTimeDeltaSec: -10,
      bloomMultiplierDelta: 0,
      agitationShift: 1,
      grindShift: -1,
      clarityShift: 1,
      bodyShift: -1,
    },
    notes: ["Pushes the cup toward a lighter, clearer expression."],
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "Stable all-round profile with minimal deviation.",
    adjustments: {
      ratioDelta: 0,
      tempDeltaC: 0,
      brewTimeDeltaSec: 0,
      bloomMultiplierDelta: 0,
      agitationShift: 0,
      grindShift: 0,
      clarityShift: 0,
      bodyShift: 0,
    },
    notes: ["Keeps the selected preset close to its intended center."],
  },
  {
    id: "sweet",
    label: "Sweet",
    description: "Rounder, calmer expression with extra sweetness.",
    adjustments: {
      ratioDelta: -0.3,
      tempDeltaC: -1,
      brewTimeDeltaSec: 10,
      bloomMultiplierDelta: -0.1,
      agitationShift: -1,
      grindShift: 0,
      clarityShift: -1,
      bodyShift: 1,
    },
    notes: ["Extends contact slightly and softens the pour rhythm."],
  },
  {
    id: "clean",
    label: "Clean",
    description: "Cleaner finish with restrained agitation.",
    adjustments: {
      ratioDelta: 0.2,
      tempDeltaC: 0,
      brewTimeDeltaSec: -5,
      bloomMultiplierDelta: 0,
      agitationShift: -1,
      grindShift: -1,
      clarityShift: 1,
      bodyShift: -1,
    },
    notes: ["Pulls the cup toward polish and transparency."],
  },
  {
    id: "strong",
    label: "Strong",
    description: "Lower dilution and a denser concentration.",
    adjustments: {
      ratioDelta: -0.5,
      tempDeltaC: -1,
      brewTimeDeltaSec: 5,
      bloomMultiplierDelta: 0,
      agitationShift: 0,
      grindShift: 1,
      clarityShift: -1,
      bodyShift: 1,
    },
    notes: ["Reduces dilution feel for a more concentrated cup."],
  },
];

export const flavorTargetMap = Object.fromEntries(
  flavorTargets.map((target) => [target.id, target]),
) as Record<(typeof flavorTargets)[number]["id"], (typeof flavorTargets)[number]>;
