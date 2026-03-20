"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { GlowButton } from "@/components/animation/GlowButton";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import type { PlaybackState } from "@/types/brew";

type BrewPlaybackControlsProps = {
  playback: PlaybackState;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

export function BrewPlaybackControls({
  playback,
  start,
  pause,
  resume,
  reset,
}: BrewPlaybackControlsProps) {
  const locale = useLocale();
  const mainAction =
    playback.status === "idle" || playback.status === "completed"
      ? {
          label: pickLocale(locale, "Start Brew", "เริ่มชง"),
          onClick: start,
          icon: <Play className="h-5 w-5" />,
        }
      : playback.status === "paused"
        ? {
            label: pickLocale(locale, "Resume", "เล่นต่อ"),
            onClick: resume,
            icon: <Play className="h-5 w-5" />,
          }
        : {
            label: pickLocale(locale, "Pause", "หยุดชั่วคราว"),
            onClick: pause,
            icon: <Pause className="h-5 w-5" />,
          };

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <GlowButton onClick={mainAction.onClick}>
        {mainAction.icon}
        <span>{mainAction.label}</span>
      </GlowButton>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/75 transition hover:text-white"
      >
        <RotateCcw className="h-4 w-4" />
        {pickLocale(locale, "Reset", "รีเซ็ต")}
      </button>
    </div>
  );
}
