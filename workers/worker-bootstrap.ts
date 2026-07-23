// lib/workers/worker-bootstrap.ts

import { workerManager } from "@/lib/workers/worker-manager";

import { useLogStore } from "@/stores/log-store";
import { useMetricsStore } from "@/stores/metrics-store";
import { useWorkerStore } from "@/stores/worker-store";

/**
 * Prevent multiple initializations.
 */
let initialized = false;

/**
 * Holds every worker subscription cleanup function.
 */
const subscriptions: Array<() => void> = [];

/**
 * Connects the WorkerClient to the Zustand stores.
 *
 * This should only ever be called once,
 * typically near the root of the application.
 */
export function initializeWorker(): void {
  if (initialized) {
    return;
  }

  initialized = true;

  /*
   * READY
   */
  subscriptions.push(
    workerManager.onReady(() => {
      const workerStore = useWorkerStore.getState();

      workerStore.setReady(true);
      workerStore.setConnected(true);
    })
  );

  /*
   * STATUS
   */
  subscriptions.push(
    workerManager.onStatus((event) => {
      useWorkerStore
        .getState()
        .setStatus(event.payload);
    })
  );

  /*
   * LOG BATCH
   */
  subscriptions.push(
    workerManager.onLogBatch((event) => {
      useLogStore
        .getState()
        .appendLogs(event.payload);
    })
  );

  /*
   * METRICS
   */
  subscriptions.push(
    workerManager.onMetrics((event) => {
      useMetricsStore
        .getState()
        .update(event.payload);
    })
  );

  /*
   * WORKER ERROR
   */
  subscriptions.push(
    workerManager.onError((event) => {
      console.error(
        "[Worker Error]",
        event.payload
      );

      useWorkerStore
        .getState()
        .setConnected(false);
    })
  );
}

/**
 * Disconnects the worker and removes every subscription.
 *
 * Mainly useful during development (Fast Refresh)
 * or if the dashboard is ever unmounted.
 */
export function disposeWorker(): void {
  subscriptions.forEach((unsubscribe) => unsubscribe());

  subscriptions.length = 0;

  workerManager.disconnect();

  initialized = false;

  useWorkerStore.getState().setConnected(false);
}