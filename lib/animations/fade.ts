// lib/animations/fade.ts

import type { Variants } from "framer-motion";

/**
 * Generic fade animation.
 * Used for lightweight UI elements.
 */
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,

    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};