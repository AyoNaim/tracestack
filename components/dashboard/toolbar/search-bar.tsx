"use client";

// components/dashboard/search-bar.tsx

import { useEffect, useMemo, useState } from "react";
import { Search, Terminal } from "lucide-react";

import { workerManager } from "@/lib/workers/worker-manager";

import { Panel } from "@/components/ui/panel";
import { HudDivider } from "@/components/ui/hud-divider";
import { TerminalText } from "@/components/ui/terminal-text";

function useDebouncedValue<T>(
  value: T,
  delay: number,
): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function SearchBar() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    workerManager.setFilter({
      search: debouncedQuery,
    });
  }, [debouncedQuery]);

  const placeholder = useMemo(
    () =>
      "Search logs, request ids, services, endpoints...",
    []
  );

  return (
    <Panel className="space-y-4">
      <TerminalText size="sm">
        Search Terminal
      </TerminalText>

      <HudDivider />

      <div
        className="
          relative
          overflow-hidden
          rounded-md

          border
          border-[var(--color-border)]

          bg-[rgba(8,14,20,.92)]

          transition-colors
          duration-200

          focus-within:border-cyan-400
          focus-within:shadow-[0_0_18px_rgba(34,211,238,.20)]
        "
      >
        {/* Scanline */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0

            h-px

            bg-cyan-400/40
          "
        />

        {/* Prompt */}

        <div
          className="
            flex
            items-center
            gap-3

            px-4
            py-3
          "
        >
          <Terminal
            size={16}
            className="text-cyan-400"
          />

          <span
            className="
              font-mono
              text-cyan-300
              tracking-[0.15em]
            "
          >
            &gt;
          </span>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            placeholder={placeholder}
            className="
              flex-1

              bg-transparent

              font-mono
              text-sm
              tracking-[0.06em]

              text-cyan-100
              placeholder:text-slate-500

              outline-none
            "
          />

          <Search
            size={16}
            className="
              shrink-0
              text-cyan-400/60
            "
          />
        </div>

        {/* Animated bottom glow */}

        <div
          className="
            pointer-events-none

            absolute
            bottom-0
            left-0

            h-px
            w-full

            bg-gradient-to-r
            from-transparent
            via-cyan-400
            to-transparent

            opacity-50
          "
        />
      </div>

      <TerminalText
        size="xs"
        glow={false}
        dim
      >
        Worker-side indexed search · React never filters telemetry.
      </TerminalText>
    </Panel>
  );
}