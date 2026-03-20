"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BrewPlan, PlaybackController, PlaybackState } from "@/types/brew";

function getStageIndex(plan: BrewPlan, elapsedSec: number) {
  return plan.stages.findIndex(
    (stage) => elapsedSec >= stage.startSec && elapsedSec < stage.endSec,
  );
}

function getStageProgress(plan: BrewPlan, stageIndex: number, elapsedMs: number) {
  if (stageIndex < 0) {
    return 0;
  }

  const stage = plan.stages[stageIndex];
  const elapsedPreciseSec = elapsedMs / 1000;

  if (elapsedPreciseSec <= stage.startSec) {
    return 0;
  }

  if (elapsedPreciseSec >= stage.endSec) {
    return 1;
  }

  return (elapsedPreciseSec - stage.startSec) / stage.durationSec;
}

function getCumulativeWater(plan: BrewPlan, stageIndex: number, elapsedSec: number) {
  if (stageIndex < 0) {
    return 0;
  }

  const stage = plan.stages[stageIndex];
  const previousTarget = stageIndex > 0 ? plan.stages[stageIndex - 1].targetWaterG : 0;

  if (stage.action !== "pour") {
    return previousTarget;
  }

  const progress =
    stage.durationSec === 0 ? 1 : (elapsedSec - stage.startSec) / stage.durationSec;

  return Math.round(previousTarget + (stage.targetWaterG - previousTarget) * progress);
}

export function useBrewPlayback(plan: BrewPlan | null): PlaybackState & PlaybackController {
  const [status, setStatus] = useState<PlaybackState["status"]>("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const startedAtRef = useRef<number | null>(null);
  const carriedMsRef = useRef(0);

  const reset = useCallback(() => {
    setStatus("idle");
    setElapsedMs(0);
    startedAtRef.current = null;
    carriedMsRef.current = 0;
  }, []);

  const start = useCallback(() => {
    if (!plan) {
      return;
    }

    carriedMsRef.current = 0;
    startedAtRef.current = performance.now();
    setElapsedMs(0);
    setStatus("running");
  }, [plan]);

  const pause = useCallback(() => {
    if (status !== "running") {
      return;
    }

    carriedMsRef.current = elapsedMs;
    startedAtRef.current = null;
    setStatus("paused");
  }, [elapsedMs, status]);

  const resume = useCallback(() => {
    if (status !== "paused" || !plan) {
      return;
    }

    startedAtRef.current = performance.now();
    setStatus("running");
  }, [plan, status]);

  useEffect(() => {
    if (status !== "running" || !plan) {
      return;
    }

    const interval = window.setInterval(() => {
      const now = performance.now();
      const base = startedAtRef.current ? now - startedAtRef.current : 0;
      const nextMs = Math.min(
        carriedMsRef.current + base,
        plan.targetBrewTimeSec * 1000,
      );

      setElapsedMs(nextMs);

      if (nextMs >= plan.targetBrewTimeSec * 1000) {
        carriedMsRef.current = plan.targetBrewTimeSec * 1000;
        startedAtRef.current = null;
        setStatus("completed");
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, [plan, status]);

  const elapsedSec = Math.min(
    plan?.targetBrewTimeSec ?? 0,
    Math.floor(elapsedMs / 1000),
  );

  const currentStageIndex = useMemo(() => {
    if (!plan) {
      return -1;
    }

    if (status === "completed") {
      return plan.stages.length - 1;
    }

    return getStageIndex(plan, elapsedSec);
  }, [elapsedSec, plan, status]);

  const currentStageAction =
    currentStageIndex >= 0 && plan ? plan.stages[currentStageIndex].action : null;

  const currentStageProgress =
    plan && status !== "idle"
      ? getStageProgress(
          plan,
          currentStageIndex,
          status === "completed" ? plan.targetBrewTimeSec * 1000 : elapsedMs,
        )
      : 0;

  const cumulativeWaterG =
    plan && status !== "idle"
      ? getCumulativeWater(plan, currentStageIndex, elapsedSec)
      : 0;

  return {
    status,
    elapsedSec,
    elapsedMs,
    currentStageIndex,
    currentStageAction,
    currentStageProgress,
    cumulativeWaterG,
    isCompleted: status === "completed",
    start,
    pause,
    resume,
    reset,
  };
}
