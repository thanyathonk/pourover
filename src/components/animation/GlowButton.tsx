"use client";

import type { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type GlowButtonProps = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}>;

export function GlowButton({
  children,
  className,
  ...props
}: GlowButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: [
          "0 0 0 rgba(255,182,65,0.24)",
          "0 0 24px rgba(255,182,65,0.42)",
          "0 0 0 rgba(255,182,65,0.24)",
        ],
      }}
      transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 px-6 py-4 text-sm font-semibold text-slate-950",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
