"use client";

import { useEffect } from "react";

import { useAtlasStore } from "@/lib/store";

export function useGuidedJourney() {
  const mode = useAtlasStore((state) => state.mode);
  const advanceGuidedJourney = useAtlasStore((state) => state.advanceGuidedJourney);

  useEffect(() => {
    if (mode !== "guided") {
      return;
    }

    const timer = window.setInterval(() => {
      advanceGuidedJourney();
    }, 5200);

    return () => window.clearInterval(timer);
  }, [advanceGuidedJourney, mode]);
}
