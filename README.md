# The Fridge Vending — Marketing Site

Premium one-page site for **The Fridge Vending** — AI smart vending machines placed
in local businesses at no charge.

**Stack:** React 19 · Vite 6 · Tailwind CSS v4 · GSAP (ScrollTrigger) · Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Deploy

The build in `dist/` is fully static. Drag-and-drop `dist/` to **Netlify** or connect the
repo to **Vercel** (framework preset: Vite). No server needed.

## Project structure

```
src/
  App.jsx                 # section composition + ScrollTrigger refresh
  main.jsx
  index.css               # Tailwind v4 @theme design tokens + primitives
  lib/
    gsap.js               # single GSAP + ScrollTrigger registration
    content.js            # ALL marketing copy & data (edit text here)
  hooks/
    useSmoothScroll.js    # Lenis <-> ScrollTrigger sync (auto-off for reduced motion)
    useReducedMotion.js
  components/
    Nav, Hero, StorySection, PerfectFor, ProductUniverse,
    HowItWorks, NoCost, SmartExperience, FinalCTA, Contact, Footer
    ui/  Reveal.jsx  SplitHeading.jsx  Icon.jsx
public/assets/            # logo + machine images
```

To change any wording, edit **`src/lib/content.js`** — it drives every section.

## Accessibility / performance

- Full `prefers-reduced-motion` support: Lenis and all decorative GSAP animation
  switch off, content is shown statically.
- Animations use transform/opacity only; images lazy-load below the fold.

## ⚠️ Handoff notes / TODO before launch

1. **Domain:** files use `TheFridgeVending.com` (matches the business card). The brief
   wrote `TheFridgeVendng.com` — confirm the correct spelling in `src/lib/content.js`.
2. **Contact form email:** currently opens the visitor's mail app to
   `hello@thefridgevending.com` (placeholder in `content.js`). Once the real inbox
   exists, either update that address or wire the form to **Netlify Forms** /
   **Formspree** (see `handleSubmit` in `src/components/Contact.jsx`).
3. **Supplier photos:** `machine-angle.png` (the hero render), `context-breakroom.jpg`
   (the real break-room placement shot in the "Seeing Is Believing" section) plus
   `machine-mini / tall / double / 550 / 440 / 620s.png` are temporary placeholders
   pulled from the supplier (hahavending.com). **Replace with licensed/owned
   photography before public launch** — authorization pending. The client's own flat
   machine photo (`vending-hero.png`) is bundled as a fallback if needed.
4. **AI assistant:** planned for a later phase — a good spot is a floating widget
   mounted in `App.jsx`.
5. Add real favicon/OG image (currently uses the logo).
```
