// workers/simulation/service-pipeline.ts

import type { Request } from "../types/request";
import type {
  ServiceEvent,
  ServiceName,
} from "../types/service";

export class ServicePipeline {
  /**
   * Process incoming requests through
   * the simulated backend.
   */
  public process(requests: Request[]): ServiceEvent[] {
    const events: ServiceEvent[] = [];

    for (const request of requests) {
      const services = this.resolveServices(request.endpoint);

      for (const service of services) {
        events.push({
          requestId: request.id,

          timestamp: Date.now(),

          service,

          endpoint: request.endpoint,

          duration: this.randomDuration(),

          status: "success",
        });
      }
    }

    return events;
  }

  /**
   * Determine which services
   * are involved for an endpoint.
   */
  private resolveServices(endpoint: string): ServiceName[] {
    if (endpoint.startsWith("/api/auth")) {
      return [
        "gateway",
        "auth",
        "database",
      ];
    }

    if (endpoint.startsWith("/api/orders")) {
      return [
        "gateway",
        "auth",
        "inventory",
        "orders",
        "payments",
        "database",
      ];
    }

    if (endpoint.startsWith("/api/products")) {
      return [
        "gateway",
        "cache",
        "products",
        "database",
      ];
    }

    if (endpoint.startsWith("/api/users")) {
      return [
        "gateway",
        "auth",
        "users",
        "database",
      ];
    }

    if (endpoint.startsWith("/api/payments")) {
      return [
        "gateway",
        "auth",
        "payments",
        "database",
      ];
    }

    return [
      "gateway",
      "database",
    ];
  }

  /**
   * Simulated processing time.
   */
  private randomDuration(): number {
    return Math.floor(Math.random() * 50) + 5;
  }
}