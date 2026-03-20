"use client";

import { memo } from "react";
import { motion } from "motion/react";

type DripStreamProps = {
  active: boolean;
};

export const DripStream = memo(function DripStream({ active }: DripStreamProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 0.75 : 0.08,
        height: active ? 36 : 10,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute left-1/2 top-[220px] w-px -translate-x-1/2 rounded-full bg-sky-200"
    />
  );
});
