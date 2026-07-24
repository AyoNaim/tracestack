"use client";

// components/dashboard/toolbar/top-toolbar.tsx

import { Panel } from "@/components/ui/panel";
import { TerminalText } from "@/components/ui/terminal-text";
import { HudDivider } from "@/components/ui/hud-divider";

import { StatusIndicator } from "./status-indicator";
import { WorkerControls } from "./worker-controls";
import { ThroughputSelector } from "./throughput-selector";

export function TopToolbar() {
  return (
    <Panel
      className="
        space-y-6
      "
    >
      <TerminalText size="md">
        Command Console
      </TerminalText>

      <HudDivider />

      <div
        className="
          grid
          gap-6

          xl:grid-cols-[260px_1fr_420px]
        "
      >
        <StatusIndicator />

        <WorkerControls />

        <ThroughputSelector />
      </div>
    </Panel>
  );
}