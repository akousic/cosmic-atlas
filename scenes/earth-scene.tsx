"use client";

import { Float, Line, Sparkles, Stars } from "@react-three/drei";

import { PlanetMesh } from "@/components/experience/planet-mesh";
import { planets } from "@/data/planets";
import { getObjectPosition } from "@/lib/simulation";
import { useAtlasStore } from "@/lib/store";

interface EarthSceneProps {
  activeId: string;
  intensity: number;
  reducedEffects?: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function EarthScene({ activeId, intensity, reducedEffects = false, onSelect, onHover }: EarthSceneProps) {
  const simulationTime = useAtlasStore((state) => state.simulationTime);
  const earth = planets.find((item) => item.id === "earth");
  const moon = planets.find((item) => item.id === "moon");
  const orbitTrace = planets.find((item) => item.id === "earth-orbit-trace");

  if (!earth || !moon || !orbitTrace) {
    return null;
  }

  const moonPosition = getObjectPosition(moon, simulationTime);
  const orbitPoints = Array.from({ length: 72 }, (_, index) => {
    const angle = (index / 71) * Math.PI * 2;
    return [Math.cos(angle) * (moon.orbitRadius ?? 11), Math.sin(angle) * (moon.orbitRadius ?? 11), 0] as [
      number,
      number,
      number
    ];
  });

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

      <Line points={orbitPoints} color={orbitTrace.accent} transparent opacity={0.14 * intensity} lineWidth={1} />

      <group
        position={moonPosition}
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
