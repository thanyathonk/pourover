"use client";

import { brewModes } from "@/data/brewModes";
import { drippers } from "@/data/drippers";
import { filters } from "@/data/filters";
import { presets } from "@/data/presets";
import { processAdjustments } from "@/data/processAdjustments";
import { roastAdjustments } from "@/data/roastAdjustments";
import { Card } from "@/components/ui/Card";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { NumberInput } from "@/components/ui/NumberInput";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SelectField } from "@/components/ui/SelectField";
import type { StandardBrewInput } from "@/types/brew";
import type { DripperId, FilterId, RoastLevel, ProcessType } from "@/types/domain";

type StandardRecipesPanelProps = {
  input: StandardBrewInput;
  onChange: (next: StandardBrewInput) => void;
};

function getPresetsFor(dripper: DripperId, filter: FilterId, brewMode: "hot" | "iced") {
  return presets.filter(
    (p) => p.dripperId === dripper && p.filterId === filter && p.brewMode === brewMode,
  );
}

export function StandardRecipesPanel({ input, onChange }: StandardRecipesPanelProps) {
  const locale = useLocale();
  const availableFilters = filters.filter((f) =>
    f.compatibleDrippers.includes(input.dripper),
  );
  const availablePresets = getPresetsFor(input.dripper, input.filter, input.brewMode);
  const currentPreset = availablePresets.find((p) => p.id === input.presetId) ?? availablePresets[0];

  const updateOverrides = (patch: Partial<StandardBrewInput["overrides"]>) => {
    onChange({
      ...input,
      overrides: { ...input.overrides, ...patch },
    });
  };

  const selectPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;
    onChange({
      source: "standard",
      presetId,
      dripper: preset.dripperId,
      filter: preset.filterId,
      brewMode: preset.brewMode,
      overrides: {},
    });
  };

  const doseG = input.overrides.doseG ?? currentPreset?.defaultDoseG ?? 15;
  const ratio = input.overrides.ratio ?? currentPreset?.defaultRatio ?? 15.5;

  const handleDripperChange = (dripper: DripperId) => {
    const f = filters.find((x) => x.compatibleDrippers.includes(dripper));
    const filter = f?.id ?? filters[0].id;
    const presetsFor = getPresetsFor(dripper, filter as FilterId, input.brewMode);
    const first = presetsFor[0];
    onChange({
      ...input,
      dripper,
      filter: filter as FilterId,
      presetId: first?.id ?? input.presetId,
      overrides: {},
    });
  };

  const handleFilterChange = (filter: FilterId) => {
    const presetsFor = getPresetsFor(input.dripper, filter, input.brewMode);
    const first = presetsFor[0];
    onChange({
      ...input,
      filter,
      presetId: first?.id ?? input.presetId,
      overrides: {},
    });
  };

  const handleBrewModeChange = (brewMode: "hot" | "iced") => {
    const presetsFor = getPresetsFor(input.dripper, input.filter, brewMode);
    const first = presetsFor[0];
    onChange({
      ...input,
      brewMode,
      presetId: first?.id ?? input.presetId,
      overrides: {},
    });
  };

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <SectionTitle eyebrow={pickLocale(locale, "Setup", "ตั้งค่า")}>
          {pickLocale(locale, "Standard Recipes", "สูตรมาตรฐาน")}
        </SectionTitle>
        <p className="mt-2 text-sm text-white/55">
          {pickLocale(
            locale,
            "Select dripper, filter, and preset. Edit values to recalculate.",
            "เลือก dripper, filter และ preset จากนั้นปรับค่าเพื่อคำนวณสูตรใหม่",
          )}
        </p>
        <div className="mt-5 space-y-4 md:space-y-5">
          <SelectField
            label={pickLocale(locale, "Dripper", "ดริปเปอร์")}
            value={input.dripper}
            options={drippers.map((d) => ({ value: d.id, label: d.label }))}
            columns={2}
            onChange={(v) => handleDripperChange(v as DripperId)}
          />
          <SelectField
            label={pickLocale(locale, "Filter", "กระดาษกรอง")}
            value={input.filter}
            options={availableFilters.map((f) => ({ value: f.id, label: f.label }))}
            columns={2}
            onChange={(v) => handleFilterChange(v as FilterId)}
          />
          <SegmentedControl
            label={pickLocale(locale, "Brew Mode", "โหมดการชง")}
            value={input.brewMode}
            options={brewModes.map((m) => ({ value: m.id, label: m.label }))}
            onChange={(v) => handleBrewModeChange(v)}
          />
          <SelectField
            label={pickLocale(locale, "Preset", "สูตรสำเร็จ")}
            value={input.presetId}
            options={availablePresets.map((p) => ({ value: p.id, label: p.label }))}
            variant="dropdown"
            onChange={selectPreset}
          />
          <NumberInput
            label={pickLocale(locale, "Dose", "ปริมาณกาแฟ")}
            value={doseG}
            min={10}
            max={40}
            suffix="g"
            onChange={(v) => updateOverrides({ doseG: v })}
          />
          <NumberInput
            label={pickLocale(locale, "Ratio", "อัตราส่วน")}
            value={ratio}
            min={14}
            max={18.5}
            step={0.1}
            suffix="1:x"
            onChange={(v) => updateOverrides({ ratio: v })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label={pickLocale(locale, "Roast", "ระดับการคั่ว")}
              value={input.overrides.roastLevel ?? currentPreset?.defaultRoast ?? "medium"}
              options={roastAdjustments.map((r) => ({ value: r.id, label: r.label }))}
              variant="dropdown"
              onChange={(v) => updateOverrides({ roastLevel: v as RoastLevel })}
            />
            <SelectField
              label={pickLocale(locale, "Process", "โปรเซส")}
              value={input.overrides.process ?? currentPreset?.defaultProcess ?? "washed"}
              options={processAdjustments.map((p) => ({ value: p.id, label: p.label }))}
              variant="dropdown"
              onChange={(v) => updateOverrides({ process: v as ProcessType })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
