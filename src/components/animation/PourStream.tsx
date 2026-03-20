"use client";

import { memo } from "react";
import { motion } from "motion/react";

type PourStreamProps = {
  active: boolean;
};

export const PourStream = memo(function PourStream({ active }: PourStreamProps) {
  if (!active) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.4 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute left-1/2 top-3 h-24 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400 shadow-[0_0_20px_rgba(123,220,255,0.5)]"
    />
  );
});
