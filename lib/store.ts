"use client";

import { create } from "zustand";

import { GUIDED_STEPS } from "@/lib/constants";
import { objectById } from "@/lib/catalog";
import { activeSceneForZoom, clamp } from "@/lib/scale";
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
    set({ targetZoom: next, activeScene: activeSceneForZoom(next) });
  },
  setZoomTarget: (value) => {
    const next = clamp(value, 0.02, 1);
    set({ targetZoom: next, activeScene: activeSceneForZoom(next) });
  },
  setPanTarget: (pan) => set({ targetPan: pan }),
  syncViewport: (focus, zoom) =>
    set({
      zoom,
      focus,
      pan: [0, 0],
      activeScene: activeSceneForZoom(zoom)
    }),
  setHovered: (id) => set({ hoveredId: id }),
  focusObject: (id) => {
    const object = objectById[id];
    if (!object) {
      return;
    }

    set({
      selectedId: id,
      targetFocus: object.position,
      targetPan: [0, 0],
      targetZoom: object.focusZoom,
      activeScene: object.scene,
      mode: get().mode === "guided" ? "guided" : get().mode
    });
  },
  toggleInfoPanel: () => set((state) => ({ showInfoPanel: !state.showInfoPanel })),
  resetView: () =>
    set({
      mode: "explore",
      selectedId: DEFAULT_SELECTION,
      hoveredId: null,
      zoom: 0.08,
      targetZoom: 0.08,
      pan: [0, 0],
      targetPan: [0, 0],
      focus: [0, 0, 0],
      targetFocus: [0, 0, 0],
      guidedIndex: 0,
      activeScene: "planet"
    }),
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
