"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { NebulaCloud } from "@/components/experience/nebula-cloud";
import { ObjectMarker } from "@/components/experience/object-marker";
import { galaxies } from "@/data/galaxies";
import { getGalaxyMotion } from "@/lib/simulation";
import { useAtlasStore } from "@/lib/store";
import { Vec3 } from "@/lib/types";

interface GalaxyClusterSceneProps {
  activeId: string;
  intensity: number;
  compactLabels?: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function GalaxyClusterScene({
  activeId,
  intensity,
  compactLabels = false,
  onSelect,
  onHover
}: GalaxyClusterSceneProps) {
  const simulationTime = useAtlasStore((state) => state.simulationTime);
  const cluster = galaxies.filter((item) => item.scene === "cluster");
  const flow = useRef<THREE.Group>(null);
  const lines: [Vec3, Vec3][] = [
    [
      cluster[0] ? getGalaxyMotion(cluster[0], simulationTime) : [0, 0, 0],
      cluster[1] ? getGalaxyMotion(cluster[1], simulationTime) : [0, 0, 0]
    ],
    [
      cluster[0] ? getGalaxyMotion(cluster[0], simulationTime) : [0, 0, 0],
      cluster[2] ? getGalaxyMotion(cluster[2], simulationTime) : [0, 0, 0]
    ],
    [
      cluster[0] ? getGalaxyMotion(cluster[0], simulationTime) : [0, 0, 0],
      cluster[3] ? getGalaxyMotion(cluster[3], simulationTime) : [0, 0, 0]
    ]
  ];

  useFrame(() => {
    if (flow.current) {
      flow.current.rotation.z = -simulationTime * 0.002;
    }
  });

  return (
    <group ref={flow}>
      <NebulaCloud position={[0, 0, -14]} scale={42} color="rgba(85, 140, 255, 0.6)" opacity={0.18 * intensity} />
      <NebulaCloud position={[20, 6, -10]} scale={24} color="rgba(255, 196, 124, 0.7)" opacity={0.16 * intensity} />

      {lines.map((points, index) => (
        <Line key={index} points={points} color="#8fd7ff" transparent opacity={0.16 * intensity} lineWidth={1} />
      ))}

      {cluster.map((galaxy) => (
        <ObjectMarker
          key={galaxy.id}
          name={galaxy.name}
          position={getGalaxyMotion(galaxy, simulationTime)}
          color={galaxy.accent}
          size={galaxy.radiusVisual * 0.42}
          active={activeId === galaxy.id}
          labelVisible={!compactLabels || activeId === galaxy.id || galaxy.id === "andromeda"}
          opacity={intensity}
          onClick={() => onSelect(galaxy.id)}
          onHover={(hovering) => onHover(hovering ? galaxy.id : null)}
        />
      ))}
    </group>
  );
}
