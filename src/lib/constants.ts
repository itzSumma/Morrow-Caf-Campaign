import type { CampaignDetails, CampaignStep } from "@/types/campaign";

export const CAMPAIGN_DETAILS: CampaignDetails = {
  title: "Morrow Café",
  location: "Sector 104, Noida",
  discountAmount: 150,
  discountDisplay: "₹150 OFF",
  primaryCtaText: "Claim ₹150 OFF",
  tagline: "Sector 104, Noida",
  valueProposition: "Claim ₹150 OFF your next visit to Morrow Café in Sector 104, Noida.",
};

export const HOW_IT_WORKS_STEPS: CampaignStep[] = [
  {
    step: 1,
    title: "Claim the offer",
    description: "Enter your name and phone number to claim the offer.",
  },
  {
    step: 2,
    title: "Receive your claim code",
    description: "Get your unique claim code immediately on screen.",
  },
  {
    step: 3,
    title: "Show the code at Morrow Café",
    description: "Present your claim code during your next visit at Sector 104, Noida.",
  },
];

export const OFFER_HIGHLIGHTS = [
  {
    label: "Offer",
    value: "₹150 OFF",
    detail: "Get ₹150 off your next visit",
  },
  {
    label: "Location",
    value: "Sector 104, Noida",
    detail: "Valid at Morrow Café, Sector 104, Noida",
  },
  {
    label: "Redemption",
    value: "In-Store Visit",
    detail: "Show your claim code when you visit the café",
  },
  {
    label: "Code",
    value: "Instant Code",
    detail: "Receive your unique claim code right after claiming",
  },
];
