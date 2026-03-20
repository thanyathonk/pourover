import type {
  AnimationProfileKey,
  BrewMode,
  BrewStageAction,
  DripperId,
  FilterId,
  FilterVisual,
  FlavorTarget,
  GrindLevelLabel,
  AgitationLevel,
  RoastLevel,
  ProcessType,
  SilhouetteKey,
} from "@/types/domain";
import type { ManualRecipeOverrides } from "@/types/domain";

/** Source of the brew plan — used internally, not a user-facing mode */
export type BrewPlanSource = "standard" | "four-six";

/** Standard Recipes: preset + overrides. Overrides cleared when preset changes. */
export type StandardBrewInput = {
  source: "standard";
  presetId: string;
  dripper: DripperId;
  filter: FilterId;
  brewMode: BrewMode;
  overrides: RecipeOverrides;
};

export type RecipeOverrides = {
  doseG?: number;
  ratio?: number;
  roastLevel?: RoastLevel;
  process?: ProcessType;
  pourCount?: number;
  bloomMultiplier?: number;
  bloomDurationSec?: number;
  bloomWaitSec?: number;
  targetBrewTimeSec?: number;
};

/** 4:6 Taste (first 40%): Basic [20,20], Increase sweetness [15,25], Increase acidity [25,15] */
export type FourSixTasteMode = "basic" | "sweetness" | "acidity";

/** 4:6 Body (last 60%): Basic [20,20,20], Stronger [20,30,30]→normalized, Lighter [60] */
export type FourSixBodyMode = "basic" | "stronger" | "lighter";

export type FourSixBrewInput = {
  source: "four-six";
  doseG: number;
  roastLevel: RoastLevel;
  tasteMode: FourSixTasteMode;
  bodyMode: FourSixBodyMode;
  ratio?: number;
  dripper?: DripperId;
  filter?: FilterId;
};

/** Union for engine input */
export type BrewInput = StandardBrewInput | FourSixBrewInput;

/** Legacy — for backward compatibility during migration */
export type LegacyBrewInput = {
  mode: "preset" | "adaptive" | "manual";
  dripper: DripperId;
  filter: FilterId;
  brewMode: BrewMode;
  doseG: number;
  ratio?: number;
  roastLevel: RoastLevel;
  process: ProcessType;
  flavorTarget?: FlavorTarget;
  recipeId?: string;
  manual?: ManualRecipeOverrides;
};

export type SanitizedStandardInput = StandardBrewInput & {
  overrides: RecipeOverrides & { doseG: number; ratio: number };
};

export type ResolvedBrewProfile = {
  dripperId: DripperId;
  filterId: FilterId;
  brewMode: BrewMode;
  coffeeG: number;
  ratio: number;
  totalWaterG: number;
  hotWaterG: number;
  iceG: number;
  brewWaterG: number;
  recommendedTempC: number;
  bloomMultiplier: number;
  bloomWaterG: number;
  mainPours: number;
  targetBrewTimeSec: number;
  agitationLevel: AgitationLevel;
  grindLabel: GrindLevelLabel;
  distributionPattern: number[];
  flavorTarget?: FlavorTarget;
  recipeId?: string;
  notes: string[];
  metrics: {
    clarityScore: number;
    bodyScore: number;
    sweetnessScore: number;
  };
  pourStructure: {
    bloomDurationSec: number;
    bloomWaitSec: number;
    pourDurationSec: number;
    waitBetweenPoursSec: number;
    finalDrawdownMinSec: number;
  };
};

export type BrewStage = {
  index: number;
  label: string;
  action: BrewStageAction;
  startSec: number;
  endSec: number;
  durationSec: number;
  targetWaterG: number;
  note?: string;
  /** 4:6: grams for this pour (pour stages only) */
  pourGrams?: number;
  /** 4:6: percentage of total water for this pour (pour stages only) */
  pourPercent?: number;
};

export type BrewPlan = {
  sourceType: BrewPlanSource;
  dripper: DripperId;
  filter: FilterId;
  brewMode: BrewMode;
  presetId?: string;
  coffeeG: number;
  ratio?: number;
  totalWaterG: number;
  brewWaterG: number;
  hotWaterG: number;
  iceG: number;
  recommendedTempC?: number;
  grindNote: string;
  bloomWaterG: number;
  targetBrewTimeSec: number;
  notes: string[];
  stages: BrewStage[];
};

export type DripperVisualConfig = {
  silhouetteKey: SilhouetteKey;
  filterVisual: FilterVisual;
  animationProfile: AnimationProfileKey;
};

export type DripperSceneState =
  | "idle"
  | "configured"
  | "ready"
  | "playing"
  | "paused"
  | "completed";

export type PlaybackStatus = "idle" | "running" | "paused" | "completed";

export type PlaybackState = {
  status: PlaybackStatus;
  elapsedSec: number;
  elapsedMs: number;
  currentStageIndex: number;
  currentStageAction: BrewStageAction | null;
  currentStageProgress: number;
  cumulativeWaterG: number;
  isCompleted: boolean;
};

export type PlaybackController = {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};
