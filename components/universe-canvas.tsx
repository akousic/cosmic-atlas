"use client";

import { Suspense, lazy, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { CameraControls } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Canvas, useFrame } from "@react-three/fiber";
import CameraControlsImpl from "camera-controls";
import * as THREE from "three";

import { NebulaCloud } from "@/components/experience/nebula-cloud";
import { Starfield } from "@/components/experience/starfield";
import { DeviceMode } from "@/hooks/use-device-mode";
import { getSceneCameraPreset } from "@/lib/camera-config";
import { objectById } from "@/lib/catalog";
import { cameraDistanceToZoom, clamp, damp, sceneVisibility, zoomToCameraDistance } from "@/lib/scale";
import { getObjectPosition } from "@/lib/simulation";
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
  const activeScene = useAtlasStore((state) => state.activeScene);
  const visibility = sceneVisibility(scene, activeScene);
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);
  const scaleRef = useRef(0.9);
  const depthRef = useRef(-18);

  useFrame((_, delta) => {
    const fadeLambda = visibility > opacityRef.current ? 5.4 : 12;
    opacityRef.current = damp(opacityRef.current, visibility, fadeLambda, delta);
    scaleRef.current = damp(scaleRef.current, 0.88 + visibility * 0.18, 5, delta);
    depthRef.current = damp(depthRef.current, (1 - visibility) * -16, 5, delta);

    if (!groupRef.current) {
      return;
    }

    groupRef.current.visible = opacityRef.current > 0.01;
    groupRef.current.scale.setScalar(scaleRef.current);
    groupRef.current.position.z = depthRef.current;
  });

  return <group ref={groupRef}>{children}</group>;
}

function getPhysicalLookAt(
  controls: CameraControlsImpl,
  target: [number, number, number],
  zoom: number,
  selectedId: string,
  minDistance: number,
  maxDistance: number
) {
  const nextTarget = new THREE.Vector3(...target);
  const currentPosition = controls.getPosition(new THREE.Vector3());
  const currentTarget = controls.getTarget(new THREE.Vector3());
  const viewDirection = currentPosition.clone().sub(currentTarget);

  if (viewDirection.lengthSq() < 0.0001) {
    viewDirection.set(0, 8, 48);
  }

  const selected = objectById[selectedId];
  const preferredByScene: Record<SceneId, THREE.Vector3> = {
    planet: new THREE.Vector3(0.12, 0.36, 1),
    solar: new THREE.Vector3(0.42, 0.34, 1),
    stellar: new THREE.Vector3(0.26, 0.28, 1),
    galactic: new THREE.Vector3(0.18, 0.24, 1),
    cluster: new THREE.Vector3(0.2, 0.2, 1),
    blackhole: new THREE.Vector3(0.12, 0.18, 1)
  };

  const normalizedCurrent = viewDirection.normalize();
  const preferred = (selected ? preferredByScene[selected.scene] : preferredByScene.planet).clone().normalize();
  const blendedDirection = normalizedCurrent.lerp(preferred, selected?.scene === "solar" ? 0.55 : 0.35);

  const desiredDistance = clamp(zoomToCameraDistance(zoom), minDistance, maxDistance);
  blendedDirection.multiplyScalar(desiredDistance);
  const position = nextTarget.clone().add(blendedDirection);

  return {
    position: [position.x, position.y, position.z] as [number, number, number],
    target
  };
}

function CameraRigWithMode({ deviceMode }: { deviceMode: DeviceMode }) {
  const controlsRef = useRef<CameraControlsImpl | null>(null);
  const activeScene = useAtlasStore((state) => state.activeScene);
  const syncViewport = useAtlasStore((state) => state.syncViewport);
  const setHovered = useAtlasStore((state) => state.setHovered);
  const targetFocus = useAtlasStore((state) => state.targetFocus);
  const targetZoom = useAtlasStore((state) => state.targetZoom);
  const selectedId = useAtlasStore((state) => state.selectedId);
  const simulationTime = useAtlasStore((state) => state.simulationTime);
  const preset = getSceneCameraPreset(activeScene, deviceMode);
  const isMobile = deviceMode === "mobile";

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }

    const physical = getPhysicalLookAt(
      controls,
      targetFocus,
      targetZoom,
      selectedId,
      preset.minDistance,
      preset.maxDistance
    );
    void controls.setLookAt(
      physical.position[0],
      physical.position[1],
      physical.position[2],
      physical.target[0],
      physical.target[1],
      physical.target[2],
      true
    );
  }, [preset.maxDistance, preset.minDistance, selectedId, targetFocus, targetZoom]);

  useFrame(() => {
    const controls = controlsRef.current;
    const selected = objectById[selectedId];
    if (!controls || !selected || selected.simulation?.motion !== "orbit") {
      return;
    }

    const desiredTarget = new THREE.Vector3(...getObjectPosition(selected, simulationTime));
    const currentTarget = controls.getTarget(new THREE.Vector3());
    if (currentTarget.distanceToSquared(desiredTarget) < 0.0001) {
      return;
    }

    const currentPosition = controls.getPosition(new THREE.Vector3());
    const offset = currentPosition.sub(currentTarget);
    const nextPosition = desiredTarget.clone().add(offset);

    void controls.setLookAt(
      nextPosition.x,
      nextPosition.y,
      nextPosition.z,
      desiredTarget.x,
      desiredTarget.y,
      desiredTarget.z,
      false
    );
  });

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      dollyToCursor={!isMobile}
      infinityDolly={false}
      smoothTime={isMobile ? 0.72 : 0.9}
      draggingSmoothTime={isMobile ? 0.12 : 0.08}
      dollySpeed={isMobile ? 0.16 : 0.22}
      minDistance={preset.minDistance}
      maxDistance={preset.maxDistance}
      truckSpeed={isMobile ? 1.1 : 0.75}
      azimuthRotateSpeed={isMobile ? 0.48 : 0.6}
      polarRotateSpeed={isMobile ? 0.42 : 0.52}
      minPolarAngle={0.18}
      maxPolarAngle={Math.PI - 0.18}
      mouseButtons={{
        left: CameraControlsImpl.ACTION.ROTATE,
        middle: CameraControlsImpl.ACTION.DOLLY,
        right: CameraControlsImpl.ACTION.TRUCK,
        wheel: CameraControlsImpl.ACTION.DOLLY
      }}
      touches={{
        one: CameraControlsImpl.ACTION.TOUCH_ROTATE,
        two: CameraControlsImpl.ACTION.TOUCH_DOLLY_TRUCK,
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

function SimulationDriver() {
  const advanceSimulation = useAtlasStore((state) => state.advanceSimulation);

  useFrame((_, delta) => {
    advanceSimulation(delta);
  });

  return null;
}

function Experience({ deviceMode }: { deviceMode: DeviceMode }) {
  const selectedId = useAtlasStore((state) => state.selectedId);
  const zoom = useAtlasStore((state) => state.zoom);
  const activeScene = useAtlasStore((state) => state.activeScene);
  const focusObject = useAtlasStore((state) => state.focusObject);
  const setHovered = useAtlasStore((state) => state.setHovered);
  const reducedEffects = deviceMode === "mobile";
  const compactLabels = deviceMode === "mobile";

  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <fog attach="fog" args={["#02030a", 120, 240]} />
      <ambientLight intensity={0.35} color="#d3e3ff" />
      <directionalLight position={[16, 18, 22]} intensity={0.7} color="#cad6ff" />
      <Starfield zoom={zoom} densityScale={reducedEffects ? 0.66 : 1} />
      <NebulaCloud position={[20, 18, -30]} scale={40} color="rgba(110, 190, 255, 0.6)" />
      <NebulaCloud position={[-28, -12, -18]} scale={34} color="rgba(255, 140, 110, 0.65)" />

      <Suspense fallback={null}>
        <SceneLayer scene="planet">
          <EarthScene
            activeId={selectedId}
            intensity={sceneVisibility("planet", activeScene)}
            reducedEffects={reducedEffects}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="solar">
          <SolarSystemScene
            activeId={selectedId}
            intensity={sceneVisibility("solar", activeScene)}
            compactLabels={compactLabels}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="stellar">
          <StarNeighborhoodScene
            activeId={selectedId}
            intensity={sceneVisibility("stellar", activeScene)}
            compactLabels={compactLabels}
            reducedEffects={reducedEffects}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="galactic">
          <MilkyWayScene
            activeId={selectedId}
            intensity={sceneVisibility("galactic", activeScene)}
            compactLabels={compactLabels}
            reducedEffects={reducedEffects}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="cluster">
          <GalaxyClusterScene
            activeId={selectedId}
            intensity={sceneVisibility("cluster", activeScene)}
            compactLabels={compactLabels}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
        <SceneLayer scene="blackhole">
          <BlackHoleScene
            activeId={selectedId}
            intensity={sceneVisibility("blackhole", activeScene)}
            compactLabels={compactLabels}
            onSelect={focusObject}
            onHover={setHovered}
          />
        </SceneLayer>
      </Suspense>

      <CameraRigWithMode deviceMode={deviceMode} />
      <SimulationDriver />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.65}
          intensity={deviceMode === "mobile" ? 0.38 : 0.55}
        />
        <Noise opacity={deviceMode === "mobile" ? 0.012 : 0.02} />
        <Vignette eskil={false} offset={0.12} darkness={deviceMode === "mobile" ? 0.48 : 0.6} />
      </EffectComposer>
    </>
  );
}

export function UniverseCanvas({ deviceMode }: { deviceMode: DeviceMode }) {
  const isMobile = deviceMode === "mobile";

  return (
    <div className="absolute inset-0">
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={isMobile ? [1, 1.2] : [1, 1.8]}
        camera={{ position: [0, 0, zoomToCameraDistance(0.08)], fov: 42, near: 0.1, far: 1000 }}
      >
        {/* Each scene owns a compressed coordinate space, and scene changes happen only via explicit navigation. */}
        <Experience deviceMode={deviceMode} />
      </Canvas>
    </div>
  );
}
