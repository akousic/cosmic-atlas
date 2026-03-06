import { SCENE_ORDER } from "@/lib/constants";
import { SceneId } from "@/lib/types";

const SCENE_BREAKPOINTS = [0.18, 0.36, 0.56, 0.76, 0.9];
const SCENE_BLEND = 0.055;

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function dampVec2(
  current: [number, number],
  target: [number, number],
  lambda: number,
  dt: number
): [number, number] {
  return [
    damp(current[0], target[0], lambda, dt),
    damp(current[1], target[1], lambda, dt)
  ];
}

export function zoomToCameraDistance(zoom: number) {
  const normalized = clamp(zoom);
  return 70 - normalized * 54;
}

export function cameraDistanceToZoom(distance: number) {
  return clamp((70 - distance) / 54);
}

export function sceneVisibility(scene: SceneId, zoom: number) {
  const index = SCENE_ORDER.indexOf(scene);
  const leftBoundary = index === 0 ? 0 : SCENE_BREAKPOINTS[index - 1];
  const rightBoundary = index === SCENE_ORDER.length - 1 ? 1 : SCENE_BREAKPOINTS[index];

  if (index > 0 && zoom < leftBoundary - SCENE_BLEND) {
    return 0;
  }

  if (index < SCENE_ORDER.length - 1 && zoom > rightBoundary + SCENE_BLEND) {
    return 0;
  }

  let visibility = 1;

  if (index > 0 && zoom < leftBoundary + SCENE_BLEND) {
    visibility = smoothstep(leftBoundary - SCENE_BLEND, leftBoundary + SCENE_BLEND, zoom);
  }

  if (index < SCENE_ORDER.length - 1 && zoom > rightBoundary - SCENE_BLEND) {
    visibility = Math.min(
      visibility,
      1 - smoothstep(rightBoundary - SCENE_BLEND, rightBoundary + SCENE_BLEND, zoom)
    );
  }

  return clamp(visibility);
}

export function activeSceneForZoom(zoom: number) {
  return SCENE_ORDER.reduce(
    (winner, scene) =>
      sceneVisibility(scene, zoom) > sceneVisibility(winner, zoom) ? scene : winner,
    "planet" as SceneId
  );
}

export function scaleProgress(scene: SceneId, zoom: number) {
  const index = SCENE_ORDER.indexOf(scene);
  const leftBoundary = index === 0 ? 0 : SCENE_BREAKPOINTS[index - 1];
  const rightBoundary = index === SCENE_ORDER.length - 1 ? 1 : SCENE_BREAKPOINTS[index];
  return clamp((zoom - leftBoundary) / (rightBoundary - leftBoundary));
}

export function compressDistance(distance: number, power = 0.42) {
  return Math.pow(distance, power);
}
