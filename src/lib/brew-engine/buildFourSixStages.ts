import type { BrewPlan, BrewStage } from "@/types/brew";
import type { FourSixBrewInput, FourSixBodyMode, FourSixTasteMode } from "@/types/brew";
import type { DripperId, FilterId, RoastLevel } from "@/types/domain";

/**
 * 4:6 Method — Hario official timing baseline (5 pours)
 * Pour 1: 0:00, Pour 2: 0:45, Pour 3: 1:30, Pour 4: 2:15, Pour 5: 2:45, End: 3:30
 * For Lighter (3 pours): Pour 1: 0:00, Pour 2: 0:45, Pour 3: 1:30, End: 2:15
 */
const POUR_DURATION_SEC = 10;

/** Taste (first 40%): two pours. Basic [20,20], Sweetness [15,25], Acidity [25,15] */
const TASTE_DISTRIBUTIONS: Record<FourSixTasteMode, [number, number]> = {
  basic: [20, 20],
  sweetness: [15, 25],
  acidity: [25, 15],
};

/**
 * Body (last 60%): three pours for basic/stronger, one pour for lighter.
 * Basic: [20, 20, 20]
 * Stronger: [20, 30, 30] → normalized to 60% = [15, 22.5, 22.5]
 * Lighter: single pour [60] → 3 pours total (2 taste + 1 body)
 */
const BODY_DISTRIBUTIONS: Record<FourSixBodyMode, number[]> = {
  basic: [20, 20, 20],
  stronger: [15, 22.5, 22.5],
  lighter: [60],
};

/** Exported for UI: get pour percentages from taste/body selection */
export function getFourSixPourPercentages(
  tasteMode: FourSixTasteMode,
  bodyMode: FourSixBodyMode,
): number[] {
  const taste = TASTE_DISTRIBUTIONS[tasteMode];
  const body = BODY_DISTRIBUTIONS[bodyMode];

  if (body.length === 1) {
    return [...taste, body[0]];
  }
  return [...taste, ...body];
}

function buildPourPercentages(
  tasteMode: FourSixTasteMode,
  bodyMode: FourSixBodyMode,
): number[] {
  return getFourSixPourPercentages(tasteMode, bodyMode);
}

function createStage(
  index: number,
  label: string,
  action: BrewStage["action"],
  startSec: number,
  endSec: number,
  targetWaterG: number,
  pourGrams?: number,
  pourPercent?: number,
  note?: string,
): BrewStage {
  return {
    index,
    label,
    action,
    startSec,
    endSec,
    durationSec: endSec - startSec,
    targetWaterG,
    pourGrams,
    pourPercent,
    note,
  };
}

const TEMP_BY_ROAST: Record<RoastLevel, number> = {
  light: 93,
  medium: 88,
  dark: 83,
};

function getPourStartTimes(pourCount: number): number[] {
  if (pourCount === 3) return [0, 45, 90];
  return [0, 45, 90, 135, 165];
}

export function buildFourSixPlan(input: FourSixBrewInput): BrewPlan {
  const ratio = input.ratio ?? 15;
  const totalWaterG = Math.round(input.doseG * ratio);
  const dripper: DripperId = input.dripper ?? "v60";
  const filter: FilterId = input.filter ?? "hario-paper";

  const percentages = buildPourPercentages(input.tasteMode, input.bodyMode);
  const pourCount = percentages.length;

  const pourGrams = percentages.map((p) => Math.round((totalWaterG * p) / 100));
  const cumulative = pourGrams.reduce<number[]>((acc, g, i) => {
    acc.push((acc[i - 1] ?? 0) + g);
    return acc;
  }, []);
  cumulative[cumulative.length - 1] = totalWaterG;

  const pourStartSec = getPourStartTimes(pourCount);
  const totalTimeSec = pourCount === 3 ? 135 : 210;

  const stages: BrewStage[] = [];
  let stageIndex = 0;

  for (let i = 0; i < pourCount; i++) {
    const startSec = pourStartSec[i];
    const endPourSec = startSec + POUR_DURATION_SEC;
    const nextPourStart = i < pourCount - 1 ? pourStartSec[i + 1] : totalTimeSec;

    stages.push(
      createStage(
        stageIndex++,
        `Pour ${i + 1}`,
        "pour",
        startSec,
        endPourSec,
        cumulative[i],
        pourGrams[i],
        percentages[i],
        `${percentages[i]}% — ${pourGrams[i]}g`,
      ),
    );

    if (i < pourCount - 1 && nextPourStart - endPourSec > 1) {
      stages.push(
        createStage(
          stageIndex++,
          `Wait ${i + 1}`,
          "wait",
          endPourSec,
          nextPourStart,
          cumulative[i],
          undefined,
          undefined,
          "Wait before next pour.",
        ),
      );
    }
  }

  const lastPourEnd = pourStartSec[pourCount - 1] + POUR_DURATION_SEC;
  stages.push(
    createStage(
      stageIndex,
      "Remove dripper",
      "drawdown",
      lastPourEnd,
      totalTimeSec,
      totalWaterG,
      undefined,
      undefined,
      totalTimeSec === 210 ? "3:30 — Remove dripper when done." : "Remove dripper when done.",
    ),
  );

  return {
    sourceType: "four-six",
    dripper,
    filter,
    brewMode: "hot",
    presetId: undefined,
    coffeeG: input.doseG,
    ratio,
    totalWaterG,
    brewWaterG: totalWaterG,
    hotWaterG: totalWaterG,
    iceG: 0,
    recommendedTempC: TEMP_BY_ROAST[input.roastLevel],
    grindNote: "Medium coarse to coarse",
    bloomWaterG: 0,
    targetBrewTimeSec: totalTimeSec,
    notes: [
      `Hario 4:6 Method — ${stages.length} pours.`,
      "First 40% influences taste, last 60% influences body.",
      "Grind: medium coarse to coarse.",
    ],
    stages: stages.map((s, i) => ({ ...s, index: i })),
  };
}
