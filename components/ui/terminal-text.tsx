"use client";

import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";

import { fadeVariants } from "@/lib/animations/fade";
import { cn } from "@/lib/utils";

type TerminalTextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg";

export interface TerminalTextProps
  extends HTMLMotionProps<"span"> {
  children: ReactNode;

  size?: TerminalTextSize;

  glow?: boolean;

  uppercase?: boolean;

  animated?: boolean;

  dim?: boolean;
}

const SIZE_CLASSES: Record<TerminalTextSize, string> = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function TerminalText({
  children,
  className,
  size = "sm",
  glow = true,
  uppercase = true,
  animated = false,
  dim = false,
  ...props
}: TerminalTextProps) {
  const classes = cn(
    "font-mono",
    "tracking-[0.22em]",
    "select-none",
    uppercase && "uppercase",
    glow && "terminal-glow",
    dim
      ? "text-[var(--color-text-muted)]"
      : "text-[var(--color-primary)]",
    SIZE_CLASSES[size],
    className
  );

  if (!animated) {
    return (
      <motion.span
        className={classes}
        {...props}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes}
      {...props}
    >
      {children}
    </motion.span>
  );
}