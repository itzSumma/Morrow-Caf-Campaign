import Link from "next/link";
import { CAMPAIGN_DETAILS } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-cream-border/70 bg-cream/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
        {/* Café Identity */}
        <Link href="/" className="group flex flex-col focus:outline-none">
          <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-espresso transition-colors group-hover:text-caramel">
            {CAMPAIGN_DETAILS.title}
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-latte">
            {CAMPAIGN_DETAILS.location}
          </span>
        </Link>

        {/* Action Button & Offer Tag */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cream-subtle px-3 py-1 text-xs font-semibold text-espresso-soft border border-cream-border">
            <span className="h-1.5 w-1.5 rounded-full bg-caramel animate-pulse" />
            {CAMPAIGN_DETAILS.discountDisplay} Offer
          </span>

          <a
            href="#claim"
            className="inline-flex items-center justify-center rounded-full bg-espresso px-4 py-2 text-xs sm:text-sm font-medium text-cream-light shadow-sm transition-all hover:bg-mocha hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-caramel/40"
          >
            {CAMPAIGN_DETAILS.primaryCtaText}
          </a>
        </div>
      </div>
    </header>
  );
}
