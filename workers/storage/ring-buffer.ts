// workers/storage/ring-buffer.ts

import type { LogEntry } from "@/workers/types/log";

export class RingBuffer {
  /**
   * Internal storage.
   */
  private readonly buffer: Array<LogEntry | undefined>;

  /**
   * Maximum number of logs.
   */
  private readonly capacity: number;

  /**
   * Next write position.
   */
  private writeIndex = 0;

  /**
   * Number of valid entries.
   */
  private length = 0;

  constructor(capacity = 100_000) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  /**
   * Add one log entry.
   */
  public push(log: LogEntry): void {
    this.buffer[this.writeIndex] = log;

    this.writeIndex = (this.writeIndex + 1) % this.capacity;

    if (this.length < this.capacity) {
      this.length++;
    }
  }

  /**
   * Add many log entries.
   */
  public pushMany(logs: LogEntry[]): void {
    for (const log of logs) {
      this.push(log);
    }
  }

  /**
   * Return all logs in chronological order.
   */
  public getAll(): LogEntry[] {
    if (this.length === 0) {
      return [];
    }

    if (this.length < this.capacity) {
      return this.buffer
        .slice(0, this.length)
        .filter((entry): entry is LogEntry => entry !== undefined);
    }

    return [
      ...this.buffer.slice(this.writeIndex),
      ...this.buffer.slice(0, this.writeIndex),
    ].filter((entry): entry is LogEntry => entry !== undefined);
  }

  /**
   * Current number of logs stored.
   */
  public size(): number {
    return this.length;
  }

  /**
   * Maximum capacity.
   */
  public maxSize(): number {
    return this.capacity;
  }

  /**
   * Is the buffer full?
   */
  public isFull(): boolean {
    return this.length === this.capacity;
  }

  /**
   * Remove all logs.
   */
  public clear(): void {
    this.buffer.fill(undefined);

    this.writeIndex = 0;
    this.length = 0;
  }
}