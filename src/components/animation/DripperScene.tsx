"use client";

import { CheckCircle2, Clock3, Waves } from "lucide-react";
import { BrewStatusStrip } from "@/components/brew/BrewStatusStrip";
import { MetricPanel } from "@/components/brew/MetricPanel";
import { CoffeeGlass } from "@/components/animation/CoffeeGlass";
import { DripStream } from "@/components/animation/DripStream";
import { DripperCard } from "@/components/animation/DripperCard";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { formatGrams } from "@/lib/utils/number";
import { formatSeconds } from "@/lib/utils/time";
import type { BrewPlan, PlaybackState } from "@/types/brew";

type DripperSceneProps = {
  plan: BrewPlan;
  playback: PlaybackState;
};

export function DripperScene({ plan, playback }: DripperSceneProps) {
  const locale = useLocale();
  const elapsedSecPrecise = Math.min(plan.targetBrewTimeSec, playback.elapsedMs / 1000);
  const currentStage =
    playback.currentStageIndex >= 0 ? plan.stages[playback.currentStageIndex] : null;
  const actionStages = plan.stages.filter((stage) => stage.action !== "wait");
  const actionRanges = actionStages.map((stage, index) => ({
    stage,
    startSec: stage.startSec,
    endSec: actionStages[index + 1]?.startSec ?? stage.endSec,
  }));
  const activeAction =
    playback.isCompleted
      ? actionRanges.at(-1) ?? null
      : actionRanges.find(
          (range) => elapsedSecPrecise >= range.startSec && elapsedSecPrecise < range.endSec,
        ) ?? null;

  let animatedWaterG = 0;
  if (playback.isCompleted) {
    animatedWaterG = plan.hotWaterG;
  } else if (currentStage) {
    const previousTarget =
      currentStage.index > 0 ? plan.stages[currentStage.index - 1]?.targetWaterG ?? 0 : 0;

    if (currentStage.action === "pour") {
      const stageProgress =
        currentStage.durationSec <= 0
          ? 1
          : Math.min(
              1,
              Math.max(
                0,
                (elapsedSecPrecise - currentStage.startSec) / currentStage.durationSec,
              ),
            );
      animatedWaterG =
        previousTarget + (currentStage.targetWaterG - previousTarget) * stageProgress;
    } else {
      animatedWaterG = previousTarget;
    }
  }

  const waterRatio = plan.hotWaterG === 0 ? 0 : animatedWaterG / plan.hotWaterG;
  const displayedWaterG =
    playback.status === "idle"
      ? 0
      : playback.isCompleted
        ? plan.hotWaterG
        : activeAction?.stage.targetWaterG ?? 0;
  const activeStageLabel = playback.isCompleted
    ? pickLocale(locale, "Done", "เสร็จแล้ว")
    : activeAction?.stage.label ?? pickLocale(locale, "Ready", "พร้อม");
  const activeStageNote = playback.isCompleted
    ? pickLocale(
        locale,
        "Brew complete. All planned pours and final drawdown are finished.",
        "ชงเสร็จแล้ว ทุกการเทและช่วง drawdown สิ้นสุดครบตามแผน",
      )
    : activeAction?.stage.note ??
      pickLocale(
        locale,
        "Press start to begin the guided brew playback.",
        "กดเริ่มเพื่อเริ่มการชงแบบมีไกด์",
      );

  return (
    <DripperCard className="p-6">
      <BrewStatusStrip
        plan={plan}
        elapsedMs={playback.elapsedMs}
        isCompleted={playback.isCompleted}
      />
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="relative flex min-h-[380px] items-center justify-center rounded-[32px] border border-white/10 bg-black/18">
          <DripStream active={playback.currentStageAction === "drawdown"} />
          <div className="relative z-10 flex items-end justify-center">
            <CoffeeGlass
              fillRatio={waterRatio}
              currentWaterG={Math.round(animatedWaterG)}
              isAnimating={playback.status === "running"}
            />
          </div>
          <div className="pointer-events-none absolute bottom-8 h-6 w-40 rounded-full bg-sky-400/10 blur-xl" />
        </div>
        <div className="flex flex-col gap-3">
          <MetricPanel
            label={pickLocale(locale, "Timer", "ตัวจับเวลา")}
            value={formatSeconds(playback.elapsedSec)}
            icon={<Clock3 className="h-4 w-4" />}
          />
          <MetricPanel
            label={pickLocale(locale, "Cumulative Target", "เป้าหมายสะสม")}
            value={formatGrams(displayedWaterG)}
            icon={<Waves className="h-4 w-4" />}
            accent="amber"
          />
          <div
            className={
              playback.isCompleted
                ? "rounded-3xl border border-emerald-300/25 bg-emerald-400/12 p-4"
                : "rounded-3xl border border-white/10 bg-white/5 p-4"
            }
          >
            <div className="flex items-center justify-between">
              <p
                className={
                  playback.isCompleted
                    ? "text-xs uppercase tracking-[0.18em] text-emerald-100/75"
                    : "text-xs uppercase tracking-[0.18em] text-white/42"
                }
              >
                {pickLocale(locale, "Active Stage", "ช่วงปัจจุบัน")}
              </p>
              {playback.isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              ) : null}
            </div>
            <p
              className={
                playback.isCompleted
                  ? "mt-3 text-2xl font-semibold text-emerald-50"
                  : "mt-3 text-2xl font-semibold text-white"
              }
            >
              {activeStageLabel}
            </p>
            <p
              className={
                playback.isCompleted
                  ? "mt-2 text-sm text-emerald-100/72"
                  : "mt-2 text-sm text-white/58"
              }
            >
              {activeStageNote}
            </p>
          </div>
        </div>
      </div>
    </DripperCard>
  );
}
