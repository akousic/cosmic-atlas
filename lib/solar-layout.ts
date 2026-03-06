import * as THREE from "three";

import { planets } from "@/data/planets";
import { PlanetData, Vec3 } from "@/lib/types";

const bodyById = planets.reduce<Record<string, PlanetData>>((map, body) => {
  map[body.id] = body;
  return map;
}, {});

function degToRad(value: number) {
  return THREE.MathUtils.degToRad(value);
}

function rotateVector(
  vector: THREE.Vector3,
  inclinationDeg = 0,
  ascendingNodeDeg = 0
) {
  return vector
    .clone()
    .applyAxisAngle(new THREE.Vector3(0, 0, 1), degToRad(ascendingNodeDeg))
    .applyAxisAngle(new THREE.Vector3(1, 0, 0), degToRad(inclinationDeg));
}

export function getSolarObjectPosition(body: PlanetData): Vec3 {
  if (body.scene !== "solar" || !body.orbitRadius) {
    return body.position;
  }

  const angle = degToRad(body.orbitAngleDeg ?? 0);
  const local = new THREE.Vector3(
    Math.cos(angle) * body.orbitRadius,
    Math.sin(angle) * body.orbitRadius,
    0
  );

  const rotated = rotateVector(local, body.orbitInclinationDeg, body.orbitAscendingNodeDeg);

  if (!body.orbitCenterId) {
    return [rotated.x, rotated.y, rotated.z];
  }

  const center = bodyById[body.orbitCenterId];
  if (!center) {
    return [rotated.x, rotated.y, rotated.z];
  }

  const centerPosition = getSolarObjectPosition(center);
  return [
    centerPosition[0] + rotated.x,
    centerPosition[1] + rotated.y,
    centerPosition[2] + rotated.z
  ];
}

export function getSolarOrbitPoints(body: PlanetData, segments = 96) {
  if (!body.orbitRadius) {
    return [] as Vec3[];
  }

  const center = body.orbitCenterId ? getSolarObjectPosition(bodyById[body.orbitCenterId]) : [0, 0, 0];

  return Array.from({ length: segments }, (_, index) => {
    const angle = (index / (segments - 1)) * Math.PI * 2;
    const local = new THREE.Vector3(
      Math.cos(angle) * body.orbitRadius!,
      Math.sin(angle) * body.orbitRadius!,
      0
    );
    const rotated = rotateVector(local, body.orbitInclinationDeg, body.orbitAscendingNodeDeg);
    return [
      center[0] + rotated.x,
      center[1] + rotated.y,
      center[2] + rotated.z
    ] as Vec3;
  });
}
