import Link from "next/link";
import { CAMPAIGN_DETAILS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-cream-border/70 bg-cream py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-cream-border/60">
          <div>
            <span className="font-editorial text-2xl font-bold tracking-tight text-espresso">
              {CAMPAIGN_DETAILS.title}
            </span>
            <p className="mt-1 text-xs text-latte max-w-sm leading-relaxed">
              Campaign: {CAMPAIGN_DETAILS.discountDisplay} your next visit at {CAMPAIGN_DETAILS.location}.
            </p>
          </div>

          <div className="text-xs text-latte">
            <p className="font-semibold uppercase tracking-wider text-espresso">Location</p>
            <p className="mt-1">{CAMPAIGN_DETAILS.location}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-latte">
          <p>© {new Date().getFullYear()} {CAMPAIGN_DETAILS.title}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="#claim"
              className="min-h-[44px] inline-flex items-center hover:text-caramel transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-sm px-1"
            >
              {CAMPAIGN_DETAILS.primaryCtaText}
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href="#how-it-works"
              className="min-h-[44px] inline-flex items-center hover:text-caramel transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-sm px-1"
            >
              How it works
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
