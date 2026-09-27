import { CAMPAIGN_DETAILS } from "@/lib/constants";

export default function ClaimSection() {
  return (
    <section id="claim" className="border-t border-cream-border/60 bg-cream-subtle/40 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-surface-lg border border-cream-border bg-cream-light p-6 sm:p-10 shadow-sm">
          {/* Header Context */}
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-caramel-light px-3 py-1 text-xs font-semibold text-caramel">
              <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
              Limited In-Store Offer
            </span>
            <h2 className="mt-3 font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-espresso tracking-tight">
              Claim Your {CAMPAIGN_DETAILS.discountDisplay} Voucher
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-latte max-w-md mx-auto leading-relaxed">
              Enter your name and phone number below to receive your claim code. Present it during your visit to Morrow Café in Sector 104, Noida.
            </p>
          </div>

          {/* Form Area Container (Prepared for Phase 3 Form Integration) */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="space-y-4 rounded-surface-md border border-cream-border/80 bg-cream p-5 sm:p-6">
              {/* Full Name Field Shell */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-surface-sm border border-cream-border bg-cream-light px-3.5 py-2.5 text-sm text-espresso placeholder:text-latte-light cursor-not-allowed opacity-90 focus:outline-none"
                    aria-label="Full Name input placeholder"
                  />
                </div>
              </div>

              {/* Phone Number Field Shell */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    disabled
                    placeholder="e.g. 9876543210"
                    className="w-full rounded-surface-sm border border-cream-border bg-cream-light px-3.5 py-2.5 text-sm text-espresso placeholder:text-latte-light cursor-not-allowed opacity-90 focus:outline-none"
                    aria-label="Phone Number input placeholder"
                  />
                </div>
                <p className="mt-1 text-[11px] text-latte">
                  We’ll display your voucher code instantly on screen.
                </p>
              </div>

              {/* Action Button Shell */}
              <button
                type="button"
                disabled
                className="w-full rounded-full bg-caramel py-3 text-sm font-semibold text-white shadow-md shadow-caramel/20 transition-all cursor-not-allowed opacity-95 text-center mt-2"
              >
                {CAMPAIGN_DETAILS.primaryCtaText}
              </button>

              {/* Phase 3 Notice & Security Notes */}
              <div className="pt-2 text-center">
                <p className="text-[11px] text-latte flex items-center justify-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-caramel flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  One voucher per guest • Valid at Sector 104, Noida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
