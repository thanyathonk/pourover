import type { FilterProfile } from "@/types/domain";

export const filters: FilterProfile[] = [
  {
    id: "hario-paper",
    label: "Hario Paper",
    geometry: "cone",
    compatibleDrippers: ["v60", "ct62"],
    flowTendency: "faster",
    flavorBias: "clarity",
    notes: [
      "Slightly faster drawdown.",
      "Pushes a cleaner, more transparent cup.",
    ],
    shortLabel: "Hario",
    description: "Neutral cone paper with clarity-focused flow.",
    ui: { filterVisual: "cone-paper", thicknessVisual: "thin" },
  },
  {
    id: "origami-paper",
    label: "Origami Cone Paper",
    geometry: "cone",
    compatibleDrippers: ["origami"],
    flowTendency: "neutral",
    flavorBias: "clarity",
    notes: [
      "Cone shape keeps Origami brighter and quicker through the drawdown.",
    ],
    shortLabel: "Cone",
    description: "Cone paper for Origami – clarity-focused.",
    ui: { filterVisual: "cone-paper", thicknessVisual: "thin" },
  },
  {
    id: "kalita-wave",
    label: "Kalita Wave Paper",
    geometry: "wave",
    compatibleDrippers: ["origami"],
    flowTendency: "steadier",
    flavorBias: "sweetness",
    notes: [
      "Adds balance and sweetness.",
      "Slightly slower and calmer than cone paper.",
    ],
    shortLabel: "Wave",
    description: "Wave paper that gives Origami a rounder, steadier flow.",
    ui: { filterVisual: "wave-paper", thicknessVisual: "medium" },
  },
];

export const filterMap = Object.fromEntries(
  filters.map((filter) => [filter.id, filter]),
) as Record<(typeof filters)[number]["id"], (typeof filters)[number]>;
