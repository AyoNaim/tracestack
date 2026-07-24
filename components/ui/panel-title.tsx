"use client";

// components/ui/panel-title.tsx

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { fadeVariants } from "@/lib/animations/fade";
import { cn } from "@/lib/utils";

export interface PanelTitleProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;

  /**
   * Small label shown above the title.
   */
  eyebrow?: string;

  /**
   * Optional value displayed on the right.
   */
  value?: React.ReactNode;
}

export function PanelTitle({
  children,
  eyebrow,
  value,
  className,
  ...props
}: PanelTitleProps) {
  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex items-end justify-between gap-4",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        {eyebrow && (
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[var(--color-text-muted)]
            "
          >
            {eyebrow}
          </p>
        )}

        <h2
          className="
            font-mono
            text-lg
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[var(--color-primary)]
            terminal-glow
          "
        >
          {children}
        </h2>
      </div>

      {value && (
        <div
          className="
            font-mono
            text-xs
            uppercase
            tracking-[0.2em]
            text-[var(--color-accent)]
          "
        >
          {value}
        </div>
      )}
    </motion.div>
  );
}