import { SCENE_TARGETS } from "@/lib/constants";
import { cameraDistanceToZoom, clamp } from "@/lib/scale";
import { SceneId } from "@/lib/types";
import { DeviceMode } from "@/hooks/use-device-mode";

interface SceneCameraPreset {
  minDistance: number;
  maxDistance: number;
  defaultDistance: number;
}

const DESKTOP_CAMERA_PRESETS: Record<SceneId, SceneCameraPreset> = {
  planet: { minDistance: 14, maxDistance: 72, defaultDistance: 65.68 },
  solar: { minDistance: 14, maxDistance: 192, defaultDistance: 94 },
  stellar: { minDistance: 14, maxDistance: 72, defaultDistance: 47.32 },
  galactic: { minDistance: 14, maxDistance: 72, defaultDistance: 37.06 },
  cluster: { minDistance: 14, maxDistance: 72, defaultDistance: 31.12 },
  blackhole: { minDistance: 14, maxDistance: 72, defaultDistance: 18.16 }
};

const MOBILE_CAMERA_PRESETS: Record<SceneId, SceneCameraPreset> = {
  planet: { minDistance: 20, maxDistance: 78, defaultDistance: 69.5 },
  solar: { minDistance: 22, maxDistance: 210, defaultDistance: 126 },
  stellar: { minDistance: 18, maxDistance: 86, defaultDistance: 58 },
  galactic: { minDistance: 18, maxDistance: 88, defaultDistance: 48 },
  cluster: { minDistance: 18, maxDistance: 94, defaultDistance: 42 },
  blackhole: { minDistance: 18, maxDistance: 88, defaultDistance: 32 }
};

export function getSceneCameraPreset(scene: SceneId, deviceMode: DeviceMode) {
  return (deviceMode === "mobile" ? MOBILE_CAMERA_PRESETS : DESKTOP_CAMERA_PRESETS)[scene];
}

export function getSceneDefaultZoom(scene: SceneId, deviceMode: DeviceMode) {
  return clamp(cameraDistanceToZoom(getSceneCameraPreset(scene, deviceMode).defaultDistance), 0.02, 1);
}

export function getSceneDefaultTarget(scene: SceneId) {
  return SCENE_TARGETS[scene];
}
