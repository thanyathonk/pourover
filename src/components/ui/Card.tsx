import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = PropsWithChildren<
  Omit<ComponentPropsWithoutRef<"div">, "className"> & { className?: string }
>;

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/6 shadow-[0_20px_80px_rgba(4,10,30,0.45)] backdrop-blur-xl",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
