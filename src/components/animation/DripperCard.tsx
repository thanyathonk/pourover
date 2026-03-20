import type { PropsWithChildren } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

type DripperCardProps = PropsWithChildren<{
  className?: string;
}>;

export function DripperCard({ children, className }: DripperCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-white/12 bg-[radial-gradient(circle_at_top,_rgba(103,192,255,0.18),_rgba(5,12,36,0.58)_45%,_rgba(4,8,21,0.92)_100%)] p-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-28 rounded-full bg-sky-300/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-16 bottom-0 h-24 rounded-full bg-amber-300/10 blur-3xl" />
      {children}
    </Card>
  );
}
