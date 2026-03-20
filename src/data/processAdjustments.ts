import type { ProcessAdjustmentProfile } from "@/types/domain";

export const processAdjustments: ProcessAdjustmentProfile[] = [
  {
    id: "washed",
    label: "Washed",
    adjustments: {
      brewTimeDeltaSec: 0,
      agitationShift: 0,
      clarityShift: 1,
      sweetnessShift: 0,
    },
    notes: ["Keeps a clean, baseline extraction feel."],
  },
  {
    id: "natural",
    label: "Natural",
    adjustments: {
      brewTimeDeltaSec: 5,
      agitationShift: -1,
      clarityShift: -1,
      sweetnessShift: 1,
    },
    notes: ["Softer agitation helps preserve fruit sweetness and body."],
  },
  {
    id: "honey",
    label: "Honey",
    adjustments: {
      brewTimeDeltaSec: 2,
      agitationShift: 0,
      clarityShift: 0,
      sweetnessShift: 1,
    },
    notes: ["Adds a touch of sweetness without pushing too far from balance."],
  },
  {
    id: "anaerobic",
    label: "Anaerobic",
    adjustments: {
      brewTimeDeltaSec: 8,
      agitationShift: -1,
      clarityShift: -1,
      sweetnessShift: 1,
    },
    notes: ["A calmer recipe helps keep intense fermentation notes from getting muddy."],
  },
];

export const processAdjustmentMap = Object.fromEntries(
  processAdjustments.map((adjustment) => [adjustment.id, adjustment]),
) as Record<
  (typeof processAdjustments)[number]["id"],
  (typeof processAdjustments)[number]
>;
