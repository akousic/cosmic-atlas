import { GalaxyData } from "@/lib/types";

export const galaxies: GalaxyData[] = [
  {
    id: "milky-way",
    name: "Milky Way",
    kind: "galaxy",
    scene: "galactic",
    position: [0, 0, 0],
    accent: "#8fc9ff",
    distanceFromEarth: "You are here",
    diameter: "100,000 light-years",
    facts: [
      "A barred spiral galaxy with hundreds of billions of stars",
      "Sagittarius A* sits at its core"
    ],
    description: "Our home galaxy, visualized as a luminous spiral disk threaded with star-forming arms.",
    focusZoom: 0.61,
    galaxyType: "barred-spiral",
    mass: "1.15 trillion solar masses",
    radiusVisual: 15,
    simulation: {
      motion: "swirl",
      phaseOffsetDeg: 0,
      liveLabel: "Spiral disk rotating on the shared clock",
      liveMetricLabel: "Galaxy type",
      liveMetricValue: "Barred spiral"
    }
  },
  {
    id: "local-bubble",
    name: "Local Bubble",
    kind: "region",
    scene: "galactic",
    position: [9, -6, 0],
    accent: "#7ce9ff",
    distanceFromEarth: "Within the Orion Arm",
    diameter: "1,000 light-years",
    facts: [
      "A cavity of hot ionized gas surrounding the Solar System",
      "Likely sculpted by ancient supernovae"
    ],
    description: "The Solar System rides inside a comparatively sparse bubble in the galactic disk.",
    focusZoom: 0.58,
    galaxyType: "cluster",
    mass: "Diffuse gas",
    radiusVisual: 4,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.2,
      phaseOffsetDeg: 60,
      liveLabel: "Galactic cavity drifting subtly with the shared clock",
      liveMetricLabel: "Context",
      liveMetricValue: "Solar neighborhood structure"
    }
  },
  {
    id: "andromeda",
    name: "Andromeda",
    kind: "galaxy",
    scene: "cluster",
    position: [18, 2, 0],
    accent: "#cfe6ff",
    distanceFromEarth: "2.5 million light-years",
    diameter: "220,000 light-years",
    facts: [
      "The nearest major spiral galaxy to the Milky Way",
      "On a collision course with our galaxy over billions of years"
    ],
    description: "A larger spiral neighbor drifting toward the Milky Way across the Local Group.",
    focusZoom: 0.78,
    galaxyType: "spiral",
    mass: "1.5 trillion solar masses",
    radiusVisual: 7,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.3,
      phaseOffsetDeg: 10,
      liveLabel: "Approach vector stylized under ambient time",
      liveMetricLabel: "Future",
      liveMetricValue: "Milky Way merger in ~4.5B years"
    }
  },
  {
    id: "triangulum",
    name: "Triangulum",
    kind: "galaxy",
    scene: "cluster",
    position: [28, -5, 0],
    accent: "#8fb3ff",
    distanceFromEarth: "2.73 million light-years",
    diameter: "60,000 light-years",
    facts: [
      "Third-largest member of the Local Group",
      "A classic face-on spiral used in astrophotography"
    ],
    description: "A graceful spiral galaxy that rounds out the Local Group's brightest trio.",
    focusZoom: 0.8,
    galaxyType: "spiral",
    mass: "50 billion solar masses",
    radiusVisual: 4.8,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.22,
      phaseOffsetDeg: 140,
      liveLabel: "Local Group companion drifting on the shared clock",
      liveMetricLabel: "Galaxy type",
      liveMetricValue: "Spiral"
    }
  },
  {
    id: "large-magellanic-cloud",
    name: "Large Magellanic Cloud",
    kind: "galaxy",
    scene: "cluster",
    position: [-14, -7, 0],
    accent: "#77d8ff",
    distanceFromEarth: "163,000 light-years",
    diameter: "14,000 light-years",
    facts: [
      "A satellite galaxy orbiting the Milky Way",
      "Hosts the Tarantula Nebula, a giant star-forming region"
    ],
    description: "An irregular companion galaxy shimmering in the southern skies.",
    focusZoom: 0.74,
    galaxyType: "irregular",
    mass: "100 billion solar masses",
    radiusVisual: 3.8,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.24,
      phaseOffsetDeg: 220,
      liveLabel: "Satellite galaxy drifting around the Local Group core",
      liveMetricLabel: "Galaxy type",
      liveMetricValue: "Irregular dwarf"
    }
  },
  {
    id: "small-magellanic-cloud",
    name: "Small Magellanic Cloud",
    kind: "galaxy",
    scene: "cluster",
    position: [-21, 4, 0],
    accent: "#9bdcff",
    distanceFromEarth: "200,000 light-years",
    diameter: "7,000 light-years",
    facts: [
      "A companion dwarf galaxy to the Milky Way",
      "Linked to the Large Magellanic Cloud by streams of gas"
    ],
    description: "A smaller irregular companion that adds depth to the Local Group scene.",
    focusZoom: 0.75,
    galaxyType: "irregular",
    mass: "7 billion solar masses",
    radiusVisual: 3,
    simulation: {
      motion: "drift",
      driftAmplitude: 0.2,
      phaseOffsetDeg: 310,
      liveLabel: "Companion dwarf sharing the Local Group flow",
      liveMetricLabel: "Companion",
      liveMetricValue: "Milky Way satellite"
    }
  },
  {
    id: "local-group",
    name: "Local Group",
    kind: "region",
    scene: "cluster",
    position: [0, 0, 0],
    accent: "#71d7ff",
    distanceFromEarth: "10 million light-years across",
    diameter: "Group of over 80 galaxies",
    facts: [
      "The Milky Way and Andromeda dominate the Local Group",
      "Embedded in even larger structures such as the Virgo Supercluster"
    ],
    description: "The first major rung on the intergalactic ladder.",
    focusZoom: 0.72,
    galaxyType: "cluster",
    mass: "Over 2 trillion solar masses",
    radiusVisual: 20,
    simulation: {
      motion: "swirl",
      phaseOffsetDeg: 0,
      liveLabel: "Group-scale motion visualized by the ambient clock",
      liveMetricLabel: "Structure",
      liveMetricValue: "More than 80 galaxies"
    }
  }
];
