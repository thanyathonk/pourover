import { Card } from "@/components/ui/Card";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils/cn";
import { formatSeconds } from "@/lib/utils/time";
import type { BrewPlan } from "@/types/brew";

type BrewStageTableProps = {
  plan: BrewPlan;
  currentStageIndex: number;
};

function formatTimeRange(startSec: number, endSec: number) {
  return `${formatSeconds(startSec)} – ${formatSeconds(endSec)}`;
}

export function BrewStageTable({
  plan,
  currentStageIndex,
}: BrewStageTableProps) {
  const locale = useLocale();
  const isFourSix = plan.sourceType === "four-six";
  const visibleStages = plan.stages.filter((stage) => stage.action !== "wait");

  function getDisplayTimeRange(stage: (typeof visibleStages)[0], index: number) {
    const nextVisible = visibleStages[index + 1];
    const displayEnd = nextVisible ? nextVisible.startSec : stage.endSec;
    return { start: stage.startSec, end: displayEnd };
  }

  const currentStage = currentStageIndex >= 0 ? plan.stages[currentStageIndex] : null;
  const activeVisibleStageIndex = visibleStages.findIndex(
    (s) => s.index === currentStageIndex,
  );
  const fallbackVisibleStageIndex =
    activeVisibleStageIndex >= 0
      ? activeVisibleStageIndex
      : currentStage?.action === "wait"
        ? visibleStages.findIndex((s) => s.endSec === currentStage.startSec)
        : visibleStages.findLastIndex((s) => s.index < currentStageIndex);

  return (
    <Card className="overflow-hidden p-5">
      <SectionTitle eyebrow={pickLocale(locale, "Stages", "ลำดับการชง")}>
        {pickLocale(locale, "Brew Table", "ตารางการชง")}
      </SectionTitle>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-white/68">
          <thead className="text-xs uppercase tracking-[0.18em] text-white/40">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">{pickLocale(locale, "Stage", "ช่วง")}</th>
              <th className="px-3 py-2">{pickLocale(locale, "Action", "การทำงาน")}</th>
              <th className="px-3 py-2">{pickLocale(locale, "Time", "เวลา")}</th>
              {isFourSix && (
                <>
                  <th className="px-3 py-2">{pickLocale(locale, "Pour %", "% การเท")}</th>
                  <th className="px-3 py-2">{pickLocale(locale, "Pour g", "กรัมน้ำ")}</th>
                </>
              )}
              <th className="px-3 py-2">
                {pickLocale(locale, isFourSix ? "Cumulative" : "Water", isFourSix ? "สะสม" : "น้ำ")}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleStages.map((stage, index) => (
              <tr
                key={`${stage.label}-${stage.index}`}
                className={cn(
                  "border-t border-white/8 transition",
                  index === fallbackVisibleStageIndex && "bg-sky-300/10 text-white",
                )}
              >
                <td className="px-3 py-3 text-white/55">{stage.index + 1}</td>
                <td className="px-3 py-3 font-medium text-white">{stage.label}</td>
                <td className="px-3 py-3 capitalize">{stage.action}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  {(() => {
                    const { start, end } = getDisplayTimeRange(stage, index);
                    return formatTimeRange(start, end);
                  })()}
                </td>
                {isFourSix && (
                  <>
                    <td className="px-3 py-3">
                      {stage.pourPercent != null ? `${stage.pourPercent}%` : "—"}
                    </td>
                    <td className="px-3 py-3">
                      {stage.pourGrams != null ? `${stage.pourGrams}g` : "—"}
                    </td>
                  </>
                )}
                <td className="px-3 py-3">
                  {stage.action === "pour" || stage.action === "drawdown"
                    ? `${stage.targetWaterG}g`
                    : stage.targetWaterG > 0
                      ? `${stage.targetWaterG}g`
                      : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
