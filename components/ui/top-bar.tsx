"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { DeviceMode } from "@/hooks/use-device-mode";
import { getSceneDefaultZoom } from "@/lib/camera-config";
import { useAtlasStore } from "@/lib/store";

interface TopBarProps {
  deviceMode: DeviceMode;
}

const CONTROLS_HINT_STORAGE_KEY = "cosmic-atlas-controls-hint-dismissed";

export function TopBar({ deviceMode }: TopBarProps) {
  const mode = useAtlasStore((state) => state.mode);
  const setMode = useAtlasStore((state) => state.setMode);
  const startGuidedJourney = useAtlasStore((state) => state.startGuidedJourney);
  const resetView = useAtlasStore((state) => state.resetView);
  const activeScene = useAtlasStore((state) => state.activeScene);
  const focusObject = useAtlasStore((state) => state.focusObject);
  const simulationEnabled = useAtlasStore((state) => state.simulationEnabled);
  const isMobile = deviceMode === "mobile";
  const resetZoom = getSceneDefaultZoom(activeScene, deviceMode);
  const [showControlsHint, setShowControlsHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile) {
      return;
    }

    const dismissed = window.localStorage.getItem(CONTROLS_HINT_STORAGE_KEY) === "true";
    if (!dismissed) {
      setShowControlsHint(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (typeof window === "undefined" || !showControlsHint) {
      return;
    }

    const dismiss = () => {
      setShowControlsHint(false);
      window.localStorage.setItem(CONTROLS_HINT_STORAGE_KEY, "true");
    };

    const timer = window.setTimeout(dismiss, 7000);
    const interactionEvents: Array<keyof WindowEventMap> = ["wheel", "pointerdown", "touchstart", "keydown"];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, dismiss, { passive: true, once: true });
    });

    return () => {
      window.clearTimeout(timer);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, dismiss);
      });
    };
  }, [showControlsHint]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        isMobile
          ? "pointer-events-none absolute left-0 top-0 z-20 flex w-full flex-col gap-3 p-4"
          : "pointer-events-none absolute left-0 top-0 z-20 flex w-full items-start justify-between gap-4 p-4 sm:p-6"
      }
    >
      <div className="pointer-events-auto glass-panel-soft max-w-[23rem] rounded-[2rem] px-4 py-3 sm:px-5">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/55 sm:text-xs sm:tracking-[0.45em]">
          Cinematic Universe Map
        </p>
        <h1 className="mt-2 font-display text-2xl text-gradient sm:text-[3rem] sm:leading-none">Cosmic Atlas</h1>
        {!isMobile ? (
          <>
            <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/68">
              Scene-based exploration with local zoom and orbit controls.
            </p>
            <motion.div
              initial={false}
              animate={{
                height: showControlsHint ? "auto" : 0,
                opacity: showControlsHint ? 1 : 0,
                marginTop: showControlsHint ? 16 : 0
              }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-white/42">
                  <span>Scroll: Zoom</span>
                  <span>Drag: Orbit</span>
                  <span>Right-drag: Pan</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowControlsHint(false);
                    window.localStorage.setItem(CONTROLS_HINT_STORAGE_KEY, "true");
                  }}
                  className="text-[10px] uppercase tracking-[0.18em] text-white/38 transition hover:text-white/68"
                >
                  Hide
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          <p className="mt-2 text-xs leading-5 text-white/68">
            Touch-first universe navigation with compact scene controls.
          </p>
        )}
      </div>

      <div className={isMobile ? "pointer-events-auto self-end" : "pointer-events-auto flex items-start"}>
        <div
          className={
            isMobile
              ? "grid grid-cols-2 gap-2"
              : "flex min-w-[18rem] flex-col items-end gap-2"
          }
        >
          <div
            className={
              isMobile
                ? "grid grid-cols-2 gap-2"
                : "glass-panel-soft flex flex-wrap justify-end gap-2 rounded-full px-2 py-2"
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

          {!isMobile ? (
            <div className="inline-flex items-center gap-2 pr-2 text-[10px] uppercase tracking-[0.22em] text-aurora/88">
              <span className="h-2 w-2 rounded-full bg-aurora shadow-[0_0_14px_currentColor]" />
              {simulationEnabled ? "Ambient Simulation" : "Simulation Paused"}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
