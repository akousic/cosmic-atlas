import { PlanetData } from "@/lib/types";
import { getObjectPosition, getPlanetOrbitPoints } from "@/lib/simulation";

export function getSolarObjectPosition(body: PlanetData, simulationTime = 0) {
  return getObjectPosition(body, simulationTime);
}

export function getSolarOrbitPoints(body: PlanetData, simulationTime = 0, segments = 96) {
  return getPlanetOrbitPoints(body, simulationTime, segments);
}
