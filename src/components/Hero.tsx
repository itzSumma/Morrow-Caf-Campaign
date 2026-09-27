import Image from "next/image";
import { CAMPAIGN_DETAILS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Above the Fold Narrative & Conversion CTA */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Context Badge for QR Visitors */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cream-border bg-cream-light px-3.5 py-1 text-xs font-medium text-mocha shadow-2xs">
              <span className="inline-block h-2 w-2 rounded-full bg-caramel" />
              <span className="tracking-wide uppercase text-[11px] font-semibold text-latte">
                {CAMPAIGN_DETAILS.location}
              </span>
              <span className="text-latte/40">•</span>
              <span className="text-caramel font-semibold">Special Campaign Offer</span>
            </div>

            {/* Campaign Headline */}
            <h1 className="mt-4 font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-espresso leading-[1.15]">
              Get <span className="italic font-medium text-caramel">{CAMPAIGN_DETAILS.discountDisplay}</span> your next visit.
            </h1>

            {/* Value Proposition */}
            <p className="mt-3.5 sm:mt-4 text-base sm:text-lg text-latte leading-relaxed max-w-xl">
              Welcome to Morrow Café in Sector 104, Noida. Claim your exclusive ₹150 discount code for your next visit.
            </p>

            {/* Primary CTA & Trust Signals */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="#claim"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-caramel px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-caramel/20 transition-all hover:bg-caramel-hover hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-caramel/30 text-center"
              >
                <span>{CAMPAIGN_DETAILS.primaryCtaText}</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-cream-border bg-cream-subtle px-5 py-3.5 text-xs sm:text-sm font-medium text-mocha hover:bg-cream-border/40 transition-colors text-center"
              >
                How it works
              </a>
            </div>

            {/* Micro Reassurance Checklist */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-latte">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-caramel flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant code on screen
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-caramel flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Valid at Sector 104, Noida
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-caramel flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No app download needed
              </span>
            </div>
          </div>

          {/* Right Column: Reference Coffee & Plants Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Image Frame with Editorial Radii & Subtle Border */}
              <div className="overflow-hidden rounded-surface-lg border border-cream-border bg-cream-subtle shadow-md">
                <Image
                  src="/images/coffee-plants.jpg"
                  alt="Coffee and plants at Morrow Café, Sector 104, Noida"
                  width={600}
                  height={800}
                  priority
                  className="h-auto w-full object-cover aspect-3/4 sm:aspect-4/5 transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Editorial Badge */}
              <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6 rounded-surface-md border border-cream-border bg-cream-light/95 p-3 sm:p-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-caramel-light text-caramel font-bold text-sm">
                    ₹150
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-latte">Campaign Offer</p>
                    <p className="text-xs sm:text-sm font-bold text-espresso">Morrow Café • Sec 104</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
