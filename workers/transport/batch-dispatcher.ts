// workers/transport/batch-dispatcher.ts

/// <reference lib="webworker" />

import type {
  LogBatchEvent,
  WorkerEvent,
} from "../protocol/events";

import type { LogEntry } from "../types/log";

export class BatchDispatcher {
  /**
   * Worker communication channel.
   */
  private readonly worker: DedicatedWorkerGlobalScope;

  /**
   * Logs waiting to be sent.
   */
  private queue: LogEntry[] = [];

  /**
   * Maximum number of logs per batch.
   */
  private readonly batchSize: number;

  /**
   * Maximum time (ms) before forcing a flush.
   */
  private readonly flushInterval: number;

  /**
   * Timer responsible for periodic flushing.
   */
  private readonly timer: number;

  constructor(
    worker: DedicatedWorkerGlobalScope,
    batchSize = 250,
    flushInterval = 100
  ) {
    this.worker = worker;
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;

    this.timer = self.setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  /**
   * Send a single worker event immediately.
   *
   * Used for READY, STATUS, ERROR,
   * METRICS and any future control events.
   */
  public dispatch(event: WorkerEvent): void {
    this.worker.postMessage(event);
  }

  /**
   * Add newly generated logs to the queue.
   */
  public enqueue(logs: LogEntry[]): void {
    this.queue.push(...logs);

    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  /**
   * Immediately send every queued log.
   */
  public flush(): void {
    if (this.queue.length === 0) {
      return;
    }

    const event: LogBatchEvent = {
      type: "LOG_BATCH",
      payload: [...this.queue],
    };

    this.dispatch(event);

    this.queue.length = 0;
  }

  /**
   * Stop the timer.
   * Called when the worker shuts down.
   */
  public destroy(): void {
    this.flush();

    clearInterval(this.timer);
  }

  /**
   * Remove pending logs.
   */
  public clear(): void {
    this.queue.length = 0;
  }

  /**
   * Current queue size.
   */
  public size(): number {
    return this.queue.length;
  }
}