"use client";

// components/dashboard/footer-stats.tsx

import { useMemo } from "react";

import { Panel } from "@/components/ui/panel";
import { GlowDot } from "@/components/ui/glow-dot";
import { HudDivider } from "@/components/ui/hud-divider";
import { TerminalText } from "@/components/ui/terminal-text";

import { useMetricsStore } from "@/stores/metrics-store";
import { useLogStore } from "@/stores/log-store";
import { useWorkerStore } from "@/stores/worker-store";

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2

        whitespace-nowrap
      "
    >
      <TerminalText
        size="xs"
        dim
        glow={false}
      >
        {label}
      </TerminalText>

      <TerminalText
        size="xs"
        glow
      >
        {value}
      </TerminalText>
    </div>
  );
}

export function FooterStats() {
  const metrics = useMetricsStore(
    (state) => state.metrics
  );

  const logs = useLogStore(
    (state) => state.logs
  );

  const worker = useWorkerStore();

  const status = useMemo(() => {
    if (!worker.connected) return "offline";

    if (worker.running) return "online";

    return "idle";
  }, [
    worker.connected,
    worker.running,
  ]);

  return (
    <Panel
      animated={false}
      className="
        py-3
        px-5
      "
    >
      <div
        className="
          flex
          items-center
          gap-6

          overflow-x-auto
        "
      >
        <GlowDot
          systemStatus={status}
          label={status}
        />

        <HudDivider
          orientation="vertical"
          className="h-5"
        />

        <Stat
          label="EVENTS/s"
          value={
            metrics?.eventsPerSecond.toLocaleString() ??
            "--"
          }
        />

        <Stat
          label="TOTAL"
          value={
            metrics?.totalEvents.toLocaleString() ??
            "--"
          }
        />

        <Stat
          label="QUEUE"
          value={
            metrics?.queueDepth.toLocaleString() ??
            "--"
          }
        />

        <Stat
          label="LATENCY"
          value={
            metrics
              ? `${metrics.averageLatency.toFixed(1)} ms`
              : "--"
          }
        />

        <Stat
          label="ERROR"
          value={
            metrics
              ? `${metrics.errorRate.toFixed(1)}%`
              : "--"
          }
        />

        <Stat
          label="VISIBLE"
          value={logs.length.toLocaleString()}
        />
      </div>
    </Panel>
  );
}