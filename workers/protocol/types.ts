// workers/protocol/types.ts

export type ThroughputMode =
  | "low"
  | "medium"
  | "high"
  | "extreme"
  | "benchmark";

export type LogLevel =
  | "trace"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

export type SortDirection = "asc" | "desc";

export interface WorkerStatus {
  running: boolean;
  paused: boolean;
  throughput: ThroughputMode;
}

export interface FilterPayload {
  query: string;
  levels: LogLevel[];
  services: string[];
}

export interface SortPayload {
  field: string;
  direction: SortDirection;
}

export interface MetricsSnapshot {
  eventsPerSecond: number;
  totalEvents: number;
  errorRate: number;
  averageLatency: number;
  queueDepth: number;
}

export interface WorkerErrorPayload {
  message: string;
  stack?: string;
}