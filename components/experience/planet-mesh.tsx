"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { createProceduralPlanetTexture } from "@/lib/procedural-textures";

interface PlanetMeshProps {
  radius: number;
  color: string;
  style: "earth" | "rocky" | "venus" | "gas" | "ice" | "moon";
  glow?: string;
  ring?: boolean;
  rotationSpeed?: number;
  opacity?: number;
}

export function PlanetMesh({
  radius,
  color,
  style,
  glow = color,
  ring = false,
  rotationSpeed = 0.05,
  opacity = 1
}: PlanetMeshProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useMemo(
    () => (typeof document === "undefined" ? null : createProceduralPlanetTexture(style)),
    [style]
  );

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color={color}
          map={texture ?? undefined}
          roughness={0.82}
          metalness={0.06}
          emissive={new THREE.Color(glow)}
          emissiveIntensity={0.08}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color={glow} transparent opacity={0.08 * opacity} side={THREE.BackSide} />
      </mesh>
      {ring ? (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 2.05, 96]} />
          <meshBasicMaterial color="#f4deb0" transparent opacity={0.4 * opacity} side={THREE.DoubleSide} />
        </mesh>
      ) : null}
    </group>
  );
}
