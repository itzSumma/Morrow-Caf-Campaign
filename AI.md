# AI Usage & Collaboration Report

This document outlines the usage of AI tools during the development of the **Morrow Café Campaign** project, in adherence with assignment guidelines.

---

## 🛠️ Tools Used

* **Google Antigravity / Gemini 3.8 Flash:** Used as the primary AI pair-programming assistant for rapid ideation, structural boilerplate creation, accessibility checking, and technical documentation.

---

## 🤖 What AI Was Used For

1. **Boilerplate & Component Scaffolding:** Generating initial TypeScript interfaces (`ClaimPayload`, `ClaimApiResponse`) and baseline semantic markup for the responsive landing sections.
2. **Design System & Tailwind Tokens:** Creating a cohesive brand palette inspired by café tones (`cream`, `espresso`, `latte`, `caramel`) in Tailwind CSS v4.
3. **Regex & Validation Formulation:** Formulating and refining validation logic for Indian mobile phone numbers (10 digits starting with 6–9, stripping optional +91 prefix, and rejecting repetitive digit inputs like `9999999999`).
4. **Accessibility Auditing:** Verifying ARIA attributes (`aria-live="polite"`, `aria-describedby`, `aria-invalid`), contrast values, and keyboard focus states.

---

## 🌟 One Useful Thing AI Helped With

**Tailwind v4 Theme Configuration & Contrast Optimization:**  
AI was particularly helpful in structuring the `@theme` tokens in `globals.css` and immediately flagging that the initial lighter caramel accent (`#B26E3B`) failed WCAG 2.1 AA contrast requirements when placed against light cream backgrounds. It helped calculate and suggest the deeper `#9C5424` tone, ensuring both visual warmth and accessible legibility.

---

## ⚠️ One Thing AI Got Wrong or Was Changed

**Form Reset & Error Clearence Logic:**  
Initially, the AI's generated claim form retained stale field errors even after a user started correcting their phone number or when the server returned an error. Additionally, on successful submission and code generation, the input state was wiped instantly before the user could confirm their entered details.  
* **Manual Correction:** The input handlers (`handleNameChange`, `handlePhoneChange`) were restructured to clear active errors on edit, and the success state was separated into a dedicated confirmation card that cleanly provides a "Claim Another" reset button rather than an automatic wiping of the screen.

---

## 🔍 What Was Personally Reviewed & Validated

* **API Boundary Contracts:** Personally reviewed `POST /api/claim` to ensure no database leaks, accurate mock delays (600ms simulating network round-trips), and rigorous duplicate phone rejection.
* **Component Architecture:** Ensured that interactive client-side logic (`"use client"`) remained strictly contained within `ClaimForm.tsx`, keeping all parent and surrounding components as pure React Server Components.
* **Mobile Viewport & Touch Ergonomics:** Verified that all clickable elements adhere to the minimum 44px by 44px touch target guidelines across various viewport widths.
* **Git Version Control & Clean Commits:** Monitored commits step-by-step across all 7 development phases to ensure an organized commit history without junk files.
