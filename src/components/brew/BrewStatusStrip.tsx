"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import type { BrewPlan } from "@/types/brew";

type BrewStatusStripProps = {
  plan: BrewPlan;
  elapsedMs: number;
  isCompleted: boolean;
};

export function BrewStatusStrip({
  plan,
  elapsedMs,
  isCompleted,
}: BrewStatusStripProps) {
  const elapsedSecPrecise = elapsedMs / 1000;
  const { actionStages, currentActionIndex, actionProgress } = useMemo(() => {
    const actions = plan.stages.filter((s) => s.action !== "wait");
    const ranges = actions.map((s, i) => {
      const next = actions[i + 1];
      const displayEnd = next ? next.startSec : s.endSec;
      return { start: s.startSec, end: displayEnd, duration: displayEnd - s.startSec };
    });
    const currentIdx = ranges.findIndex(
      (r) => elapsedSecPrecise >= r.start && elapsedSecPrecise < r.end,
    );
    const progress =
      currentIdx >= 0
        ? (elapsedSecPrecise - ranges[currentIdx].start) /
          Math.max(ranges[currentIdx].duration, 0.001)
        : 0;
    return {
      actionStages: actions,
      currentActionIndex: currentIdx,
      actionProgress: Math.min(1, Math.max(0, progress)),
    };
  }, [plan.stages, elapsedSecPrecise]);

  const lastCompletedActionIndex = useMemo(() => {
    const actions = plan.stages.filter((s) => s.action !== "wait");
    const ranges = actions.map((s, i) => {
      const next = actions[i + 1];
      return { start: s.startSec, end: next ? next.startSec : s.endSec };
    });
    if (currentActionIndex >= 0) return -1;
    return ranges.findLastIndex((r) => r.end <= elapsedSecPrecise);
  }, [plan.stages, currentActionIndex, elapsedSecPrecise]);

  return (
    <div className="flex gap-2">
      {actionStages.map((stage, index) => {
        const isComplete =
          isCompleted || index < currentActionIndex ||
          (currentActionIndex < 0 && index <= lastCompletedActionIndex);
        const isActive = index === currentActionIndex && !isCompleted;
        const width = isComplete ? 100 : isActive ? actionProgress * 100 : 0;

        return (
          <div
            key={`${stage.label}-${stage.index}`}
            className={cn(
              "h-2 flex-1 overflow-hidden rounded-full bg-white/10",
              (isComplete || isActive) && "bg-sky-300/30",
            )}
          >
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-200 ease-linear",
                isActive ? "bg-amber-300" : "bg-sky-300/80",
              )}
              style={{ width: `${Math.max(width, 0)}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
