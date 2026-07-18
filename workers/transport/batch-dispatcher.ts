// workers/transport/batch-dispatcher.ts

/// <reference lib="webworker" />

import { LogBatchEvent } from "../protocol/events";
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

  constructor(
    worker: DedicatedWorkerGlobalScope,
    batchSize = 250
  ) {
    this.worker = worker;
    this.batchSize = batchSize;
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
        payload: this.queue
    } 

    this.worker.postMessage(event);

    this.queue = [];
  }

  /**
   * Remove pending logs.
   */
  public clear(): void {
    this.queue = [];
  }

  /**
   * Current queue size.
   */
  public size(): number {
    return this.queue.length;
  }
}