import { blackHoles } from "@/data/blackholes";
import { contextualFacts } from "@/data/facts";
import { galaxies } from "@/data/galaxies";
import { planets } from "@/data/planets";
import { stars } from "@/data/stars";
import { CosmicObject } from "@/lib/types";

export const cosmicObjects: CosmicObject[] = [
  ...planets,
  ...stars,
  ...galaxies,
  ...blackHoles
];

export const objectById = cosmicObjects.reduce<Record<string, CosmicObject>>((map, object) => {
  map[object.id] = object;
  return map;
}, {});

export const factByTargetId = contextualFacts.reduce<Record<string, string[]>>((map, fact) => {
  map[fact.targetId] = [...(map[fact.targetId] ?? []), `${fact.title}: ${fact.body}`];
  return map;
}, {});
