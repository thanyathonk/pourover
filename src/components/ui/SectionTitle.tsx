import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/cn";

type SectionTitleProps = PropsWithChildren<{
  eyebrow?: string;
  className?: string;
}>;

export function SectionTitle({ children, eyebrow, className }: SectionTitleProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-sky-200/55">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("text-lg font-semibold tracking-tight text-white", eyebrow && "mt-2")}>
        {children}
      </h2>
    </div>
  );
}
