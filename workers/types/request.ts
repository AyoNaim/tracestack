// src/types/request.ts

/**
 * Supported HTTP methods used by the simulator.
 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

/**
 * Geographic region the request originates from.
 */
export type Region =
  | "us-east-1"
  | "us-west-2"
  | "eu-west-1"
  | "eu-central-1"
  | "ap-southeast-1";

/**
 * Priority of the request.
 */
export type RequestPriority =
  | "low"
  | "normal"
  | "high";

/**
 * A simulated incoming backend request.
 *
 * This is the very first object produced inside the worker.
 * Everything else (services, logs, metrics)
 * is derived from this.
 */
export interface Request {
  /**
   * Unique request identifier.
   */
  id: string;

  /**
   * Unix timestamp (milliseconds).
   */
  timestamp: number;

  /**
   * HTTP Method.
   */
  method: HttpMethod;

  /**
   * Example:
   * /api/orders
   */
  endpoint: string;

  /**
   * Simulated authenticated user.
   */
  userId: string;

  /**
   * Origin region.
   */
  region: Region;

  /**
   * Client IP.
   */
  ipAddress: string;

  /**
   * Browser information.
   */
  userAgent: string;

  /**
   * Request payload size in bytes.
   */
  payloadSize: number;

  /**
   * Expected backend latency.
   *
   * Actual latency may differ later.
   */
  expectedLatency: number;

  /**
   * Scheduling priority.
   */
  priority: RequestPriority;
}