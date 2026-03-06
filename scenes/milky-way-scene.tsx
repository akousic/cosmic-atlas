"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { ObjectMarker } from "@/components/experience/object-marker";
import { galaxies } from "@/data/galaxies";

function spiralParticles(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const branch = index % 4;
    const t = index / count;
    const angle = t * Math.PI * 10 + branch * (Math.PI / 2);
    const distance = Math.pow(Math.random(), 0.72) * radius;
    positions[index * 3] = Math.cos(angle) * distance;
    positions[index * 3 + 1] = Math.sin(angle) * distance * 0.4;
    positions[index * 3 + 2] = THREE.MathUtils.randFloatSpread(1.4);
  }
  return positions;
}

interface MilkyWaySceneProps {
  activeId: string;
  intensity: number;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function MilkyWayScene({ activeId, intensity, onSelect, onHover }: MilkyWaySceneProps) {
  const milkyWay = galaxies.find((item) => item.id === "milky-way");
  const localBubble = galaxies.find((item) => item.id === "local-bubble");
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => spiralParticles(3200, 18), []);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.z += delta * 0.03;
    }
  });

  if (!milkyWay || !localBubble) {
    return null;
  }

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#b6dcff" size={0.14} sizeAttenuation transparent opacity={0.86 * intensity} />
      </points>

      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#ffd59f" transparent opacity={0.6 * intensity} />
      </mesh>

      <ObjectMarker
        name={milkyWay.name}
        position={milkyWay.position}
        color={milkyWay.accent}
        size={2.2}
        active={activeId === milkyWay.id}
        opacity={intensity}
        onClick={() => onSelect(milkyWay.id)}
        onHover={(hovering) => onHover(hovering ? milkyWay.id : null)}
      />

      <ObjectMarker
        name={localBubble.name}
        position={localBubble.position}
        color={localBubble.accent}
        size={1.1}
        active={activeId === localBubble.id}
        opacity={intensity}
        onClick={() => onSelect(localBubble.id)}
        onHover={(hovering) => onHover(hovering ? localBubble.id : null)}
      />
    </group>
  );
}
