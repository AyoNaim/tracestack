"use client";

// components/dashboard/status-indicator.tsx

import { Panel } from "@/components/ui/panel";
import { GlowDot, type SystemStatus } from "@/components/ui/glow-dot";
import { HudDivider } from "@/components/ui/hud-divider";
import { TerminalText } from "@/components/ui/terminal-text";

import { useWorkerStore } from "@/stores/worker-store";

interface StatusRowProps {
  label: string;
  value: string;
  status: SystemStatus;
}

function StatusRow({
  label,
  value,
  status,
}: StatusRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <GlowDot
          systemStatus={status}
          pulse
        />

        <TerminalText
          size="xs"
          glow={false}
          dim
        >
          {label}
        </TerminalText>
      </div>

      <TerminalText size="xs">
        {value}
      </TerminalText>
    </div>
  );
}

export function StatusIndicator() {
  const {
    ready,
    connected,
    running,
    paused,
    throughput,
  } = useWorkerStore((state) => ({
    ready: state.ready,
    connected: state.connected,
    running: state.running,
    paused: state.paused,
    throughput: state.throughput,
  }));

  const workerStatus: SystemStatus =
    !connected
      ? "offline"
      : paused
      ? "idle"
      : running
      ? "online"
      : "busy";

  return (
    <Panel className="space-y-4">
      <TerminalText size="sm">
        System Status
      </TerminalText>

      <HudDivider />

      <div className="space-y-3">
        <StatusRow
          label="Worker"
          value={connected ? "CONNECTED" : "OFFLINE"}
          status={connected ? "online" : "offline"}
        />

        <StatusRow
          label="Engine"
          value={
            running
              ? paused
                ? "PAUSED"
                : "RUNNING"
              : "STOPPED"
          }
          status={workerStatus}
        />

        <StatusRow
          label="Ready"
          value={ready ? "YES" : "NO"}
          status={ready ? "online" : "warning"}
        />

        <StatusRow
          label="Throughput"
          value={throughput.toUpperCase()}
          status="online"
        />
      </div>
    </Panel>
  );
}