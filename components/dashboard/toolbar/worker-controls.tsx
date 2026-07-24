"use client";

// src/components/dashboard/worker-controls.tsx

import { motion } from "framer-motion";

import { panelVariants } from "@/lib/animations/panel";

import { workerManager } from "@/lib/workers/worker-manager";

import { Panel } from "@/components/ui/panel";
import { TerminalText } from "@/components/ui/terminal-text";
import { HudDivider } from "@/components/ui/hud-divider";

import { useWorkerStore } from "@/stores/worker-store";

interface ControlButtonProps {
  label: string;
  shortcut: string;
  onClick: () => void;
  disabled?: boolean;
}

function ControlButton({
  label,
  shortcut,
  onClick,
  disabled = false,
}: ControlButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      disabled={disabled}
      onClick={onClick}
      className="
        group
        relative

        flex
        flex-col
        items-center
        justify-center

        overflow-hidden

        rounded-md

        border
        border-[var(--color-border)]

        bg-[rgba(15,22,30,.85)]

        px-5
        py-3

        transition-all
        duration-200

        hover:border-[var(--color-primary)]
        hover:bg-cyan-500/5
        hover:shadow-[0_0_18px_rgba(0,255,255,.20)]

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      <TerminalText size="sm">
        {label}
      </TerminalText>

      <TerminalText
        size="xs"
        glow={false}
        dim
      >
        {shortcut}
      </TerminalText>
    </motion.button>
  );
}

export function WorkerControls() {
    const running = useWorkerStore(
        (state) => state.running
    );

    const paused = useWorkerStore(
        (state) => state.paused
    );

    const throughput = useWorkerStore(
        (state) => state.throughput
    );

    const connected = useWorkerStore(
        (state) => state.connected
    );

    const ready = useWorkerStore(
        (state) => state.ready
    );
  return (
    <Panel
      animated
      className="space-y-4"
    >
      <TerminalText size="sm">
        Operation Control
      </TerminalText>

      <HudDivider />

      <div
        className="
          grid
          grid-cols-2
          gap-3

          lg:grid-cols-4
        "
      >
        <ControlButton
          label="START"
          shortcut="F1"
          disabled={running}
          onClick={() => workerManager.start()}
        />

        <ControlButton
          label={paused ? "RESUME" : "PAUSE"}
          shortcut="F2"
          disabled={!running}
          onClick={() => {
            if (paused) {
              workerManager.resume();
            } else {
              workerManager.pause();
            }
          }}
        />

        <ControlButton
          label="STOP"
          shortcut="F3"
          disabled={!running}
          onClick={() => workerManager.stop()}
        />

        <ControlButton
          label="RESET"
          shortcut="F4"
          onClick={() => workerManager.reset()}
        />
      </div>
    </Panel>
  );
}