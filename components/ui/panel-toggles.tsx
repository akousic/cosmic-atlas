"use client";

import { motion } from "framer-motion";

import { DeviceMode } from "@/hooks/use-device-mode";
import { useAtlasStore } from "@/lib/store";

interface PanelTogglesProps {
  deviceMode: DeviceMode;
}

export function PanelToggles({ deviceMode }: PanelTogglesProps) {
  const showInfoPanel = useAtlasStore((state) => state.showInfoPanel);
  const toggleInfoPanel = useAtlasStore((state) => state.toggleInfoPanel);
  const isMobile = deviceMode === "mobile";

  return (
    <>
      {!showInfoPanel ? (
        <motion.button
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          className={
            isMobile
              ? "control-button pointer-events-auto absolute bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] right-3 z-20 rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] text-white/80"
              : "control-button pointer-events-auto absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/75"
          }
          onClick={toggleInfoPanel}
        >
          Show Details
        </motion.button>
      ) : null}
    </>
  );
}
