"use client";

// components/dashboard/metrics/metrics-grid.tsx

import { MetricCard } from "./metric-card";

import { useMetricsStore } from "@/stores/metrics-store";

export function MetricsGrid() {
  const metrics = useMetricsStore((state) => state.metrics);

  /**
   * Worker hasn't published its first metrics snapshot yet.
   */
  if (!metrics) {
    return (
      <section
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        <MetricCard
          eyebrow="SIMULATION"
          title="Events / Sec"
          value="--"
          unit="EPS"
          status="offline"
        />

        <MetricCard
          eyebrow="SIMULATION"
          title="Total Events"
          value="--"
          status="offline"
        />

        <MetricCard
          eyebrow="PERFORMANCE"
          title="Average Latency"
          value="--"
          unit="ms"
          status="offline"
        />

        <MetricCard
          eyebrow="HEALTH"
          title="Error Rate"
          value="--"
          unit="%"
          status="offline"
        />

        <MetricCard
          eyebrow="QUEUE"
          title="Queue Depth"
          value="--"
          status="offline"
        />
      </section>
    );
  }

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      <MetricCard
        eyebrow="SIMULATION"
        title="Events / Sec"
        value={metrics.eventsPerSecond}
        unit="EPS"
        status="online"
      />

      <MetricCard
        eyebrow="SIMULATION"
        title="Total Events"
        value={metrics.totalEvents}
        status="online"
      />

      <MetricCard
        eyebrow="PERFORMANCE"
        title="Average Latency"
        value={metrics.averageLatency}
        unit="ms"
        status="online"
      />

      <MetricCard
        eyebrow="HEALTH"
        title="Error Rate"
        value={metrics.errorRate}
        unit="%"
        status="online"
      />

      <MetricCard
        eyebrow="QUEUE"
        title="Queue Depth"
        value={metrics.queueDepth}
        status="online"
      />
    </section>
  );
}