import { GuidedStep, SceneId } from "@/lib/types";

export const SCENE_ORDER: SceneId[] = [
  "planet",
  "solar",
  "stellar",
  "galactic",
  "cluster",
  "blackhole"
];

export const SCENE_LABELS: Record<SceneId, string> = {
  planet: "Planet",
  solar: "Solar System",
  stellar: "Stellar",
  galactic: "Galactic",
  cluster: "Intergalactic",
  blackhole: "Black Holes"
};

export const SCENE_TARGETS: Record<SceneId, string> = {
  planet: "earth",
  solar: "sun",
  stellar: "proxima-centauri",
  galactic: "milky-way",
  cluster: "andromeda",
  blackhole: "m87-star"
};

export const GUIDED_STEPS: GuidedStep[] = [
  { id: "earth", label: "Earth", targetId: "earth" },
  { id: "solar-system", label: "Solar System", targetId: "sun" },
  { id: "jupiter", label: "Jupiter", targetId: "jupiter" },
  { id: "kuiper-belt", label: "Kuiper Belt", targetId: "kuiper-belt" },
  { id: "nearby-stars", label: "Nearby Stars", targetId: "proxima-centauri" },
  { id: "milky-way", label: "Milky Way", targetId: "milky-way" },
  { id: "andromeda", label: "Andromeda", targetId: "andromeda" },
  { id: "black-holes", label: "Black Holes", targetId: "m87-star" }
];
