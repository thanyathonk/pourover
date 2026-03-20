import { describe, expect, it } from "vitest";
import { calculateBrewPlan } from "@/lib/brew-engine/calculateBrewPlan";

describe("filter rules", () => {
  it("rejects incompatible filters via preset validation", () => {
    expect(() =>
      calculateBrewPlan({
        source: "standard",
        presetId: "ct62-clean-balance",
        dripper: "ct62",
        filter: "kalita-wave",
        brewMode: "hot",
        overrides: {},
      }),
    ).toThrow(/not compatible|Preset not found/i);
  });

  it("origami changes with cone vs wave filter", () => {
    const conePlan = calculateBrewPlan({
      source: "standard",
      presetId: "origami-cone-clarity",
      dripper: "origami",
      filter: "origami-paper",
      brewMode: "hot",
      overrides: {},
    });
    const wavePlan = calculateBrewPlan({
      source: "standard",
      presetId: "origami-balanced-hybrid",
      dripper: "origami",
      filter: "kalita-wave",
      brewMode: "hot",
      overrides: {},
    });

    expect(wavePlan.filter).toBe("kalita-wave");
    expect(conePlan.filter).toBe("origami-paper");
  });
});
