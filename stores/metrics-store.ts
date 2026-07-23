// src/stores/metrics-store.ts

import { create } from "zustand";

import type { MetricsSnapshot } from "@/workers/protocol/types";

interface MetricsStore {
  metrics: MetricsSnapshot | null;

  update(metrics: MetricsSnapshot): void;

  reset(): void;
}

export const useMetricsStore =
  create<MetricsStore>((set) => ({
    metrics: null,

    update: (metrics) =>
      set({
        metrics,
      }),

    reset: () =>
      set({
        metrics: null,
      }),
  }));