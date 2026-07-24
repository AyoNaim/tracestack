"use client";

import { motion } from "framer-motion";

import { hudVariants } from "@/lib/animations/hud";
import { cn } from "@/lib/utils";

export type GlowDotStatus =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export type SystemStatus =
  | "online"
  | "offline"
  | "busy"
  | "idle"
  | "warning"
  | "error";

export interface GlowDotProps {
  /**
   * Color preset.
   */
  status?: GlowDotStatus;

  systemStatus?: SystemStatus;

  /**
   * Optional label shown beside the dot.
   */
  label?: string;

  /**
   * Enable pulsing animation.
   */
  pulse?: boolean;

  /**
   * Additional classes.
   */
  className?: string;
}

const SYSTEM_STATUS_MAP: Record<SystemStatus, GlowDotStatus> = {
  online: "success",
  offline: "muted",
  busy: "primary",
  idle: "muted",
  warning: "warning",
  error: "danger",
};

const STATUS_STYLES: Record<
  GlowDotStatus,
  {
    background: string;
    shadow: string;
    text: string;
  }
> = {
  primary: {
    background: "var(--color-primary)",
    shadow: "var(--glow-primary-lg)",
    text: "text-cyan-300",
  },

  success: {
    background: "var(--color-success)",
    shadow: "var(--glow-success)",
    text: "text-emerald-400",
  },

  warning: {
    background: "var(--color-warning)",
    shadow: "var(--glow-warning)",
    text: "text-yellow-300",
  },

  danger: {
    background: "var(--color-danger)",
    shadow: "var(--glow-danger)",
    text: "text-rose-400",
  },

  muted: {
    background: "var(--color-text-muted)",
    shadow: "none",
    text: "text-slate-400",
  },
};

export function GlowDot({
  status,
  systemStatus,
  label,
  pulse = true,
  className,
}: GlowDotProps) {
  
const resolvedStatus =
  systemStatus !== undefined
    ? SYSTEM_STATUS_MAP[systemStatus]
    : (status ?? "primary");
  const colors = STATUS_STYLES[resolvedStatus];

  return (
    <motion.div
      variants={hudVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "inline-flex items-center gap-2",
        "select-none",
        className
      )}
    >
      <span
        className={cn(
          "block h-2.5 w-2.5 rounded-full",
          pulse && "animate-status"
        )}
        style={{
          background: colors.background,
          boxShadow: colors.shadow,
        }}
      />

      {label && (
        <span
          className={cn(
            "terminal-text tracking-[0.18em]",
            colors.text
          )}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}