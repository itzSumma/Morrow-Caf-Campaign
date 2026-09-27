# Morrow Café – Assignment Implementation Plan

## Goal

Build a polished, mobile-first campaign landing experience for Morrow Café.

**Campaign:** Get ₹150 OFF your next visit  
**Location:** Sector 104, Noida  
**Primary CTA:** Claim ₹150 OFF  

**Time Budget:** 3–4 hours maximum

---

# Phase 1 – Project Setup

**Time:** 15–20 minutes

### Goal

Set up a clean and minimal Next.js frontend foundation.

### Stack

* Next.js
* TypeScript
* Tailwind CSS
* Next.js Route Handler for the mock API

### Requirements

* Create clean project structure
* Keep dependencies minimal
* Configure responsive foundation
* Do not implement the complete UI yet

### Checklist

* [x] Project runs successfully
* [x] TypeScript configured
* [x] Tailwind works
* [x] No unnecessary dependencies
* [x] Basic folder/component structure is clean

---

# Phase 2 – Campaign Landing Page

**Time:** 45–50 minutes

### Goal

Create the main mobile-first café campaign experience.

### Above the Fold

The first screen should communicate:

1. Morrow Café
2. ₹150 OFF
3. Why the user should claim it
4. Primary CTA

### Sections

* Café identity
* Campaign headline
* Short value proposition
* Primary CTA
* Supporting café imagery
* Offer details
* How it works
* Claim form section

### Visual Direction

* Premium modern café
* Warm editorial aesthetic
* Strong typography
* Generous whitespace
* Clear visual hierarchy
* Restrained color palette
* High-quality imagery

### Checklist

* [ ] Mobile-first
* [ ] Clear CTA
* [ ] Strong hierarchy
* [ ] No unnecessary sections
* [ ] Responsive layout
* [ ] Images sized appropriately

---

# Phase 3 – Claim Form

**Time:** 35–40 minutes

### Required Fields

* Name
* Phone number

### Requirements

* Proper labels
* Name validation
* Phone validation
* `type="tel"`
* Appropriate `autocomplete`
* Mobile-friendly input
* Accessible error messages
* No unnecessary extra fields

### States

* Idle
* Validation error
* Valid input

### Checklist

* [ ] Empty fields handled
* [ ] Invalid phone rejected
* [ ] Valid phone accepted
* [ ] Labels accessible
* [ ] Error messages understandable

---

# Phase 4 – API Integration

**Time:** 35–40 minutes

### Endpoint

`POST /api/claim`

### Request

```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210"
}
```

### Success

```json
{
  "success": true,
  "claimCode": "MORROW-7F2K",
  "message": "Your offer has been claimed."
}
```

### Error

```json
{
  "success": false,
  "message": "Unable to process your request."
}
```

### Client States

```text
Idle
  ↓
Submitting
  ↓
Success / Error
```

### Success UI

Show:

* ₹150 OFF claimed
* Claim code
* Instruction to show the code at the café
* Copy code button

### Requirements

* Prevent duplicate submission
* Handle API failure
* Human-readable errors
* Reliable mock endpoint
* No database required

---

# Phase 5 – Responsive & Interaction Polish

**Time:** 35–40 minutes

### Responsive Targets

* Mobile
* Tablet
* Desktop

### Check

* Typography
* Spacing
* Image sizing
* Inputs
* Buttons
* Touch targets
* Layout hierarchy
* Horizontal overflow

### Interaction

Add one subtle purposeful interaction.

Examples:

* CTA transition
* Form transition
* Success-state transition
* Subtle entrance animation

### Accessibility

* Semantic HTML
* Correct heading order
* Keyboard navigation
* Visible focus states
* Sufficient contrast
* `aria-live`
* `aria-describedby`
* Disabled/loading states
* `prefers-reduced-motion`

---

# Phase 6 – Performance Audit

**Time:** 20–25 minutes

### Check

* Image optimization
* Below-the-fold lazy loading
* Font loading
* Layout shift
* Unnecessary JavaScript
* Unnecessary dependencies
* Client-side rendering
* Bundle size

### Lighthouse

Run Lighthouse and record:

* Performance observations
* Accessibility observations
* What was fixed
* What was intentionally left alone because of the time limit

### Rule

Do not chase a perfect score.

Focus on meaningful issues.

---

# Phase 7 – Documentation & Deployment

**Time:** 30–40 minutes

## README.md

Include:

* What was built
* Stack and why
* Local setup
* Key technical decisions
* API implementation
* Accessibility considerations
* Performance observations
* What was cut for time
* Production improvements
* Product Thinking Decision 1
* Product Thinking Decision 2
* Approximate time spent

## AI.md

Include:

* Tools used
* What AI was used for
* One useful thing AI helped with
* One thing AI got wrong or was changed
* What was personally reviewed

## Deployment

Deploy to:

* Vercel
* Netlify
* Cloudflare Pages
* or equivalent

### Final Checklist

* [ ] GitHub repository works
* [ ] Live URL works
* [ ] Mobile tested
* [ ] Tablet tested
* [ ] Desktop tested
* [ ] Form tested
* [ ] API tested
* [ ] Loading state tested
* [ ] Error state tested
* [ ] Success state tested
* [ ] Copy button tested
* [ ] Lighthouse checked
* [ ] README complete
* [ ] AI.md complete

---

# Product Thinking

## Decision 1 – Above the Fold

Keep the café identity, ₹150 offer, short value proposition, and primary CTA above the fold.

Reason: QR visitors arrive with almost no context, so the first screen should immediately communicate the value and the next action without requiring a scroll.

Supporting information can appear below without competing with the main conversion action.

---

## Decision 2 – Beyond the Happy Path

### Duplicate Claims

Prevent the same phone number from claiming the same campaign repeatedly. This should be enforced server-side rather than relying only on client-side validation.

### Rate Limiting

Protect `/api/claim` from automated abuse by applying appropriate rate limits based on factors such as IP address and request frequency.

### Campaign Expiry

Validate campaign availability server-side. Once the campaign expires, new claims should be rejected and existing codes should follow clearly defined validity rules.

---

# Time Management Rules

1. Do not spend more than 4 hours.
2. Do not add unnecessary features.
3. Prioritize polish over feature count.
4. Review AI-generated code before keeping it.
5. Do not add a library for a problem that can be solved simply.
6. Test the actual user flow before deployment.
7. Stop adding features during the final phase.

---

# Final User Flow

```text
QR Scan
   ↓
Morrow Café Landing Page
   ↓
₹150 OFF
   ↓
Claim ₹150 OFF
   ↓
Name + Phone
   ↓
Validation
   ↓
POST /api/claim
   ↓
Loading
   ↓
Success / Error
   ↓
Claim Code
   ↓
Show code at Morrow Café
```

# Definition of Done

The assignment is complete when the experience:

* Looks polished
* Works well on mobile
* Works on tablet and desktop
* Has a reliable claim flow
* Handles loading/error/success states
* Meets basic accessibility requirements
* Has considered performance
* Is deployed
* Has concise documentation
* Can be explained confidently in a live walkthrough
