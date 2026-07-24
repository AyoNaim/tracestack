"use client";

// components/dashboard/metrics/metric-value.tsx

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

export interface MetricValueProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Primary metric value.
   */
  value: string | number;

  /**
   * Optional unit.
   */
  unit?: string;

  /**
   * Secondary caption.
   */
  caption?: string;

  /**
   * Should the value glow?
   */
  glow?: boolean;
}

export function MetricValue({
  value,
  unit,
  caption,
  glow = true,
  className,
  ...props
}: MetricValueProps) {
  return (
    <motion.div
      layout
      className={cn(
        "flex flex-col items-start",
        className
      )}
      {...props}
    >
      <div className="flex items-end gap-3">
        <motion.span
          layout
          className={cn(
            "font-mono",
            "font-bold",
            "leading-none",
            "tracking-tight",
            "text-5xl",
            "text-[var(--color-primary)]",
            glow && "terminal-glow"
          )}
        >
          {value}
        </motion.span>

        {unit && (
          <span
            className="
              mb-1
              font-mono
              text-sm
              uppercase
              tracking-[0.2em]
              text-[var(--color-text-muted)]
            "
          >
            {unit}
          </span>
        )}
      </div>

      {caption && (
        <span
          className="
            mt-3
            font-mono
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-[var(--color-text-muted)]
          "
        >
          {caption}
        </span>
      )}
    </motion.div>
  );
}