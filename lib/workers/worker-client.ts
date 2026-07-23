// src/lib/workers/worker-client.ts

import type { WorkerCommand } from "@/workers/protocol/commands";

import type {
  ReadyEvent,
  StatusEvent,
  LogBatchEvent,
  WorkerErrorEvent,
  WorkerEvent,
  MetricsUpdateEvent
} from "@/workers/protocol/events";

import type { ThroughputMode } from "@/workers/protocol/types";

/**
 * Maps every worker event type to its corresponding event interface.
 */
interface WorkerEventMap {
  READY: ReadyEvent;
  STATUS: StatusEvent;
  LOG_BATCH: LogBatchEvent;
  METRICS: MetricsUpdateEvent;
  ERROR: WorkerErrorEvent;
}

/**
 * Generic listener type.
 */
type Listener<T> = (event: T) => void;

/**
 * Browser-side wrapper around the Web Worker.
 *
 * Responsibilities:
 * - Own the Worker instance
 * - Send typed commands
 * - Receive typed events
 * - Route events to subscribers
 * - Hide the Worker API from React
 */
export class WorkerClient {
  /**
   * Underlying browser worker.
   */
  private readonly worker: Worker;

  /**
   * Typed listener registry.
   */
  private readonly listeners: {
    [K in keyof WorkerEventMap]: Set<Listener<WorkerEventMap[K]>>;
  } = {
    READY: new Set(),
    STATUS: new Set(),
    LOG_BATCH: new Set(),
    METRICS: new Set(),
    ERROR: new Set(),
  };

  constructor() {
    this.worker = new Worker(
      new URL("../../workers/core/index.ts", import.meta.url),
      {
        type: "module",
      }
    );

    this.worker.onmessage = (event: MessageEvent<WorkerEvent>) => {
      this.route(event.data);
    };

    this.worker.onerror = (error) => {
      console.error("[Worker]", error);
    };
  }

  /**
   * Send a typed command to the worker.
   */
  private send(command: WorkerCommand): void {
    this.worker.postMessage(command);
  }

  /**
   * Routes an incoming worker event
   * to the appropriate subscribers.
   */
  private route(event: WorkerEvent): void {
    switch (event.type) {
      case "READY":
        this.listeners.READY.forEach((listener) => listener(event));
        break;

      case "STATUS":
        this.listeners.STATUS.forEach((listener) => listener(event));
        break;

      case "LOG_BATCH":
        this.listeners.LOG_BATCH.forEach((listener) => listener(event));
        break;

      case "METRICS_UPDATE":
        this.listeners.METRICS.forEach((listener) => listener(event));
        break;

      case "WORKER_ERROR":
        this.listeners.ERROR.forEach((listener) => listener(event));
        break;

      default: {
        const exhaustive: never = event;
        return exhaustive;
      }
    }
  }

  /**
   * Subscribe to READY events.
   */
  public onReady(listener: Listener<ReadyEvent>): () => void {
    this.listeners.READY.add(listener);

    return () => {
      this.listeners.READY.delete(listener);
    };
  }

  /**
   * Subscribe to STATUS events.
   */
  public onStatus(listener: Listener<StatusEvent>): () => void {
    this.listeners.STATUS.add(listener);

    return () => {
      this.listeners.STATUS.delete(listener);
    };
  }

  /**
   * Subscribe to LOG_BATCH events.
   */
  public onLogBatch
  (listener: Listener<LogBatchEvent>): () => void {
    this.listeners.LOG_BATCH.add(listener);

    return () => {
      this.listeners.LOG_BATCH.delete(listener);
    };
  }

  public onMetrics(
  listener: Listener<MetricsUpdateEvent>
): () => void {
  this.listeners.METRICS.add(listener);

  return () => {
    this.listeners.METRICS.delete(listener);
  };
}

  /**
   * Subscribe to ERROR events.
   */
  public onError(listener: Listener<WorkerErrorEvent>): () => void {
    this.listeners.ERROR.add(listener);

    return () => {
      this.listeners.ERROR.delete(listener);
    };
  }

  /**
   * Start simulation.
   */
  public start(): void {
    this.send({
      type: "START",
    });
  }

  /**
   * Stop simulation.
   */
  public stop(): void {
    this.send({
      type: "STOP",
    });
  }

  /**
   * Pause simulation.
   */
  public pause(): void {
    this.send({
      type: "PAUSE",
    });
  }

  /**
   * Resume simulation.
   */
  public resume(): void {
    this.send({
      type: "RESUME",
    });
  }

  /**
   * Reset worker state.
   */
  public reset(): void {
    this.send({
      type: "RESET",
    });
  }

  /**
   * Change throughput mode.
   */
  public setRate(rate: ThroughputMode): void {
    this.send({
      type: "SET_RATE",
      payload: rate,
    });
  }

  /**
   * Shut down the worker and clean up listeners.
   */
  public disconnect(): void {
    this.worker.terminate();

    Object.values(this.listeners).forEach((set) => set.clear());
  }
}