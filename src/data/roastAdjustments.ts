import type { RoastAdjustmentProfile } from "@/types/domain";

export const roastAdjustments: RoastAdjustmentProfile[] = [
  {
    id: "light",
    label: "Light",
    adjustments: {
      tempDeltaC: 2,
      brewTimeDeltaSec: 8,
      agitationShift: 1,
      grindShift: -1,
    },
    notes: ["Slightly hotter, a touch longer, and a bit finer for fuller extraction."],
  },
  {
    id: "medium",
    label: "Medium",
    adjustments: {
      tempDeltaC: 0,
      brewTimeDeltaSec: 0,
      agitationShift: 0,
      grindShift: 0,
    },
    notes: ["Keeps the recipe near the baseline profile."],
  },
  {
    id: "dark",
    label: "Dark",
    adjustments: {
      tempDeltaC: -2,
      brewTimeDeltaSec: -5,
      agitationShift: -1,
      grindShift: 1,
    },
    notes: ["Calms the recipe to avoid harshness and over-extraction."],
  },
];

export const roastAdjustmentMap = Object.fromEntries(
  roastAdjustments.map((adjustment) => [adjustment.id, adjustment]),
) as Record<(typeof roastAdjustments)[number]["id"], (typeof roastAdjustments)[number]>;
