// src/types/service.ts

/**
 * All backend services that a request can visit.
 */
export type ServiceName =
  | "gateway"
  | "auth"
  | "rate-limiter"
  | "cache"
  | "users"
  | "products"
  | "orders"
  | "inventory"
  | "payments"
  | "notifications"
  | "database";

/**
 * Result of processing inside a service.
 */
export type ServiceStatus =
  | "success"
  | "warning"
  | "error";

/**
 * Represents one request passing through one backend service.
 *
 * Example:
 * POST /api/orders
 *
 * Gateway
 * ↓
 * Auth
 * ↓
 * Inventory
 *
 * would generate three ServiceEvents.
 */
export interface ServiceEvent {
  /**
   * The request this event belongs to.
   */
  requestId: string;

  /**
   * Timestamp of the service event.
   */
  timestamp: number;

  /**
   * Which backend service handled the request.
   */
  service: ServiceName;

  /**
   * Endpoint being processed.
   */
  endpoint: string;

  /**
   * Time spent inside this service.
   */
  duration: number;

  /**
   * Processing result.
   */
  status: ServiceStatus;
}