import { buildPourTargets } from "@/lib/brew-engine/helpers";
import type { BrewStage, ResolvedBrewProfile } from "@/types/brew";

function createStage(
  index: number,
  label: string,
  action: BrewStage["action"],
  startSec: number,
  durationSec: number,
  targetWaterG: number,
  note?: string,
): BrewStage {
  return {
    index,
    label,
    action,
    startSec,
    endSec: startSec + durationSec,
    durationSec,
    targetWaterG,
    note,
  };
}

export function buildStages(profile: ResolvedBrewProfile): BrewStage[] {
  const waterTarget = profile.hotWaterG;
  const mainPours = profile.mainPours;
  const ps = profile.pourStructure;

  if (profile.brewMode === "iced") {
    const remainingWater = waterTarget - profile.bloomWaterG;
    const pourTargets = buildPourTargets(remainingWater, profile.distributionPattern);
    const waitSec = ps.waitBetweenPoursSec;
    const pourSec = ps.pourDurationSec;
    const waits = Array(mainPours - 1).fill(waitSec);

    const fixedDuration =
      mainPours * pourSec + waits.reduce((sum, w) => sum + w, 0);
    const totalTargetTime = Math.max(
      profile.targetBrewTimeSec,
      fixedDuration + ps.finalDrawdownMinSec,
    );
    const drawdownDuration = totalTargetTime - fixedDuration;

    const stages: BrewStage[] = [];
    let cursor = 0;
    let cumulativeWaterG = 0;

    for (let i = 0; i < mainPours; i++) {
      cumulativeWaterG = i === mainPours - 1
        ? waterTarget
        : cumulativeWaterG + pourTargets[i];

      stages.push(
        createStage(
          stages.length,
          `Pour ${i + 1}`,
          "pour",
          cursor,
          pourSec,
          cumulativeWaterG,
          `Reach ${cumulativeWaterG}g total water.`,
        ),
      );
      cursor += pourSec;

      if (i < mainPours - 1) {
        stages.push(
          createStage(
            stages.length,
            `Wait ${i + 1}`,
            "wait",
            cursor,
            waits[i],
            cumulativeWaterG,
            "Let the water level drop before the next pour.",
          ),
        );
        cursor += waits[i];
      }
    }

    stages.push(
      createStage(
        stages.length,
        "Final Drawdown",
        "drawdown",
        cursor,
        drawdownDuration,
        waterTarget,
        "Finish the iced drawdown cleanly without adding more water.",
      ),
    );

    return stages.map((s, i) => ({ ...s, index: i }));
  }

  const remainingWaterG = waterTarget - profile.bloomWaterG;
  const pourTargets = buildPourTargets(remainingWaterG, profile.distributionPattern);
  const fixedDuration =
    ps.bloomDurationSec +
    ps.bloomWaitSec +
    mainPours * ps.pourDurationSec +
    Math.max(mainPours - 1, 0) * ps.waitBetweenPoursSec;
  const totalTargetTime = Math.max(
    profile.targetBrewTimeSec,
    fixedDuration + ps.finalDrawdownMinSec,
  );
  const drawdownDuration = totalTargetTime - fixedDuration;

  const stages: BrewStage[] = [];
  let cursor = 0;
  let cumulativeWaterG = profile.bloomWaterG;

  stages.push(
    createStage(
      0,
      "Bloom",
      "pour",
      cursor,
      ps.bloomDurationSec,
      cumulativeWaterG,
      `Pour to ${cumulativeWaterG}g and saturate evenly.`,
    ),
  );
  cursor += ps.bloomDurationSec;

  stages.push(
    createStage(
      1,
      "Bloom Wait",
      "wait",
      cursor,
      ps.bloomWaitSec,
      cumulativeWaterG,
      "Let the coffee de-gas before the main pours.",
    ),
  );
  cursor += ps.bloomWaitSec;

  pourTargets.forEach((portion, i) => {
    cumulativeWaterG += portion;

    stages.push(
      createStage(
        stages.length,
        `Pour ${i + 2}`,
        "pour",
        cursor,
        ps.pourDurationSec,
        cumulativeWaterG,
        `Reach ${cumulativeWaterG}g total water.`,
      ),
    );
    cursor += ps.pourDurationSec;

    if (i < pourTargets.length - 1) {
      stages.push(
        createStage(
          stages.length,
          `Wait ${i + 2}`,
          "wait",
          cursor,
          ps.waitBetweenPoursSec,
          cumulativeWaterG,
          "Allow the bed to settle before the next pulse.",
        ),
      );
      cursor += ps.waitBetweenPoursSec;
    }
  });

  stages.push(
    createStage(
      stages.length,
      "Final Drawdown",
      "drawdown",
      cursor,
      Math.max(drawdownDuration, ps.finalDrawdownMinSec),
      waterTarget,
      "No new water; allow the brew to finish cleanly.",
    ),
  );

  return stages.map((s, i) => ({ ...s, index: i }));
}
