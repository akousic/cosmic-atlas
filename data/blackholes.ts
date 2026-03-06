import { BlackHoleData } from "@/lib/types";

export const blackHoles: BlackHoleData[] = [
  {
    id: "sagittarius-a-star",
    name: "Sagittarius A*",
    kind: "blackhole",
    scene: "blackhole",
    position: [-16, 0, 0],
    accent: "#ffd29c",
    distanceFromEarth: "27,000 light-years",
    diameter: "About 23.5 million km across",
    facts: [
      "The supermassive black hole at the center of the Milky Way",
      "Mass is about 4.3 million Suns"
    ],
    description: "The central black hole around which the Milky Way's bulge turns.",
    focusZoom: 0.9,
    mass: "4.3 million solar masses",
    radiusVisual: 3.2,
    spin: "Likely moderate to high"
  },
  {
    id: "m87-star",
    name: "M87*",
    kind: "blackhole",
    scene: "blackhole",
    position: [0, 0, 0],
    accent: "#ffb366",
    distanceFromEarth: "53 million light-years",
    diameter: "About 38 billion km across",
    facts: [
      "First black hole ever imaged directly",
      "Powers a gigantic relativistic jet"
    ],
    description: "A colossal black hole made famous by the Event Horizon Telescope image.",
    focusZoom: 0.96,
    mass: "6.5 billion solar masses",
    radiusVisual: 4.2,
    spin: "Likely high"
  },
  {
    id: "ton-618",
    name: "TON 618",
    kind: "blackhole",
    scene: "blackhole",
    position: [18, 4, 0],
    accent: "#ffd8b0",
    distanceFromEarth: "10.4 billion light-years",
    diameter: "More than 390 billion km across",
    facts: [
      "One of the most massive black holes known",
      "Lives inside an extremely luminous quasar"
    ],
    description: "A near-unimaginable black hole whose gravity feeds a brilliant quasar engine.",
    focusZoom: 1,
    mass: "66 billion solar masses",
    radiusVisual: 5.4,
    spin: "Unknown"
  }
];
