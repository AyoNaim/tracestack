// workers/core/dispatcher.ts

import type { WorkerCommand } from "../protocol/commands";
import { WorkerEngine } from "./engine";

export class Dispatcher {
  constructor(private readonly engine: WorkerEngine) {}

  dispatch(command: WorkerCommand): void {
    switch (command.type) {
      case "INIT":
        this.engine.ready();
        break;

      case "START":
        this.engine.start();
        break;

      case "STOP":
        this.engine.stop();
        break;

      case "PAUSE":
        this.engine.pause();
        break;

      case "RESUME":
        this.engine.resume();
        break;

      case "RESET":
        this.engine.reset();
        break;

      case "SET_RATE":
        this.engine.setRate(command.payload);
        break;

      case "SET_FILTER":
        this.engine.setFilter(command.payload);
        break;

      case "SET_SORT":
        this.engine.setSort(command.payload);
        break;

      default: {
        const exhaustiveCheck: never = command;
        return exhaustiveCheck;
      }
    }
  }
}