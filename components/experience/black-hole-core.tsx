"use client";

import { useMemo, useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AccretionMaterial = shaderMaterial(
  { uTime: 0, colorA: new THREE.Color("#ff8b4a"), colorB: new THREE.Color("#ffe2ad") },
  `
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 transformed = position;
      float wave = sin(uv.x * 12.0 + uTime * 1.8) * 0.06;
      transformed.z += wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 colorA;
    uniform vec3 colorB;

    void main() {
      float ring = smoothstep(0.18, 0.5, vUv.y) * (1.0 - smoothstep(0.5, 0.92, vUv.y));
      float streak = 0.5 + 0.5 * sin(vUv.x * 42.0 - uTime * 4.2);
      vec3 color = mix(colorA, colorB, streak);
      gl_FragColor = vec4(color, ring * 0.9);
    }
  `
);

const LensingMaterial = shaderMaterial(
  { uTime: 0, glow: new THREE.Color("#ffc07f") },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 glow;

    void main() {
      vec2 centered = vUv - 0.5;
      float dist = length(centered);
      float ring = smoothstep(0.46, 0.36, dist) * smoothstep(0.12, 0.22, dist);
      float pulse = 0.72 + 0.28 * sin(uTime * 1.4);
      gl_FragColor = vec4(glow * pulse, ring * 0.42);
    }
  `
);

interface BlackHoleCoreProps {
  radius: number;
  opacity?: number;
}

export function BlackHoleCore({ radius, opacity = 1 }: BlackHoleCoreProps) {
  const accretionRef = useRef<THREE.ShaderMaterial | null>(null);
  const lensRef = useRef<THREE.ShaderMaterial | null>(null);
  const accretionMaterial = useMemo(() => {
    const MaterialCtor = AccretionMaterial as unknown as new () => THREE.ShaderMaterial;
    const material = new MaterialCtor();
    material.transparent = true;
    material.side = THREE.DoubleSide;
    accretionRef.current = material;
    return material;
  }, []);
  const lensingMaterial = useMemo(() => {
    const MaterialCtor = LensingMaterial as unknown as new () => THREE.ShaderMaterial;
    const material = new MaterialCtor();
    material.transparent = true;
    material.side = THREE.DoubleSide;
    lensRef.current = material;
    return material;
  }, []);
  const debris = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        angle: (index / 30) * Math.PI * 2,
        offset: Math.random() * 0.8
      })),
    []
  );

  useFrame((state) => {
    if (accretionRef.current) {
      accretionRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      accretionRef.current.opacity = opacity;
    }
    if (lensRef.current) {
      lensRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      lensRef.current.opacity = opacity * 0.7;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color="#000000" roughness={0.02} metalness={0.8} transparent opacity={opacity} />
      </mesh>
      <mesh rotation={[Math.PI / 2.65, 0.3, 0]}>
        <torusGeometry args={[radius * 1.8, radius * 0.38, 30, 180]} />
        <primitive object={accretionMaterial} attach="material" />
      </mesh>
      <mesh scale={2.2}>
        <sphereGeometry args={[radius, 42, 42]} />
        <primitive object={lensingMaterial} attach="material" />
      </mesh>
      {debris.map((particle) => (
        <mesh
          key={particle.angle}
          position={[
            Math.cos(particle.angle) * radius * (2.3 + particle.offset),
            Math.sin(particle.angle) * radius * 0.5,
            Math.sin(particle.angle) * radius * 0.4
          ]}
          scale={0.15 + particle.offset * 0.2}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#ffe4a0" />
        </mesh>
      ))}
    </group>
  );
}
