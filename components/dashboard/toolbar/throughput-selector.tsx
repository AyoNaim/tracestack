"use client";

// components/dashboard/throughput-selector.tsx

import { motion } from "framer-motion";

import type { ThroughputMode } from "@/workers/protocol/types";

import { workerManager } from "@/lib/workers/worker-manager";
import { cn } from "@/lib/utils";

import { Panel } from "@/components/ui/panel";
import { TerminalText } from "@/components/ui/terminal-text";
import { HudDivider } from "@/components/ui/hud-divider";

import { useWorkerStore } from "@/stores/worker-store";

const MODES: readonly ThroughputMode[] = [
  "low",
  "medium",
  "high",
  "extreme",
  "benchmark",
];

interface ModeButtonProps {
  mode: ThroughputMode;
  active: boolean;
}

function ModeButton({
  mode,
  active,
}: ModeButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() => workerManager.setRate(mode)}
      className={cn(
        "relative",

        "overflow-hidden",

        "rounded-md",

        "border",

        "px-5",
        "py-3",

        "transition-all",
        "duration-200",

        "font-mono",
        "uppercase",
        "tracking-[0.18em]",
        "text-xs",

        active
          ? [
              "border-cyan-400",
              "bg-cyan-500/10",
              "text-cyan-300",
              "shadow-[0_0_18px_rgba(34,211,238,0.35)]",
            ]
          : [
              "border-[var(--color-border)]",
              "bg-[rgba(15,22,30,.85)]",
              "text-[var(--color-text-muted)]",
              "hover:border-cyan-500",
              "hover:text-cyan-200",
              "hover:bg-cyan-500/5",
            ]
      )}
    >
      {/* Animated scan line */}

      {active && (
        <motion.div
          layoutId="throughput-active"
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-cyan-400/10
            to-transparent
          "
          transition={{
            duration: 0.25,
          }}
        />
      )}

      {/* Bottom energy strip */}

      <motion.div
        animate={{
          opacity: active ? 1 : 0,
          scaleX: active ? 1 : 0,
        }}
        className="
          absolute
          bottom-0
          left-0

          h-[2px]
          w-full

          origin-left

          bg-cyan-400
        "
      />

      <span className="relative z-10">
        {mode}
      </span>
    </motion.button>
  );
}

export function ThroughputSelector() {
  const throughput = useWorkerStore(
    (state) => state.throughput
  );

  return (
    <Panel className="space-y-4">
      <TerminalText size="sm">
        Throughput Mode
      </TerminalText>

      <HudDivider />

      <div
        className="
          grid
          grid-cols-2
          gap-3

          lg:grid-cols-5
        "
      >
        {MODES.map((mode) => (
          <ModeButton
            key={mode}
            mode={mode}
            active={throughput === mode}
          />
        ))}
      </div>
    </Panel>
  );
}