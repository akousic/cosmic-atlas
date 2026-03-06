"use client";

import { Billboard, Line, Text } from "@react-three/drei";
import { useMemo } from "react";

import { ObjectMarker } from "@/components/experience/object-marker";
import { PlanetMesh } from "@/components/experience/planet-mesh";
import { planets } from "@/data/planets";

interface SolarSystemSceneProps {
  activeId: string;
  intensity: number;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function SolarSystemScene({ activeId, intensity, onSelect, onHover }: SolarSystemSceneProps) {
  const sun = planets.find((item) => item.id === "sun");
  const solarBodies = planets.filter((item) => item.scene === "solar" && item.id !== "sun");
  const orbitCurves = useMemo(
    () =>
      solarBodies
        .filter((body) => body.orbitRadius)
        .map((body) => {
          const radius = body.orbitRadius ?? 0;
          return Array.from({ length: 72 }, (_, index) => {
            const angle = (index / 71) * Math.PI * 2;
            return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.08, 0] as [number, number, number];
          });
        }),
    [solarBodies]
  );

  if (!sun) {
    return null;
  }

  return (
    <group>
      <pointLight position={[0, 0, 10]} intensity={4} color="#ffd08a" />
      <group
        onClick={(event) => {
          event.stopPropagation();
          onSelect(sun.id);
        }}
        onPointerOver={() => onHover(sun.id)}
        onPointerOut={() => onHover(null)}
      >
        <PlanetMesh
          radius={sun.radius ?? 5.8}
          color="#ffb75d"
          style="gas"
          glow="#ffc26e"
          opacity={intensity}
        />
      </group>

      {orbitCurves.map((points, index) => (
        <Line key={index} points={points} color="rgba(255,255,255,0.18)" transparent opacity={0.16} />
      ))}

      {solarBodies.map((body) => {
        const isMajor = body.kind === "planet" && ((body.radius ?? 0) > 1.5 || body.id === "earth-orbit");
        const showMesh = isMajor;

        return (
          <group key={body.id} position={body.position}>
            {showMesh ? (
              <group
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(body.id);
                }}
                onPointerOver={() => onHover(body.id)}
                onPointerOut={() => onHover(null)}
              >
                <PlanetMesh
                  radius={body.radius ?? 1}
                  color={body.accent}
                  style={body.textureStyle}
                  ring={body.id === "saturn"}
                  glow={body.accent}
                  rotationSpeed={body.rotationSpeed}
                  opacity={intensity}
                />
                <Billboard position={[0, (body.radius ?? 1) * 2.15 + 1.1, 0]}>
                  <Text
                    fontSize={body.id === "jupiter" || body.id === "saturn" || body.id === "uranus" ? 1.1 : 0.82}
                    fillOpacity={intensity}
                    color={activeId === body.id ? "#ffffff" : "#c5d4ff"}
                    anchorX="center"
                    anchorY="middle"
                  >
                    {body.name}
                  </Text>
                </Billboard>
              </group>
            ) : (
              <ObjectMarker
                name={body.name}
                position={[0, 0, 0]}
                color={body.accent}
                size={body.id === activeId ? 1.1 : 0.8}
                active={body.id === activeId}
                opacity={intensity}
                onClick={() => onSelect(body.id)}
                onHover={(hovering) => onHover(hovering ? body.id : null)}
              />
            )}
          </group>
        );
      })}
    </group>
  );
}
