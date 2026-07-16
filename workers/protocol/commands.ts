// workers/protocol/commands.ts
// UI → Worker

import type {
  FilterPayload,
  SortPayload,
  ThroughputMode,
} from "./types";

export interface InitCommand {
  type: "INIT";
}

export interface StartCommand {
  type: "START";
}

export interface StopCommand {
  type: "STOP";
}

export interface PauseCommand {
  type: "PAUSE";
}

export interface ResumeCommand {
  type: "RESUME";
}

export interface ResetCommand {
  type: "RESET";
}

export interface SetRateCommand {
  type: "SET_RATE";
  payload: ThroughputMode;
}

export interface SetFilterCommand {
  type: "SET_FILTER";
  payload: FilterPayload;
}

export interface SetSortCommand {
  type: "SET_SORT";
  payload: SortPayload;
}

export type WorkerCommand =
  | InitCommand
  | StartCommand
  | StopCommand
  | PauseCommand
  | ResumeCommand
  | ResetCommand
  | SetRateCommand
  | SetFilterCommand
  | SetSortCommand;