// src/stores/worker-store.ts

import { create } from "zustand";

import type {
  ThroughputMode,
  WorkerStatus,
} from "@/workers/protocol/types";

interface WorkerStore {
  ready: boolean;

  connected: boolean;

  running: boolean;

  paused: boolean;

  throughput: ThroughputMode;

  setReady(ready: boolean): void;

  setConnected(connected: boolean): void;

  setStatus(status: WorkerStatus): void;
}

export const useWorkerStore =
  create<WorkerStore>((set) => ({
    ready: false,

    connected: false,

    running: false,

    paused: false,

    throughput: "medium",

    setReady: (ready) =>
      set({
        ready,
      }),

    setConnected: (connected) =>
      set({
        connected,
      }),

    setStatus: (status) =>
      set({
        running: status.running,
        paused: status.paused,
        throughput: status.throughput,
      }),
  }));