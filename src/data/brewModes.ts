import type { BrewModeProfile } from "@/types/domain";

export const brewModes: BrewModeProfile[] = [
  {
    id: "hot",
    label: "Hot",
    description: "Classic hot pour-over mode.",
    calculation: {
      grindShift: 0,
      brewTimeDeltaSec: 0,
    },
    notes: ["Hot mode always uses totalWaterG = round(doseG * ratio)."],
  },
  {
    id: "iced",
    label: "Iced",
    description: "Dedicated 4:6-inspired iced mode with five equal pours.",
    calculation: {
      grindShift: -1,
      brewTimeDeltaSec: 20,
    },
    notes: [
      "Iced mode uses totalWaterG = round(doseG * ratio).",
      "Build five equal pours with a dedicated 4:6-inspired timing structure.",
    ],
  },
];

export const brewModeMap = Object.fromEntries(
  brewModes.map((mode) => [mode.id, mode]),
) as Record<(typeof brewModes)[number]["id"], (typeof brewModes)[number]>;
