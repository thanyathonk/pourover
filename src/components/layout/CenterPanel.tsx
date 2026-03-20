import { DripperScene } from "@/components/animation/DripperScene";
import { BrewPlaybackControls } from "@/components/brew/BrewPlaybackControls";
import { BrewStageTable } from "@/components/brew/BrewStageTable";
import type { BrewPlan, PlaybackController, PlaybackState } from "@/types/brew";

type CenterPanelProps = {
  plan: BrewPlan;
  playback: PlaybackState;
  controls: PlaybackController;
};

export function CenterPanel({ plan, playback, controls }: CenterPanelProps) {
  return (
    <div className="space-y-5">
      <DripperScene plan={plan} playback={playback} />
      <BrewPlaybackControls playback={playback} {...controls} />
      <BrewStageTable plan={plan} currentStageIndex={playback.currentStageIndex} />
    </div>
  );
}
