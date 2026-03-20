import { dripperMap } from "@/data/drippers";
import { filterMap } from "@/data/filters";
import { presetMap } from "@/data/presets";
import type { BrewInput, FourSixBrewInput, StandardBrewInput, ValidationResult } from "@/types/brew";

const GLOBAL_DOSE_MIN = 10;
const GLOBAL_DOSE_MAX = 40;
const GLOBAL_RATIO_MIN = 14;
const GLOBAL_RATIO_MAX = 18.5;

function validateStandardInput(input: StandardBrewInput): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const preset = presetMap[input.presetId];
  if (!preset) {
    errors.push(`Preset not found: ${input.presetId}`);
    return { valid: false, errors, warnings };
  }

  const dripper = dripperMap[input.dripper];
  const filter = filterMap[input.filter];

  if (!dripper) errors.push(`Unsupported dripper: ${input.dripper}`);
  if (!filter) errors.push(`Unsupported filter: ${input.filter}`);

  if (dripper && filter) {
    if (!dripper.supportedFilters.includes(filter.id)) {
      errors.push(`${filter.label} is not compatible with ${dripper.label}.`);
    }
  }

  const doseG = input.overrides.doseG ?? preset.defaultDoseG;
  const ratio = input.overrides.ratio ?? preset.defaultRatio;

  if (doseG < GLOBAL_DOSE_MIN || doseG > GLOBAL_DOSE_MAX) {
    warnings.push(`Dose clamped to ${GLOBAL_DOSE_MIN}-${GLOBAL_DOSE_MAX}g.`);
  }
  if (ratio < GLOBAL_RATIO_MIN || ratio > GLOBAL_RATIO_MAX) {
    warnings.push(`Ratio clamped to ${GLOBAL_RATIO_MIN}-${GLOBAL_RATIO_MAX}.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function validateFourSixInput(_input: FourSixBrewInput): ValidationResult {
  return { valid: true, errors: [], warnings: [] };
}

export function validateBrewInput(input: BrewInput): ValidationResult {
  if (input.source === "standard") return validateStandardInput(input);
  return validateFourSixInput(input);
}

export function assertValidInput(input: BrewInput) {
  const validation = validateBrewInput(input);
  if (!validation.valid) {
    throw new Error(validation.errors.join(" "));
  }
  return validation;
}
