// src/types/log.ts

import type { ServiceName } from "./service";

/**
 * Standard log levels.
 */
export type LogLevel =
  | "trace"
  | "debug"
  | "info"
  | "warn"
  | "error";

/**
 * A single log entry produced by the simulator.
 */
export interface LogEntry {
  /**
   * Unique log identifier.
   */
  id: string;

  /**
   * Related request.
   */
  requestId: string;

  /**
   * Creation timestamp.
   */
  timestamp: number;

  /**
   * Actual display time.
   */

  displayTime: string;

  /**
   * Severity.
   */
  level: LogLevel;

  /**
   * Backend service.
   */
  service: ServiceName;

  /**
   * Human-readable message.
   */
  message: string;

  /**
   * Endpoint being processed.
   */
  endpoint: string;

  /**
   * Time spent in this service.
   */
  duration: number;
}