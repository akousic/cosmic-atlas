"use client";

import { BlackHoleCore } from "@/components/experience/black-hole-core";
import { ObjectMarker } from "@/components/experience/object-marker";
import { blackHoles } from "@/data/blackholes";
import { useAtlasStore } from "@/lib/store";

interface BlackHoleSceneProps {
  activeId: string;
  intensity: number;
  compactLabels?: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function BlackHoleScene({
  activeId,
  intensity,
  compactLabels = false,
  onSelect,
  onHover
}: BlackHoleSceneProps) {
  const simulationTime = useAtlasStore((state) => state.simulationTime);
  const primary = blackHoles.find((item) => item.id === activeId) ?? blackHoles[1];
  const simulationPulse = 1 + Math.sin(simulationTime * 0.18) * 0.12;

  return (
    <group>
      <BlackHoleCore
        radius={primary.radiusVisual}
        opacity={intensity}
        simulationTime={simulationTime}
        simulationPulse={simulationPulse}
      />

      {blackHoles.map((hole) => (
        <ObjectMarker
          key={hole.id}
          name={hole.name}
          position={hole.position}
          color={hole.accent}
          size={hole.radiusVisual * 0.45}
          active={activeId === hole.id}
          labelVisible={!compactLabels || activeId === hole.id || hole.id === "m87-star"}
          opacity={intensity}
          onClick={() => onSelect(hole.id)}
          onHover={(hovering) => onHover(hovering ? hole.id : null)}
        />
      ))}
    </group>
  );
}
