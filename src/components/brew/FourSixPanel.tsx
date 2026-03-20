"use client";

import { roastAdjustments } from "@/data/roastAdjustments";
import { Card } from "@/components/ui/Card";
import { FourSixFlavorAdjuster } from "@/components/brew/FourSixFlavorAdjuster";
import { FourSixReferencePanel } from "@/components/brew/FourSixReferencePanel";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { NumberInput } from "@/components/ui/NumberInput";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SelectField } from "@/components/ui/SelectField";
import type { FourSixBrewInput, FourSixBodyMode, FourSixTasteMode } from "@/types/brew";
import type { RoastLevel } from "@/types/domain";

type FourSixPanelProps = {
  input: FourSixBrewInput;
  onChange: (next: FourSixBrewInput) => void;
};

export function FourSixPanel({ input, onChange }: FourSixPanelProps) {
  const locale = useLocale();
  return (
    <div className="space-y-5">
      <FourSixReferencePanel
        roastLevel={input.roastLevel}
        tasteMode={input.tasteMode}
        bodyMode={input.bodyMode}
      />
      <Card className="p-5">
        <SectionTitle eyebrow={pickLocale(locale, "Inputs", "อินพุต")}>
          {pickLocale(locale, "Settings", "การตั้งค่า")}
        </SectionTitle>
        <div className="mt-5 space-y-4">
          <NumberInput
            label={pickLocale(locale, "Dose", "ปริมาณกาแฟ")}
            value={input.doseG}
            min={10}
            max={40}
            suffix="g"
            onChange={(v) => onChange({ ...input, doseG: v })}
          />
          <SelectField
            label={pickLocale(locale, "Roast", "ระดับการคั่ว")}
            value={input.roastLevel}
            options={roastAdjustments.map((r) => ({ value: r.id, label: r.label }))}
            variant="dropdown"
            onChange={(v) => onChange({ ...input, roastLevel: v as RoastLevel })}
          />
          <NumberInput
            label={pickLocale(locale, "Ratio", "อัตราส่วน")}
            value={input.ratio ?? 15}
            min={14}
            max={18}
            step={0.5}
            suffix="1:x"
            onChange={(v) => onChange({ ...input, ratio: v })}
          />
        </div>
      </Card>
      <FourSixFlavorAdjuster
        tasteMode={input.tasteMode}
        bodyMode={input.bodyMode}
        onTasteChange={(v) => onChange({ ...input, tasteMode: v })}
        onBodyChange={(v) => onChange({ ...input, bodyMode: v })}
      />
    </div>
  );
}
