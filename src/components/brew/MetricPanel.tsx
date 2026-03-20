import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type MetricPanelProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  accent?: "sky" | "amber";
  className?: string;
};

export function MetricPanel({
  label,
  value,
  icon,
  accent = "sky",
  className,
}: MetricPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between text-white/55">
        <span className="text-xs uppercase tracking-[0.18em]">{label}</span>
        {icon}
      </div>
      <p
        className={cn(
          "mt-3 text-3xl font-semibold tracking-tight",
          accent === "sky" ? "text-white" : "text-amber-100",
        )}
      >
        {value}
      </p>
    </div>
  );
}
