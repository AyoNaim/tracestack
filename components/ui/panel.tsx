"use client";

import { motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { panelVariants } from "@/lib/animations/panel";
import type { HTMLMotionProps } from "framer-motion";

export interface PanelProps
  extends Omit<HTMLMotionProps<"section">, "children"> {
  animated?: boolean;

  glow?: boolean;

  hover?: boolean;

  corners?: boolean;

  reflection?: boolean;

  children: ReactNode;
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      animated = true,
      glow = true,
      hover = true,
      corners = true,
      reflection = true,
      className,
      children,
      ...props
    },
    ref
  ) => {

    return (
    <motion.section
      ref={ref}
      variants={animated ? panelVariants : {}}
      initial={animated ? "hidden" : false}
      animate={animated ? "visible" : false}
      exit={animated ? "exit" : undefined}
      className={cn(
        "hud-panel",
        hover && "hud-panel-hover",
        glow && "panel-glow",
        corners && "hud-corners",
        reflection && "panel-reflection",
        "relative isolate",
        className
      )}
      {...props}
    >
        {/* Top neon strip */}

        <div className="panel-highlight absolute inset-x-0 top-0 h-px" />

        {/* Ambient overlay */}

        <div className="hud-overlay absolute inset-0 pointer-events-none" />

        {/* Actual content */}

        <div className="relative z-10">
          {children}
        </div>
      </motion.section>
    );
  }
);

Panel.displayName = "Panel";