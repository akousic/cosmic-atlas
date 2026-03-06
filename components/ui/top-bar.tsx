"use client";

import { motion } from "framer-motion";

import { useAtlasStore } from "@/lib/store";

export function TopBar() {
  const mode = useAtlasStore((state) => state.mode);
  const setMode = useAtlasStore((state) => state.setMode);
  const startGuidedJourney = useAtlasStore((state) => state.startGuidedJourney);
  const resetView = useAtlasStore((state) => state.resetView);
  const focusObject = useAtlasStore((state) => state.focusObject);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none absolute left-0 top-0 z-20 flex w-full items-start justify-between p-6"
    >
      <div className="pointer-events-auto glass-panel max-w-md rounded-3xl px-5 py-4">
        <p className="text-xs uppercase tracking-[0.45em] text-white/55">Cinematic Universe Map</p>
        <h1 className="mt-2 font-display text-4xl text-gradient">Cosmic Atlas</h1>
        <p className="mt-2 text-sm text-white/70">
          Explicit scene navigation with local zoom and orbit controls inside each scale.
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/48">
          Scroll or pinch to zoom • Drag to orbit • Right-drag to pan • Click to dive in
        </p>
      </div>

      <div className="pointer-events-auto flex max-w-xl items-start">
        <div className="flex flex-wrap justify-end gap-3">
          <button className="control-button rounded-full px-4 py-2 text-sm" onClick={() => setMode("explore")}>
            Explore Mode{mode === "explore" ? " •" : ""}
          </button>
          <button className="control-button rounded-full px-4 py-2 text-sm" onClick={startGuidedJourney}>
            Guided Journey{mode === "guided" ? " •" : ""}
          </button>
          <button
            className="control-button rounded-full px-4 py-2 text-sm"
            onClick={() => {
              setMode("explore");
              focusObject("earth");
            }}
          >
            Back to Earth
          </button>
          <button className="control-button rounded-full px-4 py-2 text-sm" onClick={resetView}>
            Reset View
          </button>
        </div>
      </div>
    </motion.div>
  );
}
