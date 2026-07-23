// /workers/core/engine.ts

/// <reference lib="webworker" />

import type {
  FilterPayload,
  SortPayload,
  ThroughputMode,
  WorkerStatus,
} from "../protocol/types";

import type { WorkerEvent } from "../protocol/events";

import { Scheduler } from "./scheduler";
import { RequestGenerator } from "../simulation/request-generator";
import { ServicePipeline } from "../simulation/service-pipeline";
import { MessageGenerator } from "../simulation/message-generator";
import { RingBuffer } from "../storage/ring-buffer";
import { BatchDispatcher } from "../transport/batch-dispatcher";

export class WorkerEngine {
  /**
   * Number of simulated backend requests
   * generated every scheduler tick.
   */
  private static readonly REQUESTS_PER_TICK = 10;

  /**
   * Central runtime state.
   */
  private status: WorkerStatus = {
    running: false,
    paused: false,
    throughput: "medium",
  };

  /**
   * Simulation pipeline.
   */
  private readonly requestGenerator = new RequestGenerator();

  private readonly servicePipeline = new ServicePipeline();

  private readonly messageGenerator = new MessageGenerator();

  /**
   * In-memory storage.
   */
  private readonly ringBuffer = new RingBuffer();

  /**
   * Responsible for all communication
   * with the browser thread.
   */
  private readonly batchDispatcher: BatchDispatcher;

  /**
   * Controls the simulation heartbeat.
   */
  private readonly scheduler = new Scheduler(() => {
    this.onTick();
  });

  constructor(worker: DedicatedWorkerGlobalScope) {
    this.batchDispatcher = new BatchDispatcher(worker);
  }

  /**
   * Worker boot completed.
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
    if (this.status.running) {
      return;
    }

    this.status.running = true;
    this.status.paused = false;

    this.scheduler.start();

    this.publishStatus();
  }

  /**
   * Stop simulation.
   */
  public stop(): void {
    if (!this.status.running) {
      return;
    }

    this.scheduler.stop();

    this.batchDispatcher.flush();

    this.status.running = false;
    this.status.paused = false;

    this.publishStatus();
  }

  /**
   * Pause generation.
   */
  public pause(): void {
    if (!this.status.running || this.status.paused) {
      return;
    }

    this.scheduler.pause();

    this.batchDispatcher.flush();

    this.status.paused = true;

    this.publishStatus();
  }

  /**
   * Resume generation.
   */
  public resume(): void {
    if (!this.status.running || !this.status.paused) {
      return;
    }

    this.scheduler.resume();

    this.status.paused = false;

    this.publishStatus();
  }

  /**
   * Reset runtime.
   */
  public reset(): void {
    this.scheduler.stop();

    this.ringBuffer.clear();

    this.batchDispatcher.clear();

    this.status.running = false;
    this.status.paused = false;

    this.publishStatus();
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

    this.batchDispatcher.destroy();

    this.ringBuffer.clear();
  }

  /**
   * Executes one simulation frame.
   */
  private onTick(): void {
    if (!this.status.running || this.status.paused) {
      return;
    }

    const requests = this.requestGenerator.generate(
      WorkerEngine.REQUESTS_PER_TICK
    );

    const events =
      this.servicePipeline.process(requests);

    const logs =
      this.messageGenerator.generate(events);

    this.ringBuffer.pushMany(logs);

    this.batchDispatcher.enqueue(logs);

    console.log(
      `[Worker] Generated ${requests.length} request(s)`,
      requests
    );

    console.log(
      `[Worker] Processed ${events.length} service event(s)`,
      events
    );

    console.log(
      `[Worker] Generated ${logs.length} log entries`,
      logs
    );
  }

  /**
   * Notify the UI of current runtime state.
   */
  private publishStatus(): void {
    this.emit({
      type: "STATUS",
      payload: this.status,
    });
  }

  /**
   * Send a typed event to the browser.
   */
  private emit(event: WorkerEvent): void {
    this.batchDispatcher.dispatch(event);
  }
}