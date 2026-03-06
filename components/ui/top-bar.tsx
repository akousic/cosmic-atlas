"use client";

import { motion } from "framer-motion";

import { getSceneDefaultZoom } from "@/lib/camera-config";
import { useAtlasStore } from "@/lib/store";
import { DeviceMode } from "@/hooks/use-device-mode";

interface TopBarProps {
  deviceMode: DeviceMode;
}

export function TopBar({ deviceMode }: TopBarProps) {
  const mode = useAtlasStore((state) => state.mode);
  const setMode = useAtlasStore((state) => state.setMode);
  const startGuidedJourney = useAtlasStore((state) => state.startGuidedJourney);
  const resetView = useAtlasStore((state) => state.resetView);
  const activeScene = useAtlasStore((state) => state.activeScene);
  const focusObject = useAtlasStore((state) => state.focusObject);
  const isMobile = deviceMode === "mobile";
  const resetZoom = getSceneDefaultZoom(activeScene, deviceMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        isMobile
          ? "pointer-events-none absolute left-0 top-0 z-20 flex w-full flex-col gap-3 p-4"
          : "pointer-events-none absolute left-0 top-0 z-20 flex w-full items-start justify-between p-4 sm:p-6"
      }
    >
      <div className="pointer-events-auto glass-panel max-w-md rounded-3xl px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/55 sm:text-xs sm:tracking-[0.45em]">
          Cinematic Universe Map
        </p>
        <h1 className="mt-2 font-display text-2xl text-gradient sm:text-4xl">Cosmic Atlas</h1>
        {!isMobile ? (
          <>
            <p className="mt-2 text-sm text-white/70">
              Explicit scene navigation with local zoom and orbit controls inside each scale.
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/48">
              Scroll or pinch to zoom • Drag to orbit • Right-drag to pan • Click to dive in
            </p>
          </>
        ) : (
          <p className="mt-2 text-xs leading-5 text-white/68">
            Touch-first universe navigation with scene buttons, local zoom, and compact details.
          </p>
        )}
      </div>

      <div className={isMobile ? "pointer-events-auto self-end" : "pointer-events-auto flex max-w-xl items-start"}>
        <div
          className={
            isMobile
              ? "grid grid-cols-2 gap-2"
              : "flex max-w-[18rem] flex-wrap justify-end gap-2 sm:max-w-none sm:gap-3"
          }
        >
          <button
            className="control-button rounded-full px-3 py-2 text-xs sm:px-4 sm:text-sm"
            onClick={() => setMode("explore")}
          >
            Explore{mode === "explore" ? " •" : ""}
          </button>
          <button
            className="control-button rounded-full px-3 py-2 text-xs sm:px-4 sm:text-sm"
            onClick={startGuidedJourney}
          >
            Guide{mode === "guided" ? " •" : ""}
          </button>
          <button
            className="control-button rounded-full px-3 py-2 text-xs sm:px-4 sm:text-sm"
            onClick={() => {
              setMode("explore");
              focusObject("earth");
            }}
          >
            Earth
          </button>
          <button
            className="control-button rounded-full px-3 py-2 text-xs sm:px-4 sm:text-sm"
            onClick={() => resetView(resetZoom)}
          >
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}
