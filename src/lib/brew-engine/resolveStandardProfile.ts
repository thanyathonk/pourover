import { dripperMap } from "@/data/drippers";
import { filterMap } from "@/data/filters";
import { presetMap } from "@/data/presets";
import { recipeMap } from "@/data/recipeLibrary";
import { roastAdjustmentMap } from "@/data/roastAdjustments";
import { processAdjustmentMap } from "@/data/processAdjustments";
import {
  clampNumber,
  normalizeDistribution,
  roundToWhole,
  shiftGrindLabel,
  uniqueStrings,
} from "@/lib/brew-engine/helpers";
import type { ResolvedBrewProfile } from "@/types/brew";
import type { RecipeOverrides, StandardBrewInput } from "@/types/brew";
import type { GrindLevelLabel } from "@/types/domain";

/**
 * resolvedRecipe = presetDefaults + userOverrides
 */
function mergePresetWithOverrides(
  preset: (typeof presetMap)[string],
  overrides: RecipeOverrides,
) {
  return {
    doseG: clampNumber(overrides.doseG ?? preset.defaultDoseG, 10, 40),
    ratio: clampNumber(overrides.ratio ?? preset.defaultRatio, 14, 18.5),
    roastLevel: overrides.roastLevel ?? preset.defaultRoast,
    process: overrides.process ?? preset.defaultProcess,
    pourCount: overrides.pourCount ?? preset.defaultPourCount,
    bloomMultiplier: overrides.bloomMultiplier ?? preset.defaultBloomMultiplier,
    bloomDurationSec: overrides.bloomDurationSec ?? preset.defaultBloomDurationSec,
    bloomWaitSec: overrides.bloomWaitSec ?? preset.defaultBloomWaitSec,
    targetBrewTimeSec: overrides.targetBrewTimeSec ?? preset.defaultTargetBrewTimeSec,
    distribution: preset.defaultDistribution,
    grindNote: preset.grindNote,
  };
}

export function resolveStandardProfile(input: StandardBrewInput): ResolvedBrewProfile {
  const preset = presetMap[input.presetId];
  if (!preset) {
    throw new Error(`Preset not found: ${input.presetId}`);
  }

  const resolved = mergePresetWithOverrides(preset, input.overrides);
  const dripper = dripperMap[preset.dripperId];
  const filter = filterMap[preset.filterId];
  const recipe = recipeMap[preset.recipeId];
  const roast = roastAdjustmentMap[resolved.roastLevel];
  const process = processAdjustmentMap[resolved.process];

  const isIced = preset.brewMode === "iced";

  let totalWaterG: number;
  let hotWaterG: number;
  let iceG: number;
  let brewWaterG: number;

  if (isIced && (preset.brewWaterG != null || preset.iceG != null)) {
    const presetBrew = preset.brewWaterG ?? 150;
    const presetIce = preset.iceG ?? 75;
    const scale = resolved.doseG / preset.defaultDoseG;
    brewWaterG = roundToWhole(presetBrew * scale);
    iceG = roundToWhole(presetIce * scale);
    totalWaterG = brewWaterG + iceG;
    hotWaterG = brewWaterG;
  } else {
    totalWaterG = roundToWhole(resolved.doseG * resolved.ratio);
    hotWaterG = totalWaterG;
    iceG = 0;
    brewWaterG = totalWaterG;
  }

  const bloomMultiplier = clampNumber(resolved.bloomMultiplier, 2.5, 3.5);
  const bloomWaterG = isIced
    ? 0
    : roundToWhole(
        clampNumber(
          resolved.doseG * bloomMultiplier,
          resolved.doseG * 2.5,
          resolved.doseG * 3.5,
        ),
      );

  const mainPours = resolved.pourCount;
  const distributionPattern =
    resolved.distribution.length === mainPours
      ? normalizeDistribution(resolved.distribution, mainPours)
      : mainPours === 4
        ? [0.28, 0.24, 0.24, 0.24]
        : [0.34, 0.33, 0.33];

  const tempFromRecipe = recipe?.recommendedTempCByRoast?.[resolved.roastLevel] ?? recipe?.recommendedTempC ?? 92;
  const recommendedTempC = clampNumber(
    tempFromRecipe + roast.adjustments.tempDeltaC,
    88,
    98,
  );

  const grindLabel = shiftGrindLabel(
    (resolved.grindNote as GrindLevelLabel) ?? "medium",
    roast.adjustments.grindShift,
  );

  const targetBrewTimeSec = clampNumber(
    resolved.targetBrewTimeSec +
      roast.adjustments.brewTimeDeltaSec +
      process.adjustments.brewTimeDeltaSec,
    150,
    250,
  );

  const pourStructure = {
    bloomDurationSec: isIced ? 0 : resolved.bloomDurationSec,
    bloomWaitSec: isIced ? 0 : resolved.bloomWaitSec,
    pourDurationSec: 12,
    waitBetweenPoursSec: 18,
    finalDrawdownMinSec: 40,
  };

  const notes = uniqueStrings([
    ...preset.notes,
    ...dripper.notes,
    ...filter.notes,
    ...roast.notes,
    ...process.notes,
  ].filter(Boolean));

  return {
    dripperId: preset.dripperId,
    filterId: preset.filterId,
    brewMode: preset.brewMode,
    coffeeG: resolved.doseG,
    ratio: resolved.ratio,
    totalWaterG,
    hotWaterG,
    iceG,
    brewWaterG,
    recommendedTempC,
    bloomMultiplier,
    bloomWaterG,
    mainPours,
    targetBrewTimeSec,
    agitationLevel: "medium",
    grindLabel,
    distributionPattern,
    recipeId: preset.recipeId,
    notes,
    metrics: { clarityScore: 5, bodyScore: 5, sweetnessScore: 5 },
    pourStructure,
  };
}
