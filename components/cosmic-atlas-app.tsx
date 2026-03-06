"use client";

import { motion } from "framer-motion";

import { useGuidedJourney } from "@/hooks/use-guided-journey";
import { useAtlasStore } from "@/lib/store";
import { LandingHero } from "@/components/landing-hero";
import { UniverseCanvas } from "@/components/universe-canvas";
import { InfoPanel } from "@/components/ui/info-panel";
import { PanelToggles } from "@/components/ui/panel-toggles";
import { ScaleIndicator } from "@/components/ui/scale-indicator";
import { TopBar } from "@/components/ui/top-bar";

export function CosmicAtlasApp() {
  const started = useAtlasStore((state) => state.started);
  const start = useAtlasStore((state) => state.start);

  useGuidedJourney();

  return (
    <main className="grain relative min-h-screen overflow-hidden bg-space-grid bg-[length:190px_190px]">
      <UniverseCanvas />

      <motion.div
        initial={false}
        animate={{ opacity: started ? 1 : 0.78 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(1,2,7,0.18)_50%,rgba(1,2,7,0.72)_100%)]"
      />

      {started ? (
        <>
          <TopBar />
          <InfoPanel />
          <PanelToggles />
          <ScaleIndicator />
        </>
      ) : (
        <LandingHero onStart={start} />
      )}
    </main>
  );
}
