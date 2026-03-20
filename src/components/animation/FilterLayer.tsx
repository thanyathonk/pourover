import { cn } from "@/lib/utils/cn";
import type { DripperId, FilterVisual } from "@/types/domain";
import { WavePaperFilterSvg } from "./WavePaperFilterSvg";

type FilterLayerProps = {
  dripper: DripperId;
  filterVisual: FilterVisual;
};

export function FilterLayer({ dripper, filterVisual }: FilterLayerProps) {
  const isOrigamiWave = dripper === "origami" && filterVisual === "wave-paper";

  if (isOrigamiWave) {
    return (
      <div className="absolute left-1/2 top-16 h-36 w-24 -translate-x-1/2 text-sky-200/90">
        <WavePaperFilterSvg className="h-full w-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute left-1/2 top-16 h-36 -translate-x-1/2 rounded-b-[40%] border border-white/18 bg-white/6",
        filterVisual === "cone-paper" && "w-24 [clip-path:polygon(12%_0%,88%_0%,68%_100%,32%_100%)]",
        filterVisual === "wave-paper" && "w-28 rounded-b-[28%]",
      )}
    />
  );
}
