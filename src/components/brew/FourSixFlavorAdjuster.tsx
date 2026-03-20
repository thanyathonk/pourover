"use client";

import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { FourSixBodyMode, FourSixTasteMode } from "@/types/brew";

const TASTE_OPTIONS: { value: FourSixTasteMode; label: string; dist: string }[] = [
  { value: "basic", label: "Basic", dist: "[20, 20]" },
  { value: "sweetness", label: "Increase sweetness", dist: "[15, 25]" },
  { value: "acidity", label: "Increase acidity", dist: "[25, 15]" },
];

const BODY_OPTIONS: { value: FourSixBodyMode; label: string; dist: string }[] = [
  { value: "basic", label: "Basic", dist: "[20, 20, 20]" },
  { value: "stronger", label: "Stronger", dist: "[15, 22.5, 22.5]" },
  { value: "lighter", label: "Lighter", dist: "[60]" },
];

type FourSixFlavorAdjusterProps = {
  tasteMode: FourSixTasteMode;
  bodyMode: FourSixBodyMode;
  onTasteChange: (v: FourSixTasteMode) => void;
  onBodyChange: (v: FourSixBodyMode) => void;
};

export function FourSixFlavorAdjuster({
  tasteMode,
  bodyMode,
  onTasteChange,
  onBodyChange,
}: FourSixFlavorAdjusterProps) {
  const locale = useLocale();
  return (
    <Card className="p-5">
      <SectionTitle eyebrow={pickLocale(locale, "How to adjust flavor", "วิธีปรับรสชาติ")}>
        {pickLocale(locale, "Taste & Body", "รสชาติและบอดี้")}
      </SectionTitle>
      <p className="mt-2 text-xs text-white/55">
        {pickLocale(
          locale,
          "First 40% influences taste. Last 60% influences body.",
          "40% แรกมีผลต่อรสชาติ ส่วน 60% หลังมีผลต่อบอดี้",
        )}
      </p>

      <div className="mt-5 space-y-5">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/55">
            {pickLocale(locale, "Taste (first 40%)", "รสชาติ (40% แรก)")}
          </p>
          <div className="flex flex-wrap gap-2">
            {TASTE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onTasteChange(opt.value)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-sm transition",
                  tasteMode === opt.value
                    ? "border-amber-400/50 bg-amber-500/20 text-white shadow-[0_4px_16px_rgba(251,191,36,0.15)]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/8",
                )}
              >
                <span className="block font-medium">{opt.label}</span>
                <span className="mt-0.5 block text-xs text-white/55">{opt.dist}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/55">
            {pickLocale(locale, "Body (last 60%)", "บอดี้ (60% หลัง)")}
          </p>
          <div className="flex flex-wrap gap-2">
            {BODY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onBodyChange(opt.value)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-sm transition",
                  bodyMode === opt.value
                    ? "border-amber-400/50 bg-amber-500/20 text-white shadow-[0_4px_16px_rgba(251,191,36,0.15)]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/8",
                )}
              >
                <span className="block font-medium">{opt.label}</span>
                <span className="mt-0.5 block text-xs text-white/55">{opt.dist}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
