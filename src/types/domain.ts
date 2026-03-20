export type DripperId = "v60" | "origami" | "ct62";

export type FilterId = "hario-paper" | "kalita-wave" | "origami-paper";

export type BrewMode = "hot" | "iced";
export type RecipeMode = "preset" | "adaptive" | "manual";

export type RoastLevel = "light" | "medium" | "dark";

export type ProcessType = "washed" | "natural" | "honey" | "anaerobic";

export type FlavorTarget =
  | "bright"
  | "balanced"
  | "sweet"
  | "clean"
  | "strong";

export type BrewStageAction = "pour" | "wait" | "drawdown";

export type FilterShape = "cone" | "wave";

export type FlowSpeedCategory = "slow" | "medium" | "fast";

export type AgitationLevel = "very-low" | "low" | "medium" | "medium-high";

export type GrindLevelLabel =
  | "medium-fine"
  | "medium"
  | "medium-coarse"
  | "coarse"
  | "slightly-finer"
  | "slightly-coarser";

export type GeometryShape = "cone" | "flat-bottom";

export type SilhouetteKey = "v60" | "origami" | "kalita-wave";

export type AnimationProfileKey = "agile" | "refined" | "stable";

export type AccentKey = "glass" | "paper" | "ceramic";

export type FilterVisual = "cone-paper" | "wave-paper";

export type ThicknessVisual = "thin" | "medium" | "thick";

export type PresetTone = "bright" | "balanced" | "sweet" | "clean";

/** Dripper profile per DATA_MODEL */
export type DripperProfile = {
  id: DripperId;
  label: string;
  geometry: "cone" | "wave-sensitive-cone";
  supportedFilters: FilterId[];
  defaultHotRecipeId: string;
  defaultIcedRecipeId: string;
  notes: string[];
  /** Legacy UI fields */
  shortLabel?: string;
  description?: string;
  ui?: {
    accentKey: AccentKey;
    animationProfile: AnimationProfileKey;
  };
};

/** Filter profile per DATA_MODEL */
export type FilterProfile = {
  id: FilterId;
  label: string;
  geometry: "cone" | "wave";
  compatibleDrippers: DripperId[];
  flowTendency: "faster" | "neutral" | "steadier";
  flavorBias: "clarity" | "balanced" | "sweetness";
  notes: string[];
  /** Legacy UI fields */
  shortLabel?: string;
  description?: string;
  ui?: {
    filterVisual: FilterVisual;
    thicknessVisual: ThicknessVisual;
  };
};

/** Recipe library entry per DATA_MODEL */
export type RecipeLibraryEntry = {
  id: string;
  label: string;
  sourceType: "official" | "brand-backed" | "app-baseline";
  dripper: DripperId;
  filter: FilterId;
  brewMode: BrewMode;
  flavorBias?: FlavorTarget;
  roastBias?: RoastLevel;
  processBias?: ProcessType;
  defaultDoseG: number;
  defaultRatio?: number;
  brewWaterG?: number;
  iceG?: number;
  ratioMeaning: "total-water" | "beverage-target" | "brew-water-only";
  recommendedTempC?: number;
  recommendedTempCByRoast?: Partial<Record<RoastLevel, number>>;
  grindNote: string;
  stageBuilderType: string;
  pourCount: number;
  bloomMultiplier?: number;
  bloomDurationSec?: number;
  bloomWaitSec?: number;
  pourPatternG?: number[];
  pourPatternPercent?: number[];
  waitPatternSec?: number[];
  targetBrewTimeSec: number;
  notes: string[];
};

/** Recipe preset per DATA_MODEL / RECIPE_LIBRARY */
export type RecipePreset = {
  id: string;
  dripperId: DripperId;
  filterId: FilterId;
  brewMode: BrewMode;
  label: string;
  defaultDoseG: number;
  defaultRatio: number;
  defaultRoast: RoastLevel;
  defaultProcess: ProcessType;
  defaultPourCount: number;
  defaultBloomMultiplier: number;
  defaultBloomDurationSec: number;
  defaultBloomWaitSec: number;
  defaultTargetBrewTimeSec: number;
  defaultDistribution: number[];
  grindNote: string;
  recipeId: string;
  notes: string[];
  brewWaterG?: number;
  iceG?: number;
};

/** Manual overrides per DATA_MODEL */
export type ManualRecipeOverrides = {
  waterTempC?: number;
  grindNote?: string;
  bloomMultiplier?: number;
  bloomWaterG?: number;
  bloomDurationSec?: number;
  bloomWaitSec?: number;
  pourCount?: number;
  pourPatternG?: number[];
  pourPatternPercent?: number[];
  pourDurationsSec?: number[];
  waitDurationsSec?: number[];
  drawdownSec?: number;
  targetBrewTimeSec?: number;
  iceG?: number;
};

export type FlavorTargetProfile = {
  id: FlavorTarget;
  label: string;
  description: string;
  adjustments: {
    ratioDelta: number;
    tempDeltaC: number;
    brewTimeDeltaSec: number;
    bloomMultiplierDelta: number;
    agitationShift: -1 | 0 | 1;
    grindShift: -1 | 0 | 1;
    clarityShift: -1 | 0 | 1;
    bodyShift: -1 | 0 | 1;
  };
  notes: string[];
};

export type RoastAdjustmentProfile = {
  id: RoastLevel;
  label: string;
  adjustments: {
    tempDeltaC: number;
    brewTimeDeltaSec: number;
    agitationShift: -1 | 0 | 1;
    grindShift: -1 | 0 | 1;
  };
  notes: string[];
};

export type ProcessAdjustmentProfile = {
  id: ProcessType;
  label: string;
  adjustments: {
    brewTimeDeltaSec: number;
    agitationShift: -1 | 0 | 1;
    clarityShift: -1 | 0 | 1;
    sweetnessShift: -1 | 0 | 1;
  };
  notes: string[];
};

export type BrewModeProfile = {
  id: BrewMode;
  label: string;
  description: string;
  calculation: {
    grindShift: -1 | 0 | 1;
    brewTimeDeltaSec: number;
  };
  notes: string[];
};

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type DripperOption = SelectOption<DripperId>;
export type FlavorTargetOption = SelectOption<FlavorTarget>;
export type BrewModeOption = SelectOption<BrewMode>;
export type RoastLevelOption = SelectOption<RoastLevel>;
export type ProcessOption = SelectOption<ProcessType>;
