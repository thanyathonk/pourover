"use client";

import { getFourSixPourPercentages } from "@/lib/brew-engine/buildFourSixStages";
import { Card } from "@/components/ui/Card";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { FourSixBodyMode, FourSixTasteMode } from "@/types/brew";
import type { RoastLevel } from "@/types/domain";

const TEMP_BY_ROAST: Record<RoastLevel, string> = {
  light: "93°C for light roast",
  medium: "88°C for medium roast",
  dark: "About 83°C for dark roast",
};


type FourSixReferencePanelProps = {
  roastLevel: RoastLevel;
  tasteMode: FourSixTasteMode;
  bodyMode: FourSixBodyMode;
};

export function FourSixReferencePanel({
  roastLevel,
  tasteMode,
  bodyMode,
}: FourSixReferencePanelProps) {
  const locale = useLocale();
  const percentages = getFourSixPourPercentages(tasteMode, bodyMode);
  const isThreePour = percentages.length === 3;
  const pourTimes = isThreePour ? ["0:00", "0:45", "1:30"] : ["0:00", "0:45", "1:30", "2:15", "2:45"];
  const endTime = isThreePour ? "2:15" : "3:30";

  return (
    <Card className="p-5">
      <SectionTitle eyebrow={pickLocale(locale, "Reference", "อ้างอิง")}>
        4:6 Method
      </SectionTitle>
      <div className="mt-4 space-y-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/45">
            {pickLocale(locale, "Grind size", "ระดับการบด")}
          </p>
          <p className="mt-1 font-medium text-white">
            {pickLocale(locale, "Medium coarse to coarse", "กลางค่อนหยาบถึงหยาบ")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-white/45">Ratio</p>
          <p className="mt-1 font-medium text-white">1:15</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-white/45">
            {pickLocale(locale, "Water temperature", "อุณหภูมิน้ำ")}
          </p>
          <p className="mt-1 font-medium text-white">{TEMP_BY_ROAST[roastLevel]}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-white/45">
            {pickLocale(locale, "Extraction model", "โครงสร้างการเท")}
          </p>
          <ul className="mt-2 space-y-1">
            {percentages.map((pct, i) => (
              <li key={i} className="flex justify-between text-white/85">
                <span>{pourTimes[i]}</span>
                <span>{pickLocale(locale, `${pct}% pour`, `เท ${pct}%`)}</span>
              </li>
            ))}
            <li className="flex justify-between text-white/70">
              <span>{endTime}</span>
              <span>{pickLocale(locale, "Remove dripper", "ยกดริปเปอร์ออก")}</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
