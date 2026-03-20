import { describe, expect, it } from "vitest";
import { calculateBrewPlan } from "@/lib/brew-engine/calculateBrewPlan";

describe("iced mode", () => {
  it("V60 iced uses preset-defined structure (3-pour flash brew)", () => {
    const plan = calculateBrewPlan({
      source: "standard",
      presetId: "v60-hario-iced-3pour",
      dripper: "v60",
      filter: "hario-paper",
      brewMode: "iced",
      overrides: {},
    });

    const pourStages = plan.stages.filter((stage) => stage.action === "pour");

    expect(plan.iceG).toBeGreaterThan(0);
    expect(plan.hotWaterG).toBeLessThan(plan.totalWaterG);
    expect(pourStages.length).toBe(3);
    expect(pourStages[0]?.label).toBe("Pour 1");
    expect(plan.stages.at(-1)?.targetWaterG).toBe(plan.hotWaterG);
  });

  it("iced plan has valid stages", () => {
    const plan = calculateBrewPlan({
      source: "standard",
      presetId: "v60-hario-iced-3pour",
      dripper: "v60",
      filter: "hario-paper",
      brewMode: "iced",
      overrides: {},
    });

    expect(plan.stages.length).toBeGreaterThan(0);
    expect(plan.stages.every((s) => s.durationSec > 0)).toBe(true);
    expect(plan.stages.at(-1)?.targetWaterG).toBe(plan.hotWaterG);
  });
});
