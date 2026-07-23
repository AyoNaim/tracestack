// src/lib/animations/panel.ts

import type { Variants } from "framer-motion";

/**
 * Used by every dashboard panel.
 */
export const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: 12,

    transition: {
      duration: 0.2,
    },
  },
};