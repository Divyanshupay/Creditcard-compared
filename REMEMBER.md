# Divyanshu Credit Card Compare — Memory File

## Overview
A Next.js 16.2.9 (Turbopack) credit card comparison/selling website with an editorial magazine aesthetic. Compares 25 Indian credit cards across 7 banks.

## URLs
- **Production:** https://mercury-cards.vercel.app
- **Custom domain:** https://avalonso.me
- **GitHub:** https://github.com/Divyanshupay/Creditcard-compared
- **Auto-deploy:** Push to `main` → Vercel auto-builds

## Design System
Based on Vivid+Co editorial darkroom style + monopo Saigon cinematic elements.
- **Font:** Space Grotesk (via next/font/google) — variable, weights 400/700
- **Background:** Dark atmospheric with layers (gradient orbs, organic liquid, grid, noise)
- **Typography scale:** 14px caption → 136px display headlines, line-height 1.0, tracking -0.02em at display sizes
- **Buttons:** Outlined ghost (1px border, 0px radius, no fill, 14px, tracking 0.02em)
- **Sections:** Full-bleed, no card containers, no rounded corners on sections

## Color Themes (4)
| Theme | BG | Accent | Vibe |
|-------|-----|--------|------|
| Honey | #1a1410 | #f5a623 (amber) | Warm dark |
| Pearl | #f5f0e8 (cream) | #d4785c (terracotta) | Light mode |
| Slate | #0f172a (navy) | #38bdf8 (sky blue) | Clean tech |
| Mint | #0f1a16 (forest) | #2dd4bf (teal) | Fresh |

Theme switcher: fixed bottom-right, 4 color dots. Implemented via CSS custom properties + `data-theme` attribute + `theme-transition` class.

## Project Structure
```
src/
├── app/
│   ├── globals.css          # All styles, themes, animations, utilities
│   ├── layout.tsx           # Root layout with Space Grotesk font
│   └── page.tsx             # Main page composing all sections + atmosphere layers
├── components/
│   ├── header.tsx           # Fixed nav, hide/show on scroll, backdrop-blur
│   ├── logo.tsx             # SVG geometric "D" logo mark
│   ├── hero.tsx             # Full-viewport hero with text reveal, prisms, scroll indicator
│   ├── marquee-ticker.tsx   # Infinite scrolling card stats banner
│   ├── cards-showcase.tsx   # 25 cards across 7 banks with tab/select UI + Apply Now/Review buttons
│   ├── features.tsx         # 4 stat-driven benefit cards with counters
│   ├── comparison-table.tsx # 3-tier table (entry/mid/premium), 12 feature rows
│   ├── testimonials.tsx     # 3 customer testimonials
│   ├── application-form.tsx # Multi-step form (personal → employment → review → submit)
│   ├── footer.tsx           # Links, brand name, email, scroll-to-top
│   ├── theme-provider.tsx   # Theme context + dot switcher UI
│   ├── prism-decoration.tsx # 3D glass prisms with SVG chromatic-aberration filter + mouse parallax
│   ├── organic-liquid.tsx   # Flowing liquid blobs (feTurbulence + feDisplacementMap), mouse-reactive
│   ├── atmosphere.tsx       # Gradient orbs, Mercury flow, noise overlay, grid pattern
│   ├── particle-field.tsx   # 40 floating particles
│   ├── scroll-indicator.tsx # Circular SVG text path "SCROLL TO EXPLORE" + mouse icon
│   └── section-divider.tsx  # Gradient line that scales on scroll between sections
└── lib/
    └── utils.ts             # cn() utility for class merging
```

## Atmosphere Layer Stack (z-index order)
1. z-0: AnimatedGradientOrbs + GridPattern
2. z-1: OrganicLiquid (mouse-reactive liquid blobs)
3. z-2: ParticleField
4. z-3: NoiseOverlay (film grain)
5. z-10: Content wrapper

## Cards Data (25 cards, 7 banks)
- **Axis Bank (4):** ACE, Flipkart, Magnus, Airtel
- **HDFC Bank (4):** Millennia, Regalia Gold, Infinia, Swiggy
- **ICICI Bank (4):** Amazon Pay, Sapphiro, Emeralde, Coral
- **SBI (3):** Cashback, SimplyCLICK, Elite
- **YES Bank (3):** PROSPERITY, Marquee, ACE
- **IDFC FIRST (3):** Select, Wealth, Power
- **AU Bank (4):** LIT, ixigo, SPONT, Ananta

Each card has: id, name, bank, tagline, joiningFee, annualFee, feeWaiver, rewards, features[], applyUrl
Apply URLs point to real bank product pages, target="_blank". Review links go to Google search.

## Key People
- **Brand:** Divyanshu Mishra / Divyanshu
- **Email:** divyanshu@gmail.com
- **GitHub:** Divyanshupay

## Features Implemented
- [x] 25 Indian credit cards from 7 banks with real data
- [x] 4 color themes with smooth transitions
- [x] 3D glass prisms with chromatic-aberration SVG filter
- [x] Organic liquid background (feTurbulence + feDisplacementMap), mouse-reactive
- [x] Floating particle field
- [x] Film grain noise overlay
- [x] Animated gradient orbs
- [x] Grid pattern overlay
- [x] Marquee ticker (scrolling card stats)
- [x] Circular scroll indicator (monopo-style)
- [x] Staggered text reveal animations
- [x] Section dividers with scroll animation
- [x] Scroll progress bar
- [x] Hide/show header on scroll direction
- [x] Responsive with mobile menu
- [x] Multi-step application form
- [x] Testimonials section
- [x] Comparison table with entry/mid/premium tiers
- [x] Smooth scroll for anchor links
- [x] Custom domain (avalonso.me)
- [x] GitHub + Vercel auto-deploy

## Potential Next Steps
- Add more banks/cards
- Actual form backend/submission
- Blog/pages (privacy, terms, about)
- SEO optimization
- Analytics
- Loading states/skeleton
- PWA support
- i18n (Hindi/English)

## Build Commands
```bash
npm run dev      # Development server on :3000
npm run build    # Production build
vercel --prod --yes  # Deploy to Vercel
git push         # Auto-deploys via Vercel GitHub integration
```
