"use client";

// ui/grid-background.tsx

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { fadeVariants } from "@/lib/animations/fade";
import { cn } from "@/lib/utils";

export interface GridBackgroundProps
  extends HTMLMotionProps<"div"> {
  /**
   * Animate on mount.
   */
  animated?: boolean;

  /**
   * Enable glowing scan lines.
   */
  scanlines?: boolean;

  /**
   * Fade the grid toward the bottom.
   */
  fade?: boolean;

  /**
   * Grid cell size in pixels.
   */
  size?: number;
}

export function GridBackground({
  animated = true,
  scanlines = true,
  fade = true,
  size = 40,
  className,
  style,
  ...props
}: GridBackgroundProps) {
  return (
    <motion.div
      variants={animated ? fadeVariants : undefined}
      initial={animated ? "hidden" : false}
      animate={animated ? "visible" : false}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        ...style,

        backgroundImage: `
          linear-gradient(
            rgba(0,255,255,.08) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(0,255,255,.08) 1px,
            transparent 1px
          )
        `,

        backgroundSize: `${size}px ${size}px`,
      }}
      {...props}
    >
      {/* Vertical scan lines */}

      {scanlines && (
        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            animate-grid-scan
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "100% 4px",
          }}
        />
      )}

      {/* Bottom fade */}

      {fade && (
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-transparent
            via-transparent
            to-[var(--color-background)]
          "
        />
      )}

      {/* Ambient radial glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-20
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, var(--color-primary), transparent 70%)",
        }}
      />
    </motion.div>
  );
}