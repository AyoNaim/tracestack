"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { fadeVariants } from "@/lib/animations/fade";
import { cn } from "@/lib/utils";

export interface HudDividerProps
  extends HTMLMotionProps<"div"> {
  /**
   * Animate on mount.
   */
  animated?: boolean;

  /**
   * Optional glow.
   */
  glow?: boolean;
}

export function HudDivider({
  animated = true,
  glow = true,
  className,
  ...props
}: HudDividerProps) {
  return (
    <motion.div
      variants={animated ? fadeVariants : undefined}
      initial={animated ? "hidden" : false}
      animate={animated ? "visible" : false}
      className={cn(
        "relative h-px w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Base line */}

      <div
        className="
          absolute
          inset-0
          bg-white/10
        "
      />

      {/* Neon center */}

      <div
        className={cn(
          "absolute inset-y-0 left-1/2 w-40 -translate-x-1/2",
          glow && "shadow-[0_0_12px_var(--color-primary)]"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
        }}
      />
    </motion.div>
  );
}