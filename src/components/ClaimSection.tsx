import { CAMPAIGN_DETAILS } from "@/lib/constants";
import ClaimForm from "@/components/ClaimForm";

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

          {/* Form Area Container with Integrated ClaimForm */}
          <div className="mx-auto mt-8 max-w-md">
            <ClaimForm />
          </div>
        </div>
      </div>
    </section>
  );
}
