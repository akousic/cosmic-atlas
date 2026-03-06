"use client";

import { Float, Sparkles, Stars } from "@react-three/drei";

import { planets } from "@/data/planets";
import { PlanetMesh } from "@/components/experience/planet-mesh";

interface EarthSceneProps {
  activeId: string;
  intensity: number;
  reducedEffects?: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function EarthScene({ activeId, intensity, reducedEffects = false, onSelect, onHover }: EarthSceneProps) {
  const earth = planets.find((item) => item.id === "earth");
  const moon = planets.find((item) => item.id === "moon");

  if (!earth || !moon) {
    return null;
  }

  return (
    <group>
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 4, 12]} intensity={2} color="#ffddb0" />
      <Stars radius={120} depth={40} count={reducedEffects ? 720 : 1200} factor={5} saturation={0} fade speed={0.4} />
      <Sparkles count={reducedEffects ? 20 : 40} scale={28} size={4} color="#7ecfff" speed={0.2} opacity={intensity} />

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <group
          onClick={(event) => {
            event.stopPropagation();
            onSelect(earth.id);
          }}
          onPointerOver={() => onHover(earth.id)}
          onPointerOut={() => onHover(null)}
        >
          <PlanetMesh
            radius={earth.radius ?? 4.8}
            color={earth.accent}
            style="earth"
            glow="#7fc5ff"
            opacity={intensity}
          />
        </group>
      </Float>

      <group
        position={moon.position}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(moon.id);
        }}
        onPointerOver={() => onHover(moon.id)}
        onPointerOut={() => onHover(null)}
      >
        <PlanetMesh
          radius={moon.radius ?? 1.1}
          color={moon.accent}
          style="moon"
          glow="#eef3ff"
          opacity={intensity}
        />
      </group>
    </group>
  );
}
