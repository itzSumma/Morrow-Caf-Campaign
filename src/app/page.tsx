export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      {/* Basic Header Shell */}
      <header className="w-full border-b border-cream-border/60 bg-cream/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-md sm:max-w-xl md:max-w-2xl items-center justify-between px-5 py-4">
          <div className="flex flex-col">
            <span className="font-editorial text-xl sm:text-2xl font-semibold tracking-wide text-espresso">
              Morrow Café
            </span>
            <span className="text-[11px] tracking-widest uppercase text-latte">
              Sector 104, Noida
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-subtle px-3 py-1 text-xs font-medium text-mocha border border-cream-border">
            <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
            Phase 1 Setup
          </span>
        </div>
      </header>

      {/* Basic Content Shell */}
      <main className="flex-1 w-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl px-5 py-10 sm:py-14 flex flex-col justify-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="inline-block rounded-full bg-caramel-light px-3.5 py-1 text-xs font-medium text-caramel">
              Design &amp; Tech Foundation
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-espresso font-normal tracking-tight text-balance">
              Where coffee meets craftsmanship.
            </h1>
            <p className="text-sm sm:text-base text-latte leading-relaxed">
              Foundation established for the Morrow Café campaign. Configured with Next.js App Router, TypeScript, and a refined editorial design system.
            </p>
          </div>

          {/* Design Foundation Preview Card */}
          <div className="rounded-surface-lg border border-cream-border bg-cream-light p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-cream-border/60 pb-3">
              <h2 className="text-xs uppercase tracking-widest text-latte font-semibold">
                Visual Foundation
              </h2>
              <span className="text-xs text-latte">Sector 104 • Noida</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-surface-sm bg-cream p-3 border border-cream-border">
                <span className="block text-[10px] uppercase tracking-wider text-latte mb-1">
                  Palette
                </span>
                <span className="font-medium text-espresso">Cream &amp; Espresso</span>
              </div>
              <div className="rounded-surface-sm bg-cream p-3 border border-cream-border">
                <span className="block text-[10px] uppercase tracking-wider text-latte mb-1">
                  Typography
                </span>
                <span className="font-medium text-espresso">Editorial Serif &amp; Sans</span>
              </div>
            </div>

            <p className="text-xs text-latte-light italic">
              Ready for Phase 2: Campaign Landing Page implementation.
            </p>
          </div>
        </div>
      </main>

      {/* Basic Footer Shell */}
      <footer className="w-full border-t border-cream-border/60 py-6">
        <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl px-5 text-center text-xs text-latte">
          © {new Date().getFullYear()} Morrow Café. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
