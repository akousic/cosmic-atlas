# Cosmic Atlas

Cosmic Atlas is a cinematic interactive map of the universe built with Next.js, React Three Fiber, Three.js, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

The experience is organized as layered scale zones so users can move from Earth through the Solar System, nearby stars, the Milky Way, nearby galaxies, and black holes without trying to render the entire universe in one coordinate system.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Framer Motion
- Zustand

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

## Deployment

The repository includes GitHub Actions CI/CD for Vercel production deploys on every push to `main`:

- Workflow: [.github/workflows/vercel-production.yml](/Users/kousic/Desktop/codex/cosmic-atlas/.github/workflows/vercel-production.yml)

Set these GitHub repository secrets before relying on the workflow:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from the `.vercel/project.json` file after linking the project locally with Vercel, or from the Vercel project settings.

## Controls

- Scroll: zoom between cosmic scales
- Drag: pan the current view
- Right-drag: orbit the camera
- Click object: focus and move into that scene
- Click scale navigator: jump to a representative anchor in that zone

## Project structure

```text
app/                  Next.js app shell and global styles
components/           UI, canvas shell, and reusable 3D helpers
data/                 Structured cosmic datasets
hooks/                Client hooks such as guided journey behavior
lib/                  State, constants, scale math, and shared types
scenes/               Individual React Three Fiber scene layers
```

## Key systems

### Layered scene model

The universe is split into distinct scene layers:

- `planet`
- `solar`
- `stellar`
- `galactic`
- `cluster`
- `blackhole`

These layers crossfade using zoom thresholds defined in [lib/scale.ts](/Users/kousic/Desktop/codex/cosmic-atlas/lib/scale.ts).

### Camera and navigation

Camera navigation is handled in [components/universe-canvas.tsx](/Users/kousic/Desktop/codex/cosmic-atlas/components/universe-canvas.tsx) with `CameraControls`.

The camera state is synchronized into the Zustand store in [lib/store.ts](/Users/kousic/Desktop/codex/cosmic-atlas/lib/store.ts), which keeps the UI, active scene, and focus target aligned.

### Data

The main datasets live in:

- [data/planets.ts](/Users/kousic/Desktop/codex/cosmic-atlas/data/planets.ts)
- [data/stars.ts](/Users/kousic/Desktop/codex/cosmic-atlas/data/stars.ts)
- [data/galaxies.ts](/Users/kousic/Desktop/codex/cosmic-atlas/data/galaxies.ts)
- [data/blackholes.ts](/Users/kousic/Desktop/codex/cosmic-atlas/data/blackholes.ts)
- [data/facts.ts](/Users/kousic/Desktop/codex/cosmic-atlas/data/facts.ts)

### Scenes

Each scale zone is isolated in its own scene component:

- [scenes/earth-scene.tsx](/Users/kousic/Desktop/codex/cosmic-atlas/scenes/earth-scene.tsx)
- [scenes/solar-system-scene.tsx](/Users/kousic/Desktop/codex/cosmic-atlas/scenes/solar-system-scene.tsx)
- [scenes/star-neighborhood-scene.tsx](/Users/kousic/Desktop/codex/cosmic-atlas/scenes/star-neighborhood-scene.tsx)
- [scenes/milky-way-scene.tsx](/Users/kousic/Desktop/codex/cosmic-atlas/scenes/milky-way-scene.tsx)
- [scenes/galaxy-cluster-scene.tsx](/Users/kousic/Desktop/codex/cosmic-atlas/scenes/galaxy-cluster-scene.tsx)
- [scenes/black-hole-scene.tsx](/Users/kousic/Desktop/codex/cosmic-atlas/scenes/black-hole-scene.tsx)

## Current experience

- Landing hero with “Start Exploring”
- Interactive scale navigator
- Object info panel with facts
- Guided journey mode
- Procedural starfield and nebula accents
- Procedural planet textures
- Black hole shader effect

## Notes

- The project currently favors desktop-first navigation.
- Visual textures are generated procedurally in code rather than loaded from a texture asset pipeline.
- Light Travel Mode has been removed from the current build.
