import { buildStages } from "@/lib/brew-engine/buildStages";
import { buildFourSixPlan } from "@/lib/brew-engine/buildFourSixStages";
import { formatGrindNote } from "@/lib/brew-engine/formatters";
import { buildPlanNotes } from "@/lib/brew-engine/notes";
import { resolveStandardProfile } from "@/lib/brew-engine/resolveStandardProfile";
import { assertValidInput } from "@/lib/brew-engine/validators";
import type { BrewInput, BrewPlan } from "@/types/brew";

function assertStageIntegrity(plan: BrewPlan) {
  if (plan.stages.length === 0) throw new Error("Brew plan must include stages.");
  for (let i = 0; i < plan.stages.length; i++) {
    const stage = plan.stages[i];
    const prev = plan.stages[i - 1];
    if (stage.durationSec <= 0) throw new Error(`Stage ${stage.label} must have positive duration.`);
    if (prev && stage.startSec < prev.endSec) throw new Error(`Stage ${stage.label} must be monotonic.`);
  }
  const last = plan.stages[plan.stages.length - 1];
  if (last.targetWaterG !== plan.hotWaterG) throw new Error("Final cumulative water must equal hot brew water.");
  if (last.endSec !== plan.targetBrewTimeSec) throw new Error("Final stage must end at the target brew time.");
}

export function calculateBrewPlan(input: BrewInput): BrewPlan {
  assertValidInput(input);

  if (input.source === "four-six") {
    const plan = buildFourSixPlan(input);
    assertStageIntegrity(plan);
    return plan;
  }

  const resolved = resolveStandardProfile(input);
  const stages = buildStages(resolved);
  const notes = buildPlanNotes(resolved);
  const actualEndSec = stages[stages.length - 1]?.endSec ?? resolved.targetBrewTimeSec;

  const plan: BrewPlan = {
    sourceType: "standard",
    dripper: resolved.dripperId,
    filter: resolved.filterId,
    brewMode: resolved.brewMode,
    presetId: input.presetId,
    coffeeG: resolved.coffeeG,
    ratio: resolved.ratio,
    totalWaterG: resolved.totalWaterG,
    brewWaterG: resolved.brewWaterG,
    hotWaterG: resolved.hotWaterG,
    iceG: resolved.iceG,
    recommendedTempC: resolved.recommendedTempC,
    grindNote: formatGrindNote(resolved),
    bloomWaterG: resolved.bloomWaterG,
    targetBrewTimeSec: actualEndSec,
    notes,
    stages,
  };

  assertStageIntegrity(plan);
  return plan;
}
