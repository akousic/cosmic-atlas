"use client";

import { ObjectMarker } from "@/components/experience/object-marker";
import { BlackHoleCore } from "@/components/experience/black-hole-core";
import { blackHoles } from "@/data/blackholes";

interface BlackHoleSceneProps {
  activeId: string;
  intensity: number;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function BlackHoleScene({ activeId, intensity, onSelect, onHover }: BlackHoleSceneProps) {
  const primary = blackHoles.find((item) => item.id === activeId) ?? blackHoles[1];

  return (
    <group>
      <BlackHoleCore radius={primary.radiusVisual} opacity={intensity} />

      {blackHoles.map((hole) => (
        <ObjectMarker
          key={hole.id}
          name={hole.name}
          position={hole.position}
          color={hole.accent}
          size={hole.radiusVisual * 0.45}
          active={activeId === hole.id}
          opacity={intensity}
          onClick={() => onSelect(hole.id)}
          onHover={(hovering) => onHover(hovering ? hole.id : null)}
        />
      ))}
    </group>
  );
}
