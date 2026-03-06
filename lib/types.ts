export type SceneId =
  | "planet"
  | "solar"
  | "stellar"
  | "galactic"
  | "cluster"
  | "blackhole";

export type CosmicKind =
  | "planet"
  | "moon"
  | "star"
  | "galaxy"
  | "blackhole"
  | "region";

export type Vec3 = [number, number, number];

export interface CosmicObject {
  id: string;
  name: string;
  kind: CosmicKind;
  scene: SceneId;
  position: Vec3;
  accent: string;
  distanceFromEarth: string;
  diameter: string;
  facts: string[];
  description: string;
  focusZoom: number;
  radius?: number;
  travelHighlights?: string[];
  orbitalLabel?: string;
}

export interface PlanetData extends CosmicObject {
  kind: "planet" | "moon" | "star" | "region";
  distanceFromSunAU?: number;
  moons?: number;
  textureStyle: "earth" | "rocky" | "venus" | "gas" | "ice" | "moon";
  orbitCenterId?: string;
  orbitRadius?: number;
  orbitAngleDeg?: number;
  orbitInclinationDeg?: number;
  orbitAscendingNodeDeg?: number;
  rotationSpeed?: number;
}

export interface StarData extends CosmicObject {
  kind: "star" | "region";
  temperature: string;
  luminosity: string;
  size: number;
}

export interface GalaxyData extends CosmicObject {
  kind: "galaxy" | "region";
  galaxyType: "spiral" | "barred-spiral" | "irregular" | "cluster";
  mass: string;
  radiusVisual: number;
}

export interface BlackHoleData extends CosmicObject {
  kind: "blackhole";
  mass: string;
  radiusVisual: number;
  spin: string;
}

export interface ContextFact {
  id: string;
  targetId: string;
  title: string;
  body: string;
}

export interface GuidedStep {
  id: string;
  label: string;
  targetId: string;
}
