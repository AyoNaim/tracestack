// src/lib/animations/hud.ts

import type { Variants } from "framer-motion";

/**
 * Small HUD controls.
 * Buttons
 * Status badges
 * Toolbar items
 */
export const hudVariants: Variants = {
  idle: {
    scale: 1,
    opacity: 1,
  },

  hover: {
    scale: 1.03,

    transition: {
      duration: 0.15,
    },
  },

  tap: {
    scale: 0.97,

    transition: {
      duration: 0.08,
    },
  },
};