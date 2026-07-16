import type {
  HttpMethod,
  Region,
  Request,
  RequestPriority,
} from "../types/request";

export class RequestGenerator {
  private readonly methods: HttpMethod[] = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ];

  private readonly endpoints = [
    "/api/auth/login",
    "/api/auth/logout",
    "/api/orders",
    "/api/orders/:id",
    "/api/products",
    "/api/products/:id",
    "/api/search",
    "/api/users",
    "/api/payments",
    "/api/upload",
  ];

  private readonly regions: Region[] = [
    "us-east-1",
    "us-west-2",
    "eu-west-1",
    "eu-central-1",
    "ap-southeast-1",
  ];

  private readonly priorities: RequestPriority[] = [
    "low",
    "normal",
    "high",
  ];

  private readonly userAgents = [
    "Chrome",
    "Firefox",
    "Safari",
    "Edge",
    "Mobile Safari",
  ];

  generate(count: number): Request[] {
    const requests: Request[] = [];

    for (let i = 0; i < count; i++) {
      requests.push(this.createRequest());
    }

    return requests;
  }

  private createRequest(): Request {
    return {
      id: crypto.randomUUID(),

      timestamp: Date.now(),

      method: this.pick(this.methods),

      endpoint: this.pick(this.endpoints),

      userId: `user-${this.randomInt(1, 5000)}`,

      region: this.pick(this.regions),

      ipAddress: this.randomIp(),

      userAgent: this.pick(this.userAgents),

      payloadSize: this.randomInt(256, 16384),

      expectedLatency: this.randomInt(20, 800),

      priority: this.pick(this.priorities),
    };
  }

  private pick<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomIp(): string {
    return `${this.randomInt(1, 255)}.${this.randomInt(0, 255)}.${this.randomInt(
      0,
      255
    )}.${this.randomInt(1, 255)}`;
  }
}