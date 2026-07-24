"use client";

// components/dashboard/log-row.tsx

import { memo } from "react";

import { cn } from "@/lib/utils";

import type { LogEntry } from "@/workers/types/log";

import { GlowDot, GlowDotStatus } from "@/components/ui/glow-dot";
import { TerminalText } from "@/components/ui/terminal-text";
import { LogLevel } from "@/workers/protocol/types";

export interface LogRowProps {
  log: LogEntry;
}

/**
 * Maps log level to GlowDot color.
 * GlowDot remains the single source of truth
 * for status visualization throughout the UI.
 */
const LEVEL_STATUS: Record<LogLevel, GlowDotStatus> = {
  trace: "muted",
  debug: "primary",
  info: "success",
  warn: "warning",
  error: "danger",
} as const;

/**
 * Optional left accent colors.
 */
const LEVEL_BORDER: Record<LogLevel, string> = {
  trace: "border-l-slate-700",
  debug: "border-l-cyan-500",
  info: "border-l-emerald-500",
  warn: "border-l-yellow-500",
  error: "border-l-red-500",
} as const;

function formatTimestamp(timestamp: string | number | Date) {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function LogRowComponent({
  log,
}: LogRowProps) {
  return (
    <div
      className={cn(
        "group",

        "grid",
        "grid-cols-[160px_120px_1fr_160px]",
        "items-center",
        "gap-4",

        "border-l-2",
        LEVEL_BORDER[log.level],

        "border-b",
        "border-[var(--color-border)]",

        "px-5",
        "py-2",

        "transition-all",
        "duration-150",

        "hover:bg-cyan-500/5",
        "hover:shadow-[inset_0_0_18px_rgba(0,255,255,0.08)]"
      )}
    >
      {/* Timestamp */}

      <TerminalText
        size="xs"
        glow={false}
        dim
      >
        {log.displayTime}
      </TerminalText>

      {/* Level */}

      <div className="flex items-center gap-2">
        <GlowDot status={LEVEL_STATUS[log.level]} />

        <TerminalText size="xs">
          {log.level}
        </TerminalText>
      </div>

      {/* Message */}

      <TerminalText
        size="xs"
        glow={false}
        className="
          truncate
          group-hover:text-white
          transition-colors
        "
      >
        {log.message}
      </TerminalText>

      {/* Service */}

      <TerminalText
        size="xs"
        glow={false}
        dim
        className="justify-self-end"
      >
        {log.service}
      </TerminalText>
    </div>
  );
}

/**
 * Since rows are immutable after creation,
 * React.memo prevents unnecessary rerenders.
 */
export const LogRow = memo(LogRowComponent);