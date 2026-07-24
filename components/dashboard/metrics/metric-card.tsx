"use client";

// src/components/dashboard/metrics/metric-card.tsx

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { Panel } from "@/components/ui/panel";
import { PanelTitle } from "@/components/ui/panel-title";
import { StatusPill } from "@/components/ui/status-pill";
import { HudDivider } from "@/components/ui/hud-divider";
import { GridBackground } from "@/components/ui/grid-background";
import { TerminalText } from "@/components/ui/terminal-text";

import { panelVariants } from "@/lib/animations/panel";
import { cn } from "@/lib/utils";

import type { SystemStatus } from "@/components/ui/glow-dot";

export interface MetricCardProps
  extends Omit<HTMLMotionProps<"article">, "children"> {
  title: string;

  eyebrow?: string;

  value: string | number;

  unit?: string;

  delta?: string;

  trend?: "up" | "down" | "neutral";

  status?: SystemStatus;

  footer?: React.ReactNode;
}

export function MetricCard({
  title,
  eyebrow,
  value,
  unit,
  delta,
  trend = "neutral",
  status = "online",
  footer,
  className,
  ...props
}: MetricCardProps) {
  return (
    <motion.article
      variants={panelVariants}
      initial="rest"
      whileHover="hover"
      className={cn("group h-full", className)}
      {...props}
    >
      <Panel className="h-full overflow-hidden">
        <GridBackground
          size={32}
          className="opacity-30"
        />

        <div className="relative z-10 flex h-full flex-col gap-5">
          {/* Header */}

          <div className="flex items-start justify-between gap-4">
            <PanelTitle
              eyebrow={eyebrow}
            >
              {title}
            </PanelTitle>

            <StatusPill status={status} />
          </div>

          <HudDivider />

          {/* Main Metric */}

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-end gap-2">
              <motion.span
                layout
                className="
                  font-mono
                  text-5xl
                  font-bold
                  tracking-tight
                  text-[var(--color-primary)]
                  terminal-glow
                "
              >
                {value}
              </motion.span>

              {unit && (
                <TerminalText
                  size="md"
                  glow={false}
                  className="pb-2"
                >
                  {unit}
                </TerminalText>
              )}
            </div>
          </div>

          {/* Footer */}

          <HudDivider />

          <div className="flex items-center justify-between">
            <TerminalText
              size="xs"
              glow={false}
              dim
            >
              {delta ?? "--"}
            </TerminalText>

            <TerminalText
              size="xs"
              glow={false}
              className={cn(
                trend === "up" &&
                  "text-emerald-400",

                trend === "down" &&
                  "text-red-400",

                trend === "neutral" &&
                  "text-[var(--color-text-muted)]"
              )}
            >
              {trend === "up" && "▲"}

              {trend === "down" && "▼"}

              {trend === "neutral" && "■"}
            </TerminalText>
          </div>

          {footer && (
            <>
              <HudDivider />

              {footer}
            </>
          )}
        </div>
      </Panel>
    </motion.article>
  );
}