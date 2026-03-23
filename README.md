# W3 Landing Page

A Bitcoin-native Web3 landing page built with React, TypeScript, Vite, Tailwind CSS v4, and GSAP.

This project is a single-page marketing experience with a motion-heavy intro, animated hero, content modules, blog reveal, footer navigation, and a floating circular CTA.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- GSAP with `@gsap/react`
- React Icons

## What Is Included

- Intro overlay that reveals the hero section
- Animated hero with layered motion sequencing
- Expandable infrastructure module cards
- Scroll-driven secondary feature section
- Blog section with pinned reveal behavior
- Footer with mobile accordion navigation
- Shared reduced-motion hook for animation fallbacks

## Getting Started

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    Blog.tsx
    CircularText.tsx
    Footer.tsx
    Hero.tsx
    HeroProtocolPanel.tsx
    IntroOverlay.tsx
    ModuleOne.tsx
    ModuleTwo.tsx
  hooks/
    usePrefersReducedMotion.ts
  assets/
  App.tsx
  index.css
  main.tsx
```

## Motion Notes

- GSAP powers the intro, hero, module, blog, and footer animations.
- `usePrefersReducedMotion` centralizes reduced-motion handling across animated components.
- Timing-heavy animation logic stays inside each component so markup and choreography remain close together.

## Development Notes

- Styling is primarily handled with Tailwind utility classes in component files.
- The project is currently structured as a functional landing page, so navigation links are intentionally hardcoded for the current experience.
- Static content for sections is still defined inside component files and can be extracted later if the project grows.

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` runs TypeScript build checks and creates a production bundle
- `npm run lint` runs ESLint
- `npm run preview` serves the production build locally
