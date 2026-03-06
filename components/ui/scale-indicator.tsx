"use client";

import clsx from "clsx";

import { SCENE_LABELS, SCENE_ORDER, SCENE_TARGETS } from "@/lib/constants";
import { useAtlasStore } from "@/lib/store";

export function ScaleIndicator() {
  const activeScene = useAtlasStore((state) => state.activeScene);
  const focusObject = useAtlasStore((state) => state.focusObject);
  const setMode = useAtlasStore((state) => state.setMode);

  return (
    <div className="absolute bottom-6 left-1/2 z-20 w-[min(68rem,calc(100vw-2rem))] -translate-x-1/2">
      <div className="glass-panel rounded-full px-3 py-3">
        <div className="grid grid-cols-6 gap-1 text-center text-[10px] uppercase tracking-[0.22em] text-white/55 sm:gap-2 sm:text-[11px] sm:tracking-[0.28em]">
          {SCENE_ORDER.map((scene) => (
            <button
              key={scene}
              type="button"
              onClick={() => {
                setMode("explore");
                focusObject(SCENE_TARGETS[scene]);
              }}
              className={clsx(
                "rounded-full px-2 py-2 leading-tight whitespace-nowrap transition sm:px-3",
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
