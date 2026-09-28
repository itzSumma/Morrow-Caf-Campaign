import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OfferDetails from "@/components/OfferDetails";
import HowItWorks from "@/components/HowItWorks";
import ClaimSection from "@/components/ClaimSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-espresso selection:bg-caramel/20 selection:text-espresso overflow-x-clip">
      {/* Brand Header with Quick Action */}
      <Header />

      {/* Main Campaign Flow */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Above the Fold Hero */}
        <Hero />

        {/* Offer Details & Ambiance */}
        <OfferDetails />

        {/* 3-Step Simple Process */}
        <HowItWorks />

        {/* Visual Claim Section with Interactive ClaimForm */}
        <ClaimSection />
      </main>

      {/* Campaign Footer */}
      <Footer />
    </div>
  );
}
