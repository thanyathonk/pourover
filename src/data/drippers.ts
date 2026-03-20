import type { DripperProfile } from "@/types/domain";

export const drippers: DripperProfile[] = [
  {
    id: "v60",
    label: "Hario V60",
    geometry: "cone",
    supportedFilters: ["hario-paper"],
    defaultHotRecipeId: "v60-hario-hot-light-balanced-default",
    defaultIcedRecipeId: "v60-hario-iced-3pour",
    notes: [
      "Encourages clarity and brighter structure.",
      "Responds well to more active pulse pours.",
    ],
    shortLabel: "V60",
    description: "Fast, agile cone brewer that rewards precise pulse pouring.",
    ui: { accentKey: "glass", animationProfile: "agile" },
  },
  {
    id: "origami",
    label: "Origami",
    geometry: "wave-sensitive-cone",
    supportedFilters: ["origami-paper", "kalita-wave"],
    defaultHotRecipeId: "origami-cone-hot-bright-default",
    defaultIcedRecipeId: "origami-iced-3pour",
    notes: [
      "Cone filters push more clarity and speed.",
      "Wave filters round the cup and slow the drawdown slightly.",
    ],
    shortLabel: "Origami",
    description:
      "Flexible brewer whose character shifts noticeably with filter choice.",
    ui: { accentKey: "ceramic", animationProfile: "refined" },
  },
  {
    id: "ct62",
    label: "CT62",
    geometry: "cone",
    supportedFilters: ["hario-paper"],
    defaultHotRecipeId: "ct62-hario-hot-balanced-default",
    defaultIcedRecipeId: "ct62-hario-iced-3pour",
    notes: [
      "Uses Hario-style cone paper compatibility in the MVP.",
      "Feels steadier and calmer than an agile V60 recipe.",
    ],
    shortLabel: "CT62",
    description: "Steady cone brewer with V60-style paper compatibility in MVP.",
    ui: { accentKey: "glass", animationProfile: "stable" },
  },
];

export const dripperMap = Object.fromEntries(
  drippers.map((dripper) => [dripper.id, dripper]),
) as Record<(typeof drippers)[number]["id"], (typeof drippers)[number]>;
