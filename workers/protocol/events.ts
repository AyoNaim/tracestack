// workers/protocol/events.ts
// 

import type { LogEntry } from "@/workers/types/log";

import type {
  MetricsSnapshot,
  WorkerStatus,
  WorkerErrorPayload,
} from "./types";

export interface ReadyEvent {
  type: "READY";
}

export interface StatusEvent {
  type: "STATUS";
  payload: WorkerStatus;
}

export interface LogBatchEvent {
  type: "LOG_BATCH";
  payload: LogEntry[]
}

export interface MetricsUpdateEvent {
  type: "METRICS";
  payload: MetricsSnapshot;
}

export interface WorkerErrorEvent {
  type: "ERROR";
  payload: WorkerErrorPayload;
}

export type WorkerEvent =
  | ReadyEvent
  | StatusEvent
  | LogBatchEvent
  | MetricsUpdateEvent
  | WorkerErrorEvent;