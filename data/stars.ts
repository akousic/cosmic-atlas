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
    size: 2.2,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.3,
      pulseAmplitude: 0.03,
      phaseOffsetDeg: 20,
      liveLabel: "Local-system drift tied to the shared clock",
      liveMetricLabel: "System type",
      liveMetricValue: "Triple star"
    }
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
    size: 1.6,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.2,
      pulseAmplitude: 0.05,
      phaseOffsetDeg: 94,
      liveLabel: "Red dwarf flicker under ambient time",
      liveMetricLabel: "Star class",
      liveMetricValue: "M5.5 red dwarf"
    }
  },
  {
    id: "barnards-star",
    name: "Barnard's Star",
    kind: "star",
    scene: "stellar",
    position: [-6, -11, 0],
    accent: "#ffb193",
    distanceFromEarth: "5.96 light-years",
    diameter: "0.2 solar diameters",
    facts: [
      "Has one of the largest known proper motions across our sky",
      "An old red dwarf with occasional flare activity"
    ],
    description: "A faint, fast-moving local star often used as a benchmark for stellar proper motion.",
    focusZoom: 0.45,
    temperature: "3,130 K",
    luminosity: "0.0035 Suns",
    size: 1.45,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.34,
      pulseAmplitude: 0.04,
      phaseOffsetDeg: 172,
      liveLabel: "Strong apparent drift compared with nearby stars",
      liveMetricLabel: "Proper motion",
      liveMetricValue: "10.3 arcsec/yr"
    }
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
    size: 2.4,
    simulation: {
      motion: "pulse",
      pulseAmplitude: 0.08,
      phaseOffsetDeg: 240,
      liveLabel: "Blue-white brilliance pulsing on the shared clock",
      liveMetricLabel: "System type",
      liveMetricValue: "Binary system"
    }
  },
  {
    id: "tau-ceti",
    name: "Tau Ceti",
    kind: "star",
    scene: "stellar",
    position: [11, -16, 0],
    accent: "#ffe1af",
    distanceFromEarth: "11.9 light-years",
    diameter: "0.79 solar diameters",
    facts: [
      "A Sun-like star often discussed in habitable-world studies",
      "Surrounded by a broad debris disk"
    ],
    description: "A calm nearby yellow dwarf often imagined as a future exploration target.",
    focusZoom: 0.48,
    temperature: "5,344 K",
    luminosity: "0.52 Suns",
    size: 1.85,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.18,
      pulseAmplitude: 0.03,
      phaseOffsetDeg: 18,
      liveLabel: "Quiet nearby dwarf with subtle ambient drift",
      liveMetricLabel: "Debris disk",
      liveMetricValue: "Present"
    }
  },
  {
    id: "wolf-359",
    name: "Wolf 359",
    kind: "star",
    scene: "stellar",
    position: [22, -5, 0],
    accent: "#ff9269",
    distanceFromEarth: "7.86 light-years",
    diameter: "0.16 solar diameters",
    facts: [
      "One of the faintest nearby stars visible only with telescopes",
      "A flare star that can brighten unpredictably"
    ],
    description: "A tiny flare star whose eruptions make it one of the neighborhood's dramatic red dwarfs.",
    focusZoom: 0.46,
    temperature: "2,800 K",
    luminosity: "0.001 Suns",
    size: 1.3,
    simulation: {
      motion: "pulse",
      pulseAmplitude: 0.12,
      driftAmplitude: 0.12,
      phaseOffsetDeg: 302,
      liveLabel: "Flare-like pulsing driven by the ambient clock",
      liveMetricLabel: "Star type",
      liveMetricValue: "Flare red dwarf"
    }
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
    size: 3.8,
    simulation: {
      motion: "pulse",
      pulseAmplitude: 0.14,
      driftAmplitude: 0.08,
      phaseOffsetDeg: 128,
      liveLabel: "Supergiant breathing on the shared clock",
      liveMetricLabel: "Lifecycle state",
      liveMetricValue: "Late-stage red supergiant"
    }
  },
  {
    id: "orion-nebula",
    name: "Orion Nebula",
    kind: "region",
    scene: "stellar",
    position: [-18, 14, -2],
    accent: "#8fd8ff",
    distanceFromEarth: "1,344 light-years",
    diameter: "24 light-years",
    facts: [
      "One of the nearest major star-forming regions",
      "A stellar nursery visible even to the naked eye"
    ],
    description: "A bright cradle of newborn stars and glowing gas, included as a landmark in the local stellar map.",
    focusZoom: 0.51,
    temperature: "Ionized gas",
    luminosity: "Diffuse nebular glow",
    size: 2.9,
    simulation: {
      motion: "pulse",
      pulseAmplitude: 0.08,
      phaseOffsetDeg: 54,
      liveLabel: "Nebular glow pulsing with the ambient clock",
      liveMetricLabel: "Role",
      liveMetricValue: "Star-forming region"
    }
  },
  {
    id: "local-interstellar-cloud",
    name: "Local Interstellar Cloud",
    kind: "region",
    scene: "stellar",
    position: [0, 9, -1],
    accent: "#7cc7ff",
    distanceFromEarth: "Solar System neighborhood",
    diameter: "About 30 light-years",
    facts: [
      "The Solar System currently travels through this patch of interstellar gas",
      "Part of a larger chain of local clouds in the Milky Way"
    ],
    description: "A translucent waypoint that contextualizes the Solar System inside the nearby interstellar medium.",
    focusZoom: 0.44,
    temperature: "Warm interstellar gas",
    luminosity: "Diffuse",
    size: 1.3,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.14,
      pulseAmplitude: 0.03,
      phaseOffsetDeg: 286,
      liveLabel: "Gas cloud slowly shifting on the ambient clock",
      liveMetricLabel: "Context",
      liveMetricValue: "Sun's current interstellar neighborhood"
    }
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
    size: 0.7,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.05,
      phaseOffsetDeg: 0,
      liveLabel: "Reference marker holding the local map together",
      liveMetricLabel: "Role",
      liveMetricValue: "Home reference"
    }
  }
];
