"use client";

import { memo } from "react";
import { cn } from "@/lib/utils/cn";

type LiquidFillProps = {
  ratio: number;
  dripper: "v60" | "origami" | "ct62";
};

export const LiquidFill = memo(function LiquidFill({ ratio, dripper }: LiquidFillProps) {
  const heightPct = Math.max(ratio * 100, 6);
  return (
    <div
      className={cn(
        "absolute left-1/2 top-[90px] -translate-x-1/2 overflow-hidden bg-gradient-to-t from-sky-500/40 via-sky-300/24 to-sky-200/10",
        dripper === "ct62" && "h-[106px] w-[92px] [clip-path:polygon(14%_0%,86%_0%,68%_100%,32%_100%)]",
        (dripper === "v60" || dripper === "origami") &&
          "h-[106px] w-[92px] [clip-path:polygon(14%_0%,86%_0%,68%_100%,32%_100%)]",
      )}
    >
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-[40%] bg-gradient-to-t from-sky-400/70 to-sky-200/30 transition-[height] duration-300 ease-out"
        style={{ height: `${heightPct}%` }}
      />
    </div>
  );
});
