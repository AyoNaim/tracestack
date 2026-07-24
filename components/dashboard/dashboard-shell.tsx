"use client";

// components/dashboard/dashboard-shell.tsx

import { useEffect } from "react";

import { initializeWorker } from "@/workers/worker-bootstrap";

import { GridBackground } from "@/components/ui/grid-background";

import { TopToolbar } from "./toolbar/top-toolbar";
import { SearchBar } from "./toolbar/search-bar";
import { MetricsGrid } from "./metrics/metrics-grid";
import { LogTable } from "./logs/log-table";
import { FooterStats } from "./footer/footer-stats";

export function DashboardShell() {
  /*
   * Boot the worker exactly once.
   */
  useEffect(() => {
    const dispose = initializeWorker();

    return dispose;
  }, []);

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--color-background)]
      "
    >
      {/* Animated cyber grid */}

      <GridBackground
        size={56}
        className="
          absolute
          inset-0
          opacity-20
        "
      />

      {/* Ambient vignette */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,.72)_100%)]
        "
      />

      {/* Atmospheric top glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0

          h-52

          bg-[radial-gradient(circle_at_top,rgba(0,255,255,.10),transparent_72%)]
        "
      />

      {/* Dashboard */}

      <div
        className="
          relative
          z-10

          mx-auto

          flex
          min-h-screen
          max-w-[1800px]
          flex-col

          gap-6

          px-8
          py-8
        "
      >
        {/* Command Console */}

        <header className="shrink-0">
          <TopToolbar />
        </header>

        {/* Search Terminal */}

        <section className="shrink-0">
          <SearchBar />
        </section>

        {/* Metrics */}

        <section className="shrink-0">
          <MetricsGrid />
        </section>

        {/* Live Telemetry */}

        <section
          className="
            min-h-0
            flex-1
          "
        >
          <LogTable />
        </section>

        {/* Status Bar */}

        <footer
          className="
            shrink-0
            pt-2
          "
        >
          <FooterStats />
        </footer>
      </div>
    </main>
  );
}