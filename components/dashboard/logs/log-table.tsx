"use client";

// components/dashboard/log-table.tsx

import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { Panel } from "@/components/ui/panel";
import { TerminalText } from "@/components/ui/terminal-text";
import { HudDivider } from "@/components/ui/hud-divider";

import { useLogStore } from "@/stores/log-store";

import { LogRow } from "./log-row";

const ROW_HEIGHT = 36;

export function LogTable() {
  const parentRef = useRef<HTMLDivElement>(null);

  /**
   * Subscribe only to the log array.
   */
  const logs = useLogStore((state) => state.logs);

  /**
   * React Virtual
   */
  const virtualizer = useVirtualizer({
    count: logs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 20,
  });

  const virtualRows = virtualizer.getVirtualItems();

  const totalHeight = virtualizer.getTotalSize();

  /**
   * Empty state
   */
  const isEmpty = useMemo(
    () => logs.length === 0,
    [logs.length]
  );

  return (
    <Panel className="flex h-full flex-col overflow-hidden">
      {/* Header */}

      <div className="px-5 py-4">
        <div className="grid grid-cols-[160px_120px_1fr_160px] gap-4">
          <TerminalText size="xs">
            Timestamp
          </TerminalText>

          <TerminalText size="xs">
            Level
          </TerminalText>

          <TerminalText size="xs">
            Message
          </TerminalText>

          <TerminalText size="xs">
            Service
          </TerminalText>
        </div>
      </div>

      <HudDivider />

      {/* Empty */}

      {isEmpty && (
        <div className="flex flex-1 items-center justify-center">
          <TerminalText
            size="sm"
            dim
          >
            Waiting for telemetry stream...
          </TerminalText>
        </div>
      )}

      {/* Virtualized rows */}

      {!isEmpty && (
        <div
          ref={parentRef}
          className="
            flex-1
            overflow-auto
            scrollbar-thin
          "
        >
          <div
            style={{
              height: totalHeight,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualRows.map((virtualRow) => {
              const log = logs[virtualRow.index];

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <LogRow log={log} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Panel>
  );
}