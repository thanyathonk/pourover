"use client";

import dynamic from "next/dynamic";
import type { FourSixBrewInput, StandardBrewInput } from "@/types/brew";

const panelLoading = () => (
  <div className="flex min-h-[320px] animate-pulse items-center justify-center rounded-2xl border border-white/10 bg-white/3">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-sky-400/30 border-t-sky-300/60" />
  </div>
);

/** Split chunks: only the active tab’s panel is compiled/loaded in dev. */
const StandardRecipesPanel = dynamic(
  () =>
    import("@/components/brew/StandardRecipesPanel").then((m) => ({
      default: m.StandardRecipesPanel,
    })),
  { loading: panelLoading },
);

const FourSixPanel = dynamic(
  () =>
    import("@/components/brew/FourSixPanel").then((m) => ({
      default: m.FourSixPanel,
    })),
  { loading: panelLoading },
);

type TabId = "standard" | "four-six";

type LeftPanelProps = {
  tab: TabId;
  standardInput: StandardBrewInput;
  fourSixInput: FourSixBrewInput;
  onStandardChange: (next: StandardBrewInput) => void;
  onFourSixChange: (next: FourSixBrewInput) => void;
};

export function LeftPanel({
  tab,
  standardInput,
  fourSixInput,
  onStandardChange,
  onFourSixChange,
}: LeftPanelProps) {
  if (tab === "four-six") {
    return <FourSixPanel input={fourSixInput} onChange={onFourSixChange} />;
  }
  return <StandardRecipesPanel input={standardInput} onChange={onStandardChange} />;
}
