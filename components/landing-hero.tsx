"use client";

import { motion } from "framer-motion";

interface LandingHeroProps {
  onStart: () => void;
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-6"
    >
      <div className="glass-panel pointer-events-auto relative max-w-3xl overflow-hidden rounded-[2.5rem] px-8 py-10 sm:px-12 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(118,215,255,0.18),transparent_40%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.52em] text-white/45">Cosmic Atlas</p>
          <h1 className="mt-5 font-display text-6xl leading-none text-white sm:text-7xl">
            Explore the <span className="text-gradient">Universe</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Glide from Earth to the Solar System, across nearby stars, through the Milky Way, and out
            toward galaxies, clusters, and black holes in one cinematic spatial narrative.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/58">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Smooth zoom and pan</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Contextual science facts</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Guided journey across cosmic scale</span>
          </div>

          <button
            className="mt-10 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
            onClick={onStart}
          >
            Start Exploring
          </button>
        </div>
      </div>
    </motion.div>
  );
}
