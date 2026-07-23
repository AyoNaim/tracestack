// src/stores/log-store.ts

import { create } from "zustand";

import type { LogEntry } from "@/workers/types/log";

interface LogStore {
  /**
   * Logs currently visible to the UI.
   *
   * The worker decides what these logs are.
   */
  logs: LogEntry[];

  /**
   * Replace the current dataset.
   */
  setLogs(logs: LogEntry[]): void;

  /**
   * Append another batch.
   */
  appendLogs(logs: LogEntry[]): void;

  /**
   * Remove every log.
   */
  clear(): void;
}

export const useLogStore = create<LogStore>((set) => ({
  logs: [],

  setLogs: (logs) =>
    set({
      logs,
    }),

  appendLogs: (logs) =>
    set((state) => ({
      logs: [...state.logs, ...logs],
    })),

  clear: () =>
    set({
      logs: [],
    }),
}));