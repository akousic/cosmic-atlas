"use client";

import { Billboard, Line, Text } from "@react-three/drei";
import { useMemo } from "react";

import { ObjectMarker } from "@/components/experience/object-marker";
import { PlanetMesh } from "@/components/experience/planet-mesh";
import { planets } from "@/data/planets";
import { getSolarObjectPosition, getSolarOrbitPoints } from "@/lib/solar-layout";
import { useAtlasStore } from "@/lib/store";

interface SolarSystemSceneProps {
  activeId: string;
  intensity: number;
  compactLabels?: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

function getSolarDisplayRadius(id: string, radius: number) {
  if (id === "jupiter") {
    return 2.35;
  }
  if (id === "saturn") {
    return 2.1;
  }
  if (id === "uranus" || id === "neptune") {
    return 1.65;
  }
  if (id === "earth-orbit") {
    return 1.08;
  }
  return radius;
}

export function SolarSystemScene({
  activeId,
  intensity,
  compactLabels = false,
  onSelect,
  onHover
}: SolarSystemSceneProps) {
  const simulationTime = useAtlasStore((state) => state.simulationTime);
  const sun = planets.find((item) => item.id === "sun");
  const solarBodies = planets.filter((item) => item.scene === "solar" && item.id !== "sun");
  const activeBody = solarBodies.find((item) => item.id === activeId);
  const orbitCurves = useMemo(
    () =>
      solarBodies
        .filter((body) => body.orbitRadius && (body.kind === "planet" || body.kind === "moon" || body.kind === "region"))
        .map((body) => getSolarOrbitPoints(body, simulationTime)),
    [simulationTime, solarBodies]
  );

  if (!sun) {
    return null;
  }

  return (
    <group>
      <pointLight position={[0, 0, 10]} intensity={4 * intensity} color="#ffd08a" />
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
        <Line
          key={index}
          points={points}
          color="rgba(255,255,255,0.18)"
          transparent
          opacity={0.16 * intensity}
        />
      ))}

      {solarBodies.map((body) => {
        const isMajor = body.kind === "planet" && ((body.radius ?? 0) > 1.5 || body.id === "earth-orbit");
        const distanceFromActive = activeBody ? Math.abs((activeBody.position[0] ?? 0) - body.position[0]) : Infinity;
        const shouldRenderFullMesh =
          body.id === activeId ||
          body.id === "earth-orbit" ||
          body.id === "sun" ||
          (isMajor && distanceFromActive < 34) ||
          body.kind === "moon";
        const showMesh = shouldRenderFullMesh;
        const displayRadius = getSolarDisplayRadius(body.id, body.radius ?? 1);
        const showLabel =
          !compactLabels ||
          body.id === activeId ||
          body.id === "earth-orbit" ||
          body.id === "sun" ||
          body.id === "jupiter";
        const position = getSolarObjectPosition(body, simulationTime);
        const isRegion = body.kind === "region";

        return (
          <group key={body.id} position={position}>
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
                  radius={displayRadius}
                  color={body.accent}
                  style={body.textureStyle}
                  ring={body.id === "saturn"}
                  glow={body.accent}
                  rotationSpeed={body.rotationSpeed}
                  opacity={isRegion ? intensity * 0.36 : intensity}
                />
                <Billboard position={[0, displayRadius * 2.15 + 1.1, 0]}>
                  {showLabel ? (
                    <Text
                      fontSize={body.id === "jupiter" || body.id === "saturn" || body.id === "uranus" ? 1.1 : 0.82}
                      fillOpacity={intensity}
                      color={activeId === body.id ? "#ffffff" : "#c5d4ff"}
                      anchorX="center"
                      anchorY="middle"
                    >
                      {body.name}
                    </Text>
                  ) : null}
                </Billboard>
              </group>
            ) : (
              <ObjectMarker
                name={body.name}
                position={[0, 0, 0]}
                color={body.accent}
                size={body.kind === "region" ? 0.95 : body.id === activeId ? 1.1 : 0.8}
                active={body.id === activeId}
                labelVisible={!compactLabels || body.id === activeId}
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
