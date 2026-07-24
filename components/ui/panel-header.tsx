"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeVariants } from "@/lib/animations/fade";
import { cn } from "@/lib/utils";

export interface PanelHeaderProps {
  /**
   * Main title.
   */
  title: string;

  /**
   * Small subtitle shown below the title.
   */
  subtitle?: string;

  /**
   * Right-side content.
   * Status badge, buttons, etc.
   */
  right?: ReactNode;

  /**
   * Draw bottom divider.
   */
  divider?: boolean;

  className?: string;
}

export function PanelHeader({
  title,
  subtitle,
  right,
  divider = true,
  className,
}: PanelHeaderProps) {
  return (
    <motion.header
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "hud-header",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h2 className="hud-title terminal-glow">
          {title}
        </h2>

        {subtitle && (
          <p className="hud-subtitle">
            {subtitle}
          </p>
        )}
      </div>

      {right && (
        <div className="flex items-center gap-3">
          {right}
        </div>
      )}

      {divider && (
        <div
          className="
            hud-divider
            absolute
            bottom-0
            left-0
            right-0
          "
        />
      )}
    </motion.header>
  );
}