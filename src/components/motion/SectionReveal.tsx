"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";
import { slowTransition } from "@/lib/motion";

type SectionRevealProps = HTMLMotionProps<"section"> & {
  delay?: number;
};

export function SectionReveal({ children, delay = 0, ...props }: SectionRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      {...props}
      initial={reducedMotion ? false : { opacity: 0, y: 34, rotate: -0.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -80px 0px" }}
      transition={reducedMotion ? { duration: 0 } : { ...slowTransition, delay }}
    >
      {children}
    </motion.section>
  );
}
