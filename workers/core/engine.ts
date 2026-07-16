// /workers/core/engine.ts

/// <reference lib="webworker" />

import type {
  FilterPayload,
  SortPayload,
  ThroughputMode,
  WorkerStatus,
} from "../protocol/types";

export class WorkerEngine {
  /**
   * The DedicatedWorkerGlobalScope ("self").
   * This is the communication channel back to the UI.
   */
  private readonly worker: DedicatedWorkerGlobalScope;

  /**
   * Central runtime state.
   * Every subsystem reads from here.
   */
  private status: WorkerStatus = {
    running: false,
    paused: false,
    throughput: "medium",
  };

  constructor(worker: DedicatedWorkerGlobalScope) {
    this.worker = worker;
  }

  /**
   * Called once after the worker boots.
   */
  public ready(): void {
    this.emit({
      type: "READY",
    });
  }

  /**
   * Begin simulation.
   */
  public start(): void {
    if (this.status.running) return;

    this.status.running = true;
    this.status.paused = false;

    this.publishStatus();
  }

  /**
   * Stop everything.
   */
  public stop(): void {
    if (!this.status.running) return;

    this.status.running = false;
    this.status.paused = false;

    this.publishStatus();
  }

  /**
   * Pause generation without destroying state.
   */
  public pause(): void {
    if (!this.status.running) return;

    this.status.paused = true;

    this.publishStatus();
  }

  /**
   * Continue after pause.
   */
  public resume(): void {
    if (!this.status.running) return;

    this.status.paused = false;

    this.publishStatus();
  }

  /**
   * Reset internal state.
   */
  public reset(): void {
    // RingBuffer.reset()
    // Metrics.reset()
    // Scheduler.reset()
    // Simulation.reset()
  }

  /**
   * Change throughput mode.
   */
  public setRate(rate: ThroughputMode): void {
    this.status.throughput = rate;

    this.publishStatus();
  }

  /**
   * Future implementation.
   */
  public setFilter(_filter: FilterPayload): void {}

  /**
   * Future implementation.
   */
  public setSort(_sort: SortPayload): void {}

  /**
   * Shutdown worker.
   */
  public destroy(): void {
    this.stop();
  }

  /**
   * Notify UI of current runtime state.
   */
  private publishStatus(): void {
    this.emit({
      type: "STATUS",
      payload: this.status,
    });
  }

  /**
   * Single exit point for all outgoing events.
   */
  private emit(message: unknown): void {
    this.worker.postMessage(message);
  }
}