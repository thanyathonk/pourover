import { describe, expect, it } from "vitest";
import { calculateBrewPlan } from "@/lib/brew-engine/calculateBrewPlan";

describe("stage generation", () => {
  const plan = calculateBrewPlan({
    source: "standard",
    presetId: "v60-balanced-classic",
    dripper: "v60",
    filter: "hario-paper",
    brewMode: "hot",
    overrides: {},
  });

  it("creates monotonic stage times", () => {
    for (let index = 1; index < plan.stages.length; index += 1) {
      expect(plan.stages[index].startSec).toBeGreaterThanOrEqual(
        plan.stages[index - 1].endSec,
      );
      expect(plan.stages[index].durationSec).toBeGreaterThan(0);
    }
  });

  it("ends with the exact final cumulative hot water target", () => {
    expect(plan.stages.at(-1)?.targetWaterG).toBe(plan.hotWaterG);
    expect(plan.stages.at(-1)?.endSec).toBe(plan.targetBrewTimeSec);
  });
});
