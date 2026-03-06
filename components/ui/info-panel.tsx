"use client";

import { motion } from "framer-motion";

import { factByTargetId, objectById } from "@/lib/catalog";
import { useAtlasStore } from "@/lib/store";

export function InfoPanel() {
  const hoveredId = useAtlasStore((state) => state.hoveredId);
  const selectedId = useAtlasStore((state) => state.selectedId);
  const showInfoPanel = useAtlasStore((state) => state.showInfoPanel);
  const toggleInfoPanel = useAtlasStore((state) => state.toggleInfoPanel);
  const activeId = hoveredId ?? selectedId;
  const object = objectById[activeId];

  if (!object || !showInfoPanel) {
    return null;
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel pointer-events-auto absolute right-6 top-28 z-20 w-[min(26rem,calc(100vw-3rem))] rounded-[2rem] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.42em] text-white/45">{object.kind}</p>
          <h2 className="mt-2 font-display text-3xl text-white">{object.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full shadow-[0_0_20px_currentColor]"
            style={{ backgroundColor: object.accent, color: object.accent }}
          />
          <button className="control-button rounded-full px-3 py-1.5 text-xs text-white/80" onClick={toggleInfoPanel}>
            Hide
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/72">{object.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-white/45">Distance from Earth</p>
          <p className="mt-1 text-white">{object.distanceFromEarth}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-white/45">Diameter</p>
          <p className="mt-1 text-white">{object.diameter}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.32em] text-white/45">Interesting Facts</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
          {object.facts.map((fact) => (
            <li key={fact} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              {fact}
            </li>
          ))}
          {(factByTargetId[object.id] ?? []).map((fact) => (
            <li key={fact} className="rounded-2xl border border-aurora/20 bg-aurora/5 px-4 py-3">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
