import { StarData } from "@/lib/types";

export const stars: StarData[] = [
  {
    id: "alpha-centauri",
    name: "Alpha Centauri",
    kind: "star",
    scene: "stellar",
    position: [-12, 4, 0],
    accent: "#ffe8b6",
    distanceFromEarth: "4.37 light-years",
    diameter: "1.2 solar diameters",
    facts: [
      "Closest Sun-like stellar system",
      "Actually a multi-star system"
    ],
    description: "The bright nearby stellar system that anchors our local cosmic neighborhood.",
    focusZoom: 0.43,
    temperature: "5,790 K",
    luminosity: "1.5 Suns",
    size: 2.2
  },
  {
    id: "proxima-centauri",
    name: "Proxima Centauri",
    kind: "star",
    scene: "stellar",
    position: [5, -3, 0],
    accent: "#ff8e72",
    distanceFromEarth: "4.24 light-years",
    diameter: "0.15 solar diameters",
    facts: [
      "Closest known star to the Sun",
      "A red dwarf with at least one known planet in the habitable zone"
    ],
    description: "A dim red dwarf, but our closest stellar neighbor.",
    focusZoom: 0.45,
    temperature: "3,050 K",
    luminosity: "0.0017 Suns",
    size: 1.6
  },
  {
    id: "sirius",
    name: "Sirius",
    kind: "star",
    scene: "stellar",
    position: [18, 8, 0],
    accent: "#d9f6ff",
    distanceFromEarth: "8.6 light-years",
    diameter: "1.7 solar diameters",
    facts: [
      "Brightest star in Earth's night sky",
      "A binary system with a white dwarf companion"
    ],
    description: "A brilliant blue-white beacon seen prominently from Earth.",
    focusZoom: 0.47,
    temperature: "9,940 K",
    luminosity: "25 Suns",
    size: 2.4
  },
  {
    id: "betelgeuse",
    name: "Betelgeuse",
    kind: "star",
    scene: "stellar",
    position: [-22, -10, 0],
    accent: "#ff835a",
    distanceFromEarth: "548 light-years",
    diameter: "764 solar diameters",
    facts: [
      "A red supergiant nearing the end of its life",
      "Would extend beyond Mars if placed at the center of our Solar System"
    ],
    description: "A swollen red supergiant that radiates heat, dust, and instability.",
    focusZoom: 0.5,
    temperature: "3,500 K",
    luminosity: "126,000 Suns",
    size: 3.8
  },
  {
    id: "earth-marker",
    name: "Earth",
    kind: "region",
    scene: "stellar",
    position: [0, 0, 0],
    accent: "#7cc7ff",
    distanceFromEarth: "Home",
    diameter: "Local reference",
    facts: [
      "A reference marker for routes leaving the Solar System",
      "Compressed scale keeps Earth visible alongside nearby stars"
    ],
    description: "A tiny marker that keeps the stellar map anchored to home.",
    focusZoom: 0.41,
    temperature: "288 K",
    luminosity: "Reflected light",
    size: 0.7
  }
];
