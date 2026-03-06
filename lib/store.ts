"use client";

import { create } from "zustand";

import { GUIDED_STEPS, SCENE_TARGETS } from "@/lib/constants";
import { objectById } from "@/lib/catalog";
import { clamp } from "@/lib/scale";
import { getSolarObjectPosition } from "@/lib/solar-layout";
import { SceneId } from "@/lib/types";

type ExploreMode = "explore" | "guided";

interface AtlasState {
  started: boolean;
  mode: ExploreMode;
  zoom: number;
  targetZoom: number;
  pan: [number, number];
  targetPan: [number, number];
  focus: [number, number, number];
  targetFocus: [number, number, number];
  activeScene: SceneId;
  selectedId: string;
  hoveredId: string | null;
  guidedIndex: number;
  showInfoPanel: boolean;
  start: () => void;
  setMode: (mode: ExploreMode) => void;
  nudgeZoom: (delta: number) => void;
  setZoomTarget: (value: number) => void;
  setPanTarget: (pan: [number, number]) => void;
  syncViewport: (focus: [number, number, number], zoom: number) => void;
  setHovered: (id: string | null) => void;
  focusObject: (id: string) => void;
  toggleInfoPanel: () => void;
  resetView: () => void;
  startGuidedJourney: () => void;
  stopGuidedJourney: () => void;
  advanceGuidedJourney: () => void;
}

const DEFAULT_SELECTION = "earth";

function getFocusPosition(id: string) {
  const object = objectById[id];
  if (!object) {
    return [0, 0, 0] as [number, number, number];
  }

  return object.scene === "solar" ? getSolarObjectPosition(object as never) : object.position;
}

export const useAtlasStore = create<AtlasState>((set, get) => ({
  started: false,
  mode: "explore",
  zoom: 0.08,
  targetZoom: 0.08,
  pan: [0, 0],
  targetPan: [0, 0],
  focus: [0, 0, 0],
  targetFocus: [0, 0, 0],
  activeScene: "planet",
  selectedId: DEFAULT_SELECTION,
  hoveredId: null,
  guidedIndex: 0,
  showInfoPanel: true,
  start: () => set({ started: true }),
  setMode: (mode) => set({ mode }),
  nudgeZoom: (delta) => {
    const next = clamp(get().targetZoom + delta, 0.02, 1);
    set({ targetZoom: next });
  },
  setZoomTarget: (value) => {
    const next = clamp(value, 0.02, 1);
    set({ targetZoom: next });
  },
  setPanTarget: (pan) => set({ targetPan: pan }),
  syncViewport: (focus, zoom) =>
    set({
      zoom,
      focus,
      pan: [0, 0]
    }),
  setHovered: (id) => set({ hoveredId: id }),
  focusObject: (id) => {
    const object = objectById[id];
    if (!object) {
      return;
    }
    const targetFocus = object.scene === "solar" ? getSolarObjectPosition(object as never) : object.position;

    set({
      selectedId: id,
      targetFocus,
      targetPan: [0, 0],
      targetZoom: object.focusZoom,
      activeScene: object.scene,
      mode: get().mode === "guided" ? "guided" : get().mode
    });
  },
  toggleInfoPanel: () => set((state) => ({ showInfoPanel: !state.showInfoPanel })),
  resetView: () => {
    const activeScene = get().activeScene;
    const resetTargetId = SCENE_TARGETS[activeScene] ?? DEFAULT_SELECTION;
    const resetObject = objectById[resetTargetId];
    const targetFocus = getFocusPosition(resetTargetId);

    set({
      mode: "explore",
      selectedId: resetTargetId,
      hoveredId: null,
      zoom: resetObject?.focusZoom ?? 0.08,
      targetZoom: resetObject?.focusZoom ?? 0.08,
      pan: [0, 0],
      targetPan: [0, 0],
      focus: targetFocus,
      targetFocus,
      guidedIndex: 0,
      activeScene
    });
  },
  startGuidedJourney: () => {
    const firstStep = GUIDED_STEPS[0];
    set({ mode: "guided", guidedIndex: 0 });
    get().focusObject(firstStep.targetId);
  },
  stopGuidedJourney: () => set({ mode: "explore", guidedIndex: 0 }),
  advanceGuidedJourney: () => {
    const nextIndex = (get().guidedIndex + 1) % GUIDED_STEPS.length;
    const step = GUIDED_STEPS[nextIndex];
    set({ guidedIndex: nextIndex, mode: "guided" });
    get().focusObject(step.targetId);
  }
}));
