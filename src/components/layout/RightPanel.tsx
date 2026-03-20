import { BrewSummary } from "@/components/brew/BrewSummary";
import type { BrewPlan } from "@/types/brew";

type RightPanelProps = {
  plan: BrewPlan;
};

export function RightPanel({ plan }: RightPanelProps) {
  return (
    <div className="space-y-5">
      <BrewSummary plan={plan} />
    </div>
  );
}
