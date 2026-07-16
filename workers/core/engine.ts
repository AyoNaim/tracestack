// /workers/core/engine.ts

/// <reference lib="webworker" />

import type {
  FilterPayload,
  SortPayload,
  ThroughputMode,
  WorkerStatus,
} from "../protocol/types";

import { Scheduler } from "./scheduler";
import { RequestGenerator } from "../simulation/request-generator";

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

  /**
   * Generates simulated backend requests.
   */
  private readonly requestGenerator = new RequestGenerator();

  /**
   * Controls the heartbeat of the worker.
   */
  private readonly scheduler = new Scheduler(() => {
    this.onTick();
  });

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

    this.scheduler.start();

    this.publishStatus();
  }

  /**
   * Stop everything.
   */
  public stop(): void {
    if (!this.status.running) return;

    this.scheduler.stop();

    this.status.running = false;
    this.status.paused = false;

    this.publishStatus();
  }

  /**
   * Pause generation without destroying state.
   */
  public pause(): void {
    if (!this.status.running) return;

    this.scheduler.pause();

    this.status.paused = true;

    this.publishStatus();
  }

  /**
   * Continue after pause.
   */
  public resume(): void {
    if (!this.status.running) return;

    this.scheduler.resume();

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
   * Runs on every scheduler tick.
   */
  private onTick(): void {
    const requests = this.requestGenerator.generate(10);

    console.log(
      `[Worker] Generated ${requests.length} request(s)`,
      requests
    );
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