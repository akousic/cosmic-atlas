"use client";

import { motion } from "framer-motion";

import { useAtlasStore } from "@/lib/store";

export function PanelToggles() {
  const showInfoPanel = useAtlasStore((state) => state.showInfoPanel);
  const toggleInfoPanel = useAtlasStore((state) => state.toggleInfoPanel);

  return (
    <>
      {!showInfoPanel ? (
        <motion.button
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          className="control-button pointer-events-auto absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/75"
          onClick={toggleInfoPanel}
        >
          Show Details
        </motion.button>
      ) : null}
    </>
  );
}
