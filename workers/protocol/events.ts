// workers/protocol/events.ts
// 

import type { LogEntry } from "@/types/log";

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
  payload: {
    logs: LogEntry[];
  };
}

export interface MetricsEvent {
  type: "METRICS";
  payload: MetricsSnapshot;
}

export interface ErrorEvent {
  type: "ERROR";
  payload: WorkerErrorPayload;
}

export type WorkerEvent =
  | ReadyEvent
  | StatusEvent
  | LogBatchEvent
  | MetricsEvent
  | ErrorEvent;