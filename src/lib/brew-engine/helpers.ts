import type { AgitationLevel, GrindLevelLabel } from "@/types/domain";

const AGITATION_LEVELS: AgitationLevel[] = [
  "very-low",
  "low",
  "medium",
  "medium-high",
];

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function roundToWhole(value: number) {
  return Math.round(value);
}

export function normalizeDistribution(pattern: number[], expectedLength: number) {
  if (pattern.length === expectedLength) {
    const total = pattern.reduce((sum, value) => sum + value, 0);

    if (total > 0) {
      return pattern.map((value) => value / total);
    }
  }

  if (expectedLength === 2) {
    return [0.5, 0.5];
  }

  if (expectedLength === 4) {
    return [0.28, 0.24, 0.24, 0.24];
  }

  return [0.34, 0.33, 0.33];
}

export function buildPourTargets(remainingWaterG: number, distributionPattern: number[]) {
  let cumulative = 0;

  return distributionPattern.map((fraction, index) => {
    if (index === distributionPattern.length - 1) {
      return remainingWaterG - cumulative;
    }

    const portion = roundToWhole(remainingWaterG * fraction);
    cumulative += portion;

    return portion;
  });
}

export function shiftAgitation(
  baseline: AgitationLevel,
  delta: number,
): AgitationLevel {
  const index = AGITATION_LEVELS.indexOf(baseline);
  const nextIndex = clampNumber(index + delta, 0, AGITATION_LEVELS.length - 1);

  return AGITATION_LEVELS[nextIndex];
}

export function shiftGrindLabel(
  baseline: GrindLevelLabel,
  delta: number,
): GrindLevelLabel {
  if (delta <= -2) {
    return "medium-fine";
  }

  if (delta === -1) {
    return baseline === "medium-fine" ? "medium-fine" : "slightly-finer";
  }

  if (delta >= 2) {
    return "medium-coarse";
  }

  if (delta === 1) {
    return baseline === "medium-coarse" ? "medium-coarse" : "slightly-coarser";
  }

  return baseline;
}

export function uniqueStrings(values: string[]) {
  return Array.from(new Set(values));
}
