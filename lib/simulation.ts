import * as THREE from "three";

import { galaxies } from "@/data/galaxies";
import { planets } from "@/data/planets";
import { stars } from "@/data/stars";
import { CosmicObject, GalaxyData, PlanetData, StarData, Vec3 } from "@/lib/types";

const planetById = planets.reduce<Record<string, PlanetData>>((map, body) => {
  map[body.id] = body;
  return map;
}, {});

const starById = stars.reduce<Record<string, StarData>>((map, star) => {
  map[star.id] = star;
  return map;
}, {});

const galaxyById = galaxies.reduce<Record<string, GalaxyData>>((map, galaxy) => {
  map[galaxy.id] = galaxy;
  return map;
}, {});

function degToRad(value: number) {
  return THREE.MathUtils.degToRad(value);
}

function rotateVector(vector: THREE.Vector3, inclinationDeg = 0, ascendingNodeDeg = 0) {
  return vector
    .clone()
    .applyAxisAngle(new THREE.Vector3(0, 0, 1), degToRad(ascendingNodeDeg))
    .applyAxisAngle(new THREE.Vector3(1, 0, 0), degToRad(inclinationDeg));
}

function getOrbitAngleDeg(body: PlanetData, simulationTime = 0) {
  const baseAngle = body.simulation?.phaseOffsetDeg ?? body.orbitAngleDeg ?? 0;
  const orbitPeriodDays = body.simulation?.orbitPeriodDays;

  if (!orbitPeriodDays) {
    return baseAngle;
  }

  return baseAngle + (simulationTime / orbitPeriodDays) * 360;
}

function getPlanetPosition(body: PlanetData, simulationTime = 0): Vec3 {
  if ((!body.scene || (body.scene !== "solar" && body.scene !== "planet")) || !body.orbitRadius) {
    return body.position;
  }

  const angle = degToRad(getOrbitAngleDeg(body, simulationTime));
  const local = new THREE.Vector3(Math.cos(angle) * body.orbitRadius, Math.sin(angle) * body.orbitRadius, 0);
  const rotated = rotateVector(local, body.orbitInclinationDeg, body.orbitAscendingNodeDeg);

  if (!body.orbitCenterId) {
    return [rotated.x, rotated.y, rotated.z];
  }

  const center = planetById[body.orbitCenterId];
  if (!center) {
    return [rotated.x, rotated.y, rotated.z];
  }

  const centerPosition = getPlanetPosition(center, simulationTime);
  return [
    centerPosition[0] + rotated.x,
    centerPosition[1] + rotated.y,
    centerPosition[2] + rotated.z
  ];
}

export function getObjectPosition(object: CosmicObject, simulationTime = 0): Vec3 {
  if ((object.scene === "solar" || object.scene === "planet") && planetById[object.id]) {
    return getPlanetPosition(planetById[object.id], simulationTime);
  }

  return object.position;
}

export function getObjectPositionById(id: string, simulationTime = 0): Vec3 {
  const planet = planetById[id];
  if (planet) {
    return getPlanetPosition(planet, simulationTime);
  }

  const star = starById[id];
  if (star) {
    return star.position;
  }

  const galaxy = galaxyById[id];
  if (galaxy) {
    return galaxy.position;
  }

  return [0, 0, 0];
}

export function getPlanetOrbitPoints(body: PlanetData, simulationTime = 0, segments = 96) {
  if (!body.orbitRadius) {
    return [] as Vec3[];
  }

  const center = body.orbitCenterId ? getObjectPositionById(body.orbitCenterId, simulationTime) : [0, 0, 0];

  return Array.from({ length: segments }, (_, index) => {
    const angle = (index / (segments - 1)) * Math.PI * 2;
    const local = new THREE.Vector3(Math.cos(angle) * body.orbitRadius!, Math.sin(angle) * body.orbitRadius!, 0);
    const rotated = rotateVector(local, body.orbitInclinationDeg, body.orbitAscendingNodeDeg);
    return [
      center[0] + rotated.x,
      center[1] + rotated.y,
      center[2] + rotated.z
    ] as Vec3;
  });
}

export function getStellarMotion(star: StarData, simulationTime = 0) {
  const amplitude = star.simulation?.driftAmplitude ?? 0;
  const pulseAmplitude = star.simulation?.pulseAmplitude ?? 0;
  const phase = degToRad(star.simulation?.phaseOffsetDeg ?? 0);
  const time = simulationTime * 0.04;
  const drift = new THREE.Vector3(
    Math.sin(time + phase) * amplitude,
    Math.cos(time * 0.75 + phase) * amplitude * 0.7,
    Math.sin(time * 0.5 + phase) * amplitude * 0.4
  );
  const pulse = 1 + Math.sin(time * 1.6 + phase) * pulseAmplitude;

  return {
    position: [
      star.position[0] + drift.x,
      star.position[1] + drift.y,
      star.position[2] + drift.z
    ] as Vec3,
    scale: pulse,
    opacity: Math.min(1.2, 0.92 + pulseAmplitude * 0.8)
  };
}

export function getGalaxyMotion(galaxy: GalaxyData, simulationTime = 0) {
  const amplitude = galaxy.simulation?.driftAmplitude ?? 0;
  const phase = degToRad(galaxy.simulation?.phaseOffsetDeg ?? 0);
  const time = simulationTime * 0.01;

  return [
    galaxy.position[0] + Math.sin(time + phase) * amplitude,
    galaxy.position[1] + Math.cos(time * 0.9 + phase) * amplitude * 0.6,
    galaxy.position[2]
  ] as Vec3;
}
