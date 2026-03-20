import { describe, expect, it } from "vitest";
import { calculateBrewPlan } from "@/lib/brew-engine/calculateBrewPlan";
import type { BrewInput, StandardBrewInput } from "@/types/brew";

function makeStandardInput(overrides: Partial<StandardBrewInput> = {}): StandardBrewInput {
  return {
    source: "standard",
    presetId: "v60-balanced-classic",
    dripper: "v60",
    filter: "hario-paper",
    brewMode: "hot",
    overrides: {},
    ...overrides,
  };
}

describe("calculateBrewPlan", () => {
  it("returns a valid default V60 plan", () => {
    const plan = calculateBrewPlan(makeStandardInput());

    expect(plan.sourceType).toBe("standard");
    expect(plan.dripper).toBe("v60");
    expect(plan.filter).toBe("hario-paper");
    expect(plan.coffeeG).toBe(15);
    const ratio = plan.ratio ?? plan.totalWaterG / plan.coffeeG;
    expect(plan.totalWaterG).toBe(Math.round(plan.coffeeG * ratio));
    expect(plan.hotWaterG).toBe(plan.totalWaterG);
    expect(plan.iceG).toBe(0);
    expect(plan.stages[0]?.label).toBe("Bloom");
    expect(plan.stages.at(-1)?.label).toBe("Final Drawdown");
  });

  it("keeps hot-mode total water equal to dose times ratio", () => {
    const plan = calculateBrewPlan(
      makeStandardInput({ overrides: { doseG: 15, ratio: 15 } }),
    );

    expect(plan.totalWaterG).toBe(225);
    expect(plan.hotWaterG).toBe(225);
  });

  it("returns valid plans for each supported dripper", () => {
    const inputs: StandardBrewInput[] = [
      makeStandardInput(),
      makeStandardInput({
        presetId: "origami-cone-clarity",
        dripper: "origami",
        filter: "origami-paper",
      }),
      makeStandardInput({
        presetId: "ct62-clean-balance",
        dripper: "ct62",
        filter: "hario-paper",
      }),
    ];

    for (const input of inputs) {
      const plan = calculateBrewPlan(input);

      expect(plan.stages.length).toBeGreaterThan(3);
      expect(plan.targetBrewTimeSec).toBeGreaterThan(0);
      expect(plan.recommendedTempC).toBeGreaterThan(0);
    }
  });

  it("preset choice creates meaningful differences", () => {
    const balanced = calculateBrewPlan(makeStandardInput({ presetId: "v60-balanced-classic" }));
    const bright = calculateBrewPlan(makeStandardInput({ presetId: "v60-bright-clean" }));

    expect(balanced.presetId).toBe("v60-balanced-classic");
    expect(bright.presetId).toBe("v60-bright-clean");
    expect(bright.recommendedTempC).toBeGreaterThanOrEqual(balanced.recommendedTempC);
  });

  it("ct62 plan differs from v60", () => {
    const v60Plan = calculateBrewPlan(makeStandardInput());
    const ct62Plan = calculateBrewPlan(
      makeStandardInput({
        presetId: "ct62-clean-balance",
        dripper: "ct62",
        filter: "hario-paper",
      }),
    );

    expect(ct62Plan.dripper).toBe("ct62");
    expect(ct62Plan.presetId).toBe("ct62-clean-balance");
  });

  it("editing dose recalculates total water", () => {
    const plan15 = calculateBrewPlan(makeStandardInput({ overrides: { doseG: 15, ratio: 15 } }));
    const plan20 = calculateBrewPlan(makeStandardInput({ overrides: { doseG: 20, ratio: 15 } }));

    expect(plan15.totalWaterG).toBe(225);
    expect(plan20.totalWaterG).toBe(300);
  });

  it("selecting new preset uses new preset defaults", () => {
    const balanced = calculateBrewPlan(makeStandardInput({
      presetId: "v60-balanced-classic",
      overrides: { doseG: 18 },
    }));
    const sweet = calculateBrewPlan(makeStandardInput({
      presetId: "v60-sweet-gentle",
      overrides: {},
    }));

    expect(balanced.presetId).toBe("v60-balanced-classic");
    expect(sweet.presetId).toBe("v60-sweet-gentle");
    expect(sweet.coffeeG).toBe(15);
  });
});

describe("4:6 Method", () => {
  it("builds valid 4:6 plan with 5 pours", () => {
    const plan = calculateBrewPlan({
      source: "four-six",
      doseG: 20,
      roastLevel: "medium",
      tasteMode: "basic",
      bodyMode: "basic",
    });

    expect(plan.sourceType).toBe("four-six");
    expect(plan.coffeeG).toBe(20);
    expect(plan.totalWaterG).toBe(300);
    expect(plan.stages.filter((s) => s.action === "pour")).toHaveLength(5);
    expect(plan.stages.at(-1)?.targetWaterG).toBe(plan.hotWaterG);
  });

  it("lighter body uses 3 pours", () => {
    const plan = calculateBrewPlan({
      source: "four-six",
      doseG: 20,
      roastLevel: "medium",
      tasteMode: "basic",
      bodyMode: "lighter",
    });

    expect(plan.stages.filter((s) => s.action === "pour")).toHaveLength(3);
  });
});
