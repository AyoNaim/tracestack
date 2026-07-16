// worker/core/scheduler.ts

export type SchedulerCallback = () => void;

export class Scheduler {
  private intervalId: number | null = null;

  private running = false;

  private paused = false;

  constructor(
    private readonly callback: SchedulerCallback,
    private readonly interval = 100
  ) {}

  start(): void {
    if (this.running) return;

    this.running = true;
    this.paused = false;

    this.intervalId = self.setInterval(() => {
      if (this.paused) return;

      this.callback();
    }, this.interval);
  }

  stop(): void {
    if (!this.running) return;

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }

    this.intervalId = null;

    this.running = false;

    this.paused = false;
  }

  pause(): void {
    if (!this.running) return;

    this.paused = true;
  }

  resume(): void {
    if (!this.running) return;

    this.paused = false;
  }

  isRunning(): boolean {
    return this.running;
  }

  isPaused(): boolean {
    return this.paused;
  }
}