"use client";

import clsx from "clsx";

import { getSceneDefaultZoom } from "@/lib/camera-config";
import { SCENE_LABELS, SCENE_ORDER, SCENE_TARGETS } from "@/lib/constants";
import { useAtlasStore } from "@/lib/store";
import { DeviceMode } from "@/hooks/use-device-mode";

interface ScaleIndicatorProps {
  deviceMode: DeviceMode;
}

export function ScaleIndicator({ deviceMode }: ScaleIndicatorProps) {
  const activeScene = useAtlasStore((state) => state.activeScene);
  const focusObject = useAtlasStore((state) => state.focusObject);
  const focusScene = useAtlasStore((state) => state.focusScene);
  const setMode = useAtlasStore((state) => state.setMode);
  const isMobile = deviceMode === "mobile";

  return (
    <div
      className={
        isMobile
          ? "absolute bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-20 w-[calc(100vw-1rem)] -translate-x-1/2"
          : "absolute bottom-6 left-1/2 z-20 w-[min(68rem,calc(100vw-2rem))] -translate-x-1/2"
      }
    >
      <div className={clsx("glass-panel", isMobile ? "rounded-[1.6rem] px-2 py-2" : "rounded-full px-3 py-3")}>
        <div
          className={clsx(
            isMobile
              ? "flex gap-2 overflow-x-auto px-1 text-center text-[10px] uppercase tracking-[0.18em] text-white/60"
              : "grid grid-cols-6 gap-1 text-center text-[10px] uppercase tracking-[0.22em] text-white/55 sm:gap-2 sm:text-[11px] sm:tracking-[0.28em]"
          )}
        >
          {SCENE_ORDER.map((scene) => (
            <button
              key={scene}
              type="button"
              onClick={() => {
                setMode("explore");
                if (isMobile) {
                  focusScene(scene, getSceneDefaultZoom(scene, deviceMode));
                  return;
                }
                focusObject(SCENE_TARGETS[scene]);
              }}
              className={clsx(
                "rounded-full leading-tight whitespace-nowrap transition",
                isMobile ? "min-w-max px-3 py-3 text-[10px]" : "px-2 py-2 sm:px-3",
                "cursor-pointer hover:bg-white/8 hover:text-white",
                scene === activeScene ? "bg-white/12 text-white" : "bg-transparent text-white/45"
              )}
            >
              {SCENE_LABELS[scene]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
