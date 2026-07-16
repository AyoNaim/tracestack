// workers/protocol/messages.ts

import type { WorkerCommand } from "./commands";
import type { WorkerEvent } from "./events";

export type WorkerIncomingMessage = WorkerCommand;

export type WorkerOutgoingMessage = WorkerEvent;