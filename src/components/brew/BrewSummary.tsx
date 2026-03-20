import { Droplets, Thermometer, TimerReset } from "lucide-react";
import { dripperMap } from "@/data/drippers";
import { filterMap } from "@/data/filters";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MetricPanel } from "@/components/brew/MetricPanel";
import { formatGrams, formatRatio } from "@/lib/utils/number";
import type { BrewPlan } from "@/types/brew";

type BrewSummaryProps = {
  plan: BrewPlan;
};

export function BrewSummary({ plan }: BrewSummaryProps) {
  const locale = useLocale();
  const dripper = dripperMap[plan.dripper];
  const filter = filterMap[plan.filter];

  return (
    <Card className="p-5">
      <SectionTitle eyebrow={pickLocale(locale, "Recipe", "สูตรชง")}>
        {pickLocale(locale, "Brew Summary", "สรุปการชง")}
      </SectionTitle>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="accent">{plan.sourceType === "four-six" ? "4:6 Method" : dripper.label}</Badge>
        {plan.sourceType === "standard" && <Badge>{filter.label}</Badge>}
        <Badge tone="amber">{pickLocale(locale, plan.brewMode, plan.brewMode === "hot" ? "ร้อน" : "เย็น")}</Badge>
      </div>
      <div className="mt-5 grid gap-3 xl:grid-cols-2">
        <MetricPanel
          label={pickLocale(locale, "Dose", "ปริมาณกาแฟ")}
          value={formatGrams(plan.coffeeG)}
          icon={<Droplets className="h-4 w-4" />}
        />
        <MetricPanel
          label={pickLocale(locale, "Ratio", "อัตราส่วน")}
          value={formatRatio(plan.ratio ?? (plan.coffeeG > 0 ? plan.totalWaterG / plan.coffeeG : 0))}
          icon={<Droplets className="h-4 w-4" />}
        />
        {plan.brewMode === "hot" ? (
          <MetricPanel
            label={pickLocale(locale, "Total Water", "ปริมาณน้ำรวม")}
            value={formatGrams(plan.totalWaterG)}
            icon={<Droplets className="h-4 w-4" />}
            accent="amber"
          />
        ) : (
          <>
            <MetricPanel
              label={pickLocale(locale, "Brew Water", "น้ำชง")}
              value={formatGrams(plan.hotWaterG)}
              icon={<Droplets className="h-4 w-4" />}
            />
            <MetricPanel
              label={pickLocale(locale, "Ice", "น้ำแข็ง")}
              value={formatGrams(plan.iceG)}
              icon={<Droplets className="h-4 w-4" />}
            />
            <MetricPanel
              label={pickLocale(locale, "Final Target", "เป้าหมายสุดท้าย")}
              value={formatGrams(plan.totalWaterG)}
              icon={<Droplets className="h-4 w-4" />}
              accent="amber"
            />
          </>
        )}
        <MetricPanel
          label={pickLocale(locale, "Temperature", "อุณหภูมิ")}
          value={plan.recommendedTempC != null ? `${plan.recommendedTempC}°C` : "—"}
          icon={<Thermometer className="h-4 w-4" />}
        />
        <MetricPanel
          label={pickLocale(locale, "Target Time", "เวลาเป้าหมาย")}
          value={`${Math.floor(plan.targetBrewTimeSec / 60)}m ${plan.targetBrewTimeSec % 60}s`}
          icon={<TimerReset className="h-4 w-4" />}
        />
      </div>
      <div className="mt-5 space-y-3 text-sm text-white/65">
        <p>
          <span className="text-white">{pickLocale(locale, "Grind:", "การบด:")}</span> {plan.grindNote}
        </p>
        <p>
          <span className="text-white">
            {pickLocale(
              locale,
              plan.brewMode === "iced" ? "Pour 1" : "Bloom",
              plan.brewMode === "iced" ? "Pour 1" : "Bloom",
            )}
            :
          </span>{" "}
          {formatGrams(plan.bloomWaterG)}
        </p>
        {/* <ul className="space-y-2">
          {plan.notes.slice(0, 4).map((note) => (
            <li key={note} className="rounded-2xl bg-white/5 px-3 py-2">
              {note}
            </li>
          ))}
        </ul> */}
      </div>
    </Card>
  );
}
