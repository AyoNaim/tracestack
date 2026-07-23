"use client";

import { useEffect } from "react";

import type {
  ReadyEvent,
  StatusEvent,
  LogBatchEvent,
  MetricsUpdateEvent,
  WorkerErrorEvent,
} from "@/workers/protocol/events";

import { workerManager } from "./worker-manager";

export interface UseWorkerOptions {
  onReady?(event: ReadyEvent): void;
  onStatus?(event: StatusEvent): void;
  onLogBatch?(event: LogBatchEvent): void;
  onMetrics?(event: MetricsUpdateEvent): void;
  onError?(event: WorkerErrorEvent): void;
}

export function useWorker(options: UseWorkerOptions = {}) {
  useEffect(() => {
    const unsubscribers: Array<() => void> = [];

    if (options.onReady) {
      unsubscribers.push(workerManager.onReady(options.onReady));
    }

    if (options.onStatus) {
      unsubscribers.push(workerManager.onStatus(options.onStatus));
    }

    if (options.onLogBatch) {
      unsubscribers.push(workerManager.onLogBatch(options.onLogBatch));
    }

    if (options.onMetrics) {
      unsubscribers.push(workerManager.onMetrics(options.onMetrics));
    }

    if (options.onError) {
      unsubscribers.push(workerManager.onError(options.onError));
    }

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [options]);

  return workerManager;
}