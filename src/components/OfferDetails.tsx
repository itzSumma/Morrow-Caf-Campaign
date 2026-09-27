import Image from "next/image";
import { OFFER_HIGHLIGHTS } from "@/lib/constants";

export default function OfferDetails() {
  return (
    <section id="offer-details" className="border-t border-cream-border/60 bg-cream-subtle/50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-caramel">
            Campaign Highlights
          </span>
          <h2 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-espresso tracking-tight">
            Offer Details
          </h2>
          <p className="mt-3 text-sm sm:text-base text-latte leading-relaxed">
            Get ₹150 OFF your next visit to Morrow Café. Valid at our Sector 104, Noida location.
          </p>
        </div>

        {/* Offer Details Grid & Supporting Space Imagery */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Café Interior Visual */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-surface-lg border border-cream-border bg-cream shadow-sm">
              <Image
                src="/images/cafe-interior.jpg"
                alt="Morrow Café interior in Sector 104, Noida"
                width={700}
                height={450}
                className="h-full w-full object-cover aspect-16/10 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-cream-light">
                <p className="font-editorial text-lg sm:text-xl font-normal">Morrow Café</p>
                <p className="text-xs text-cream-subtle/90">Sector 104, Noida</p>
              </div>
            </div>
          </div>

          {/* Highlights Cards */}
          <div className="lg:col-span-6 order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFER_HIGHLIGHTS.map((item, index) => (
              <div
                key={index}
                className="rounded-surface-md border border-cream-border bg-cream-light p-5 transition-all hover:border-caramel/40 hover:shadow-xs"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-caramel">
                  {item.label}
                </span>
                <p className="mt-1 font-editorial text-lg font-normal text-espresso">
                  {item.value}
                </p>
                <p className="mt-1.5 text-xs text-latte leading-normal">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
