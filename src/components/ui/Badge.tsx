import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeProps = PropsWithChildren<{
  tone?: "neutral" | "accent" | "amber";
  className?: string;
}>;

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.18em] uppercase",
        tone === "neutral" && "border-white/10 bg-white/6 text-white/70",
        tone === "accent" && "border-sky-300/20 bg-sky-300/10 text-sky-100",
        tone === "amber" && "border-amber-300/20 bg-amber-300/12 text-amber-100",
        className,
      )}
    >
      {children}
    </span>
  );
}
