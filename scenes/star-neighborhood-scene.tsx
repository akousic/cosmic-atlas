"use client";

import { Sparkles } from "@react-three/drei";

import { NebulaCloud } from "@/components/experience/nebula-cloud";
import { ObjectMarker } from "@/components/experience/object-marker";
import { stars } from "@/data/stars";
import { getStellarMotion } from "@/lib/simulation";
import { useAtlasStore } from "@/lib/store";

interface StarNeighborhoodSceneProps {
  activeId: string;
  intensity: number;
  compactLabels?: boolean;
  reducedEffects?: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function StarNeighborhoodScene({
  activeId,
  intensity,
  compactLabels = false,
  reducedEffects = false,
  onSelect,
  onHover
}: StarNeighborhoodSceneProps) {
  const simulationTime = useAtlasStore((state) => state.simulationTime);

  return (
    <group>
      <NebulaCloud position={[14, 4, -8]} scale={28} color="rgba(99, 170, 255, 0.7)" opacity={0.22 * intensity} />
      <NebulaCloud position={[-20, -8, -12]} scale={22} color="rgba(255, 115, 86, 0.8)" opacity={0.2 * intensity} />
      <Sparkles count={reducedEffects ? 36 : 70} scale={54} size={6} color="#fff2d8" speed={0.12} opacity={intensity} />

      {stars.map((star) => {
        const motion = getStellarMotion(star, simulationTime);

        return (
          <ObjectMarker
            key={star.id}
            name={star.name}
            position={motion.position}
            color={star.accent}
            size={star.size * motion.scale}
            active={activeId === star.id}
            labelVisible={!compactLabels || activeId === star.id || star.id === "earth-marker" || star.id === "proxima-centauri"}
            opacity={Math.min(1, intensity * motion.opacity)}
            onClick={() => onSelect(star.id)}
            onHover={(hovering) => onHover(hovering ? star.id : null)}
          />
        );
      })}
    </group>
  );
}
