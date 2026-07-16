/// <reference lib="webworker" />

import { Dispatcher } from "./core/dispatcher";
import { WorkerEngine } from "./core/engine";
import type { WorkerCommand } from "./protocol/commands";


const workerScope = self as DedicatedWorkerGlobalScope;
const engine = new WorkerEngine(workerScope);
const dispatcher = new Dispatcher(engine)

self.addEventListener("message", (event: MessageEvent<WorkerCommand>) => {
  dispatcher.dispatch(event.data);
});

engine.ready();