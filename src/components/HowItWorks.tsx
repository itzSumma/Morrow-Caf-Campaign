import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-cream-border/60 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-caramel">
            Simple 3-Step Process
          </span>
          <h2 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-espresso tracking-tight">
            How to redeem your ₹150 OFF
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-latte">
            No complicated apps or sign-ups. Your discount is ready in three effortless steps.
          </p>
        </div>

        {/* 3-Step Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative flex flex-col rounded-surface-lg border border-cream-border bg-cream-light p-6 sm:p-7 shadow-2xs transition-all duration-300 hover:border-caramel/50 hover:-translate-y-1.5 hover:shadow-md"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-caramel-light font-editorial text-base font-bold text-caramel transition-transform duration-300 group-hover:scale-110">
                  0{step.step}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-latte-light">
                  Step 0{step.step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-5 font-editorial text-lg sm:text-xl font-normal text-espresso">
                {step.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-latte leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
