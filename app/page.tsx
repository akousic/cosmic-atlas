import dynamic from "next/dynamic";

const CosmicAtlasApp = dynamic(
  () => import("@/components/cosmic-atlas-app").then((mod) => mod.CosmicAtlasApp),
  {
    ssr: false,
    loading: () => (
      <main className="flex min-h-screen items-center justify-center bg-ink text-white">
        <div className="text-center">
          <p className="font-sans text-sm uppercase tracking-[0.45em] text-white/60">
            Cosmic Atlas
          </p>
          <h1 className="mt-4 font-display text-5xl text-white">Initializing the map of the universe</h1>
        </div>
      </main>
    )
  }
);

export default function Page() {
  return <CosmicAtlasApp />;
}
