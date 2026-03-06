import { SceneId } from "@/lib/types";

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
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

export function sceneVisibility(scene: SceneId, activeScene: SceneId) {
  return scene === activeScene ? 1 : 0;
}

export function compressDistance(distance: number, power = 0.42) {
  return Math.pow(distance, power);
}
