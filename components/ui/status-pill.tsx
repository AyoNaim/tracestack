"use client";

// components/ui/status-pill.tsx

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { fadeVariants } from "@/lib/animations/fade";
import { cn } from "@/lib/utils";

import { GlowDot, type GlowDotStatus, type SystemStatus } from "./glow-dot";
import { TerminalText } from "./terminal-text";

export interface StatusPillProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Status represented by the GlowDot.
   */
  status: SystemStatus;

  /**
   * Optional label.
   */
  label?: string;

  /**
   * Animate when mounted.
   */
  animated?: boolean;
}

const STATUS_TO_GLOW: Record<SystemStatus, GlowDotStatus> = {
  online: "success",
  offline: "muted",
  busy: "primary",
  idle: "muted",
  warning: "warning",
  error: "danger",
};

export function StatusPill({
  status,
  label,
  animated = true,
  className,
  ...props
}: StatusPillProps) {
  return (
    <motion.div
      variants={animated ? fadeVariants : undefined}
      initial={animated ? "hidden" : false}
      animate={animated ? "visible" : false}
      className={cn(
        "inline-flex items-center gap-2",
        "rounded-md",
        "border border-[var(--color-border)]",
        "bg-[var(--color-panel)]/80",
        "px-3 py-1.5",
        "backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <GlowDot status={STATUS_TO_GLOW[status]}/>

      <TerminalText
        glow={false}
        size="xs"
      >
        {label ?? STATUS_TO_GLOW[status]}
      </TerminalText>
    </motion.div>
  );
}