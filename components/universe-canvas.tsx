"use client";

import { Suspense, lazy, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { CameraControls } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Canvas, useFrame } from "@react-three/fiber";
import CameraControlsImpl from "camera-controls";
import * as THREE from "three";

import { NebulaCloud } from "@/components/experience/nebula-cloud";
import { Starfield } from "@/components/experience/starfield";
import { cameraDistanceToZoom, damp, sceneVisibility, zoomToCameraDistance } from "@/lib/scale";
import { useAtlasStore } from "@/lib/store";
import { SceneId } from "@/lib/types";

const EarthScene = lazy(() => import("@/scenes/earth-scene").then((mod) => ({ default: mod.EarthScene })));
const SolarSystemScene = lazy(() =>
  import("@/scenes/solar-system-scene").then((mod) => ({ default: mod.SolarSystemScene }))
);
const StarNeighborhoodScene = lazy(() =>
  import("@/scenes/star-neighborhood-scene").then((mod) => ({ default: mod.StarNeighborhoodScene }))
);
const MilkyWayScene = lazy(() =>
  import("@/scenes/milky-way-scene").then((mod) => ({ default: mod.MilkyWayScene }))
);
const GalaxyClusterScene = lazy(() =>
  import("@/scenes/galaxy-cluster-scene").then((mod) => ({ default: mod.GalaxyClusterScene }))
);
const BlackHoleScene = lazy(() =>
  import("@/scenes/black-hole-scene").then((mod) => ({ default: mod.BlackHoleScene }))
);

function SceneLayer({
  scene,
  children
}: {
  scene: SceneId;
  children: ReactNode;
}) {
  const zoom = useAtlasStore((state) => state.zoom);
  const visibility = sceneVisibility(scene, zoom);
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);
  const scaleRef = useRef(0.9);
  const depthRef = useRef(-18);

  useFrame((_, delta) => {
    opacityRef.current = damp(opacityRef.current, visibility, 5.4, delta);
    scaleRef.current = damp(scaleRef.current, 0.88 + visibility * 0.18, 5, delta);
    depthRef.current = damp(depthRef.current, (1 - visibility) * -16, 5, delta);

    if (!groupRef.current) {
      return;
    }

    groupRef.current.visible = opacityRef.current > 0.002;
    groupRef.current.scale.setScalar(scaleRef.current);
    groupRef.current.position.z = depthRef.current;
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}

function getImmersiveLookAt(target: [number, number, number], zoom: number) {
  const distance = zoomToCameraDistance(zoom);
  return {
    position: [
      target[0] + distance * 0.18,
      target[1] + Math.max(1.2, distance * 0.11),
      target[2] + distance * 0.96
    ] as [number, number, number],
    target
  };
}

function CameraRig() {
  const controlsRef = useRef<CameraControlsImpl | null>(null);
  const syncViewport = useAtlasStore((state) => state.syncViewport);
  const setHovered = useAtlasStore((state) => state.setHovered);
  const targetFocus = useAtlasStore((state) => state.targetFocus);
  const targetZoom = useAtlasStore((state) => state.targetZoom);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }

    const distance = zoomToCameraDistance(targetZoom);
    const immersive = getImmersiveLookAt(targetFocus, targetZoom);
    void controls.setLookAt(
      immersive.position[0],
      immersive.position[1],
      Math.max(distance * 0.62, immersive.position[2]),
      immersive.target[0],
      immersive.target[1],
      immersive.target[2],
      true
    );
  }, [targetFocus, targetZoom]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      dollyToCursor
      infinityDolly={false}
      smoothTime={0.72}
      draggingSmoothTime={0.14}
      dollySpeed={0.3}
      minDistance={16}
      maxDistance={72}
      truckSpeed={1.2}
      azimuthRotateSpeed={0.42}
      polarRotateSpeed={0.38}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2.02}
      mouseButtons={{
        left: CameraControlsImpl.ACTION.TRUCK,
        middle: CameraControlsImpl.ACTION.NONE,
        right: CameraControlsImpl.ACTION.ROTATE,
        wheel: CameraControlsImpl.ACTION.DOLLY
      }}
      touches={{
        one: CameraControlsImpl.ACTION.TOUCH_TRUCK,
        two: CameraControlsImpl.ACTION.TOUCH_DOLLY_ROTATE,
        three: CameraControlsImpl.ACTION.NONE
      }}
      onStart={() => {
        setHovered(null);
      }}
      onChange={() => {
        const controls = controlsRef.current;
        if (!controls) {
          return;
        }

        const target = controls.getTarget(new THREE.Vector3());
        const zoom = cameraDistanceToZoom(controls.distance);
        syncViewport([target.x, target.y, target.z], zoom);
      }}
    />
  );
}

function Experience() {
  const selectedId = useAtlasStore((state) => state.selectedId);
  const zoom = useAtlasStore((state) => state.zoom);
  const focusObject = useAtlasStore((state) => state.focusObject);
  const setHovered = useAtlasStore((state) => state.setHovered);

  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <fog attach="fog" args={["#02030a", 120, 240]} />
      <ambientLight intensity={0.35} color="#d3e3ff" />
      <directionalLight position={[16, 18, 22]} intensity={0.7} color="#cad6ff" />
      <Starfield zoom={zoom} />
      <NebulaCloud position={[20, 18, -30]} scale={40} color="rgba(110, 190, 255, 0.6)" />
      <NebulaCloud position={[-28, -12, -18]} scale={34} color="rgba(255, 140, 110, 0.65)" />

      <Suspense fallback={null}>
        <SceneLayer scene="planet">
          <EarthScene
            activeId={selectedId}
            intensity={sceneVisibility("planet", zoom)}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="solar">
          <SolarSystemScene
            activeId={selectedId}
            intensity={sceneVisibility("solar", zoom)}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="stellar">
          <StarNeighborhoodScene
            activeId={selectedId}
            intensity={sceneVisibility("stellar", zoom)}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="galactic">
          <MilkyWayScene
            activeId={selectedId}
            intensity={sceneVisibility("galactic", zoom)}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="cluster">
          <GalaxyClusterScene
            activeId={selectedId}
            intensity={sceneVisibility("cluster", zoom)}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="blackhole">
          <BlackHoleScene
            activeId={selectedId}
            intensity={sceneVisibility("blackhole", zoom)}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
      </Suspense>

      <CameraRig />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.65} intensity={0.55} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.12} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export function UniverseCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, zoomToCameraDistance(0.08)], fov: 42, near: 0.1, far: 1000 }}
      >
        {/* Each scene owns a compressed coordinate space so scale transitions stay stable. */}
        <Experience />
      </Canvas>
    </div>
  );
}
