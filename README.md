# Morrow Café Campaign — Sector 104, Noida

A mobile-first, high-conversion promotional campaign landing page for **Morrow Café** (Sector 104, Noida), offering visitors **₹150 OFF** on their next visit. Built as a fast, accessible, and editorial digital touchpoint optimized for QR code foot-traffic and quick social discovery.

---

## ☕ What Was Built

* **Above-the-Fold Value Proposition:** Immediately establishes café identity, the ₹150 discount, concise context, and an instant conversion CTA without requiring a scroll.
* **Streamlined Claim Flow:** Interactive, friction-free claim form asking only for essential details (Name + Phone Number) with real-time validation and numeric keypad optimization.
* **Server-Side Claim Mock API (`POST /api/claim`):** Validates input format, enforces duplicate claim prevention by phone number, generates unique vouchers (e.g., `MORROW-7F2K`), and delivers polite response states.
* **Success UI with Voucher & Copy Action:** Delivers a clear claim code display, instant clipboard copy button, and barista redemption instructions.
* **Editorial & Warm Visual System:** Custom cream and espresso palette styled with serif editorial headlines (`Playfair Display`), clean modern sans body typography (`Plus Jakarta Sans`), and authentic imagery.
* **Full Accessibility & Responsive Polish:** WCAG 2.1 AA compliant color contrast, "Skip to main content" link, visible focus rings, polite `aria-live` feedback, and 44px–48px touch targets.

---

## 🛠️ Stack and Why

| Technology | Purpose | Why Chosen |
|---|---|---|
| **Next.js (App Router)** | Framework | Provides React Server Components (RSC) by default for zero client JavaScript overhead on static content, built-in API route handlers, and automatic image/font optimization. |
| **TypeScript** | Type Safety | Guarantees strict contracts across API requests/responses, form states, and campaign configuration models. |
| **Tailwind CSS v4** | Styling | Enables rapid styling with a customized design token system (colors, surface radii, keyframe animations) with zero runtime CSS overhead. |
| **Next.js Font Optimization** | Typography | Pre-downloads and self-hosts Google Fonts (`Playfair Display` & `Plus Jakarta Sans`) at build time to prevent FOIT/FOUT and eliminate third-party CDN latency. |
| **Next.js Image Component** | Media Optimization | Generates responsive `srcset`, converts images to modern WebP/AVIF formats, and prevents Cumulative Layout Shift (CLS). |

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itzSumma/Morrow-Caf-Campaign.git
   cd Morrow-Caf-Campaign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

5. **Run production build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 💡 Key Technical Decisions

1. **React Server Components (RSC) Architecture:**
   Except for `ClaimForm.tsx` (which requires interactive state management), all sections (`Header`, `Hero`, `OfferDetails`, `HowItWorks`, `Footer`) are rendered as Server Components. This keeps the client-side JavaScript bundle minimal.
2. **Native CSS Micro-Animations:**
   Avoided heavy animation libraries (e.g., Framer Motion). Used pure CSS keyframes (`fadeInSlideUp`, pulsing beacon, button scale transforms) and media queries honoring `prefers-reduced-motion: reduce`.
3. **No External Icon Libraries:**
   Embedded clean, lightweight SVG icons directly to eliminate unnecessary npm package bloat and network requests.

---

## 🔌 API Implementation

### Endpoint
`POST /api/claim`

### Request Payload
```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210"
}
```

### Success Response (HTTP 200)
```json
{
  "success": true,
  "claimCode": "MORROW-9K4P",
  "message": "Your offer has been claimed."
}
```

### Error Responses
- **Validation Failure (HTTP 400):** Missing name or invalid Indian 10-digit mobile number format.
- **Duplicate Claim (HTTP 400):** Same phone number attempting to claim again.
- **Method Not Allowed (HTTP 405):** Calling with non-POST methods.

---

## ♿ Accessibility Considerations

- **Keyboard Navigation:** Includes a skip link (`#main-content`) that appears on first tab focus.
- **Focus Rings:** Distinct, high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-caramel`) on all interactive buttons, links, and inputs.
- **WCAG 2.1 AA Contrast:** Deepened accent tones (`#9C5424` caramel and `#705F53` latte) on the `#FAF7F2` cream background.
- **Screen Reader Announcements:** Form validation alerts and submission states are enclosed in `aria-live="polite"` regions with `aria-describedby` associations.
- **Touch Target Sizing:** All interactive triggers strictly maintain at least 44px by 44px to satisfy mobile ergonomics.

---

## ⚡ Performance Observations

- **LCP (Largest Contentful Paint):** Preloaded hero image using Next.js `priority` and responsive `sizes` attribute.
- **CLS (Cumulative Layout Shift):** 0 CLS achieved through predetermined aspect ratios (`aspect-3/4`, `aspect-16/10`) and height-reserved form elements.
- **Zero Third-Party Font Latency:** Google Fonts are self-hosted via `next/font` with `display: swap`.

---

## 🧭 Product Thinking Decisions

### Decision 1 – Above the Fold Conversion Priority
* **Rationale:** Visitors scanning a physical QR code on a table tent or poster in Sector 104 arrive with low attention spans. Keeping the café branding, ₹150 OFF offer, short value statement, and primary CTA immediately visible without scrolling maximizes claim rates. Supporting details (ambiance, 3-step redemption guide) reinforce trust further down the page without competing with the primary goal.

### Decision 2 – Beyond the Happy Path
* **Duplicate Prevention:** Implemented in-memory server-side tracking to prevent identical phone numbers from claiming vouchers repeatedly.
* **Graceful Network & Input Failures:** The form catches client and server errors cleanly, displaying contextual, human-readable guidance without clearing user input.
* **Production Abuse Considerations:** In a full production rollout, rate limiting (e.g., Redis Upstash) by IP/device fingerprint and campaign expiration timers would be enforced.

---

## ✂️ What Was Cut for Time & Production Roadmap

### Cut for the 3–4 Hour Time Limit:
- SMS Gateway Integration (Twilio/Gupshup) to send code via SMS/WhatsApp.
- Persistent Database (PostgreSQL/Supabase) for durable claim storage across server restarts.
- Barista Scanner Web App for checking and redeeming codes in-store.

### Recommended Production Improvements:
1. **SMS / WhatsApp Webhook:** Send the claim voucher link directly to the user's phone for retrieval upon arrival.
2. **Persistent Storage:** Replace in-memory mock store with Prisma + PostgreSQL.
3. **Location Geofencing / POS Integration:** Direct webhook sync with café point-of-sale (POS) systems.

---

## ⏱️ Approximate Time Spent

| Phase | Description | Time Spent |
|---|---|---|
| **Phase 1** | Project Setup & Clean Foundation | ~20 mins |
| **Phase 2** | Campaign Landing Page & Responsive Layout | ~45 mins |
| **Phase 3** | Accessible Claim Form & Validation | ~35 mins |
| **Phase 4** | Mock Claim API & State Integration | ~35 mins |
| **Phase 5** | Responsive Polish, Accessibility, Micro-interactions | ~40 mins |
| **Phase 6** | Performance & UX Audit | ~20 mins |
| **Phase 7** | Documentation & Deployment Guide | ~25 mins |
| **Total** | | **~3h 40m** |
