// workers/simulation/message-generator.ts

import type { LogEntry, LogLevel } from "@/workers/types/log";
import type { ServiceEvent } from "@/workers/types/service";

export class MessageGenerator {
  /**
   * Convert service events into log entries.
   */
  public generate(events: ServiceEvent[]): LogEntry[] {
    return events.map((event) => ({
      id: crypto.randomUUID(),

      requestId: event.requestId,

      timestamp: event.timestamp,

      level: this.resolveLevel(event),

      service: event.service,

      message: this.resolveMessage(event),

      endpoint: event.endpoint,

      duration: event.duration,
    }));
  }

  /**
   * Determine log level.
   */
  private resolveLevel(event: ServiceEvent): LogLevel {
    switch (event.status) {
      case "success":
        return "info";

      case "warning":
        return "warn";

      case "error":
        return "error";
    }
  }

  /**
   * Create a realistic log message.
   */
  private resolveMessage(event: ServiceEvent): string {
    switch (event.service) {
      case "gateway":
        return "Request accepted by API Gateway.";

      case "auth":
        return "User authentication completed.";

      case "rate-limiter":
        return "Rate limit verification completed.";

      case "cache":
        return "Cache lookup completed.";

      case "users":
        return "User profile loaded.";

      case "products":
        return "Product catalog queried.";

      case "orders":
        return "Order processing completed.";

      case "inventory":
        return "Inventory availability checked.";

      case "payments":
        return "Payment transaction processed.";

      case "notifications":
        return "Notification dispatched.";

      case "database":
        return "Database query executed.";
    }
  }
}