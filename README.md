# Sourav Kumar Verma — Portfolio

A premium, recruiter-focused portfolio built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Design language inspired by Stripe, Linear, Vercel, and Apple — with smooth motion, dark/light mode, an interactive project showcase, and **live GitHub integration**.

## ✨ Features

- ⚡️ **Vite + React 18 + TypeScript** — fast, type-safe, production-ready
- 🎨 **Tailwind CSS** design system with semantic dark/light theme tokens
- 🌗 **Dark / light mode** with system-preference detection and no flash-of-theme
- 🎬 **Framer Motion** — scroll reveals, magnetic buttons, spotlight cards, marquee
- 🐙 **Live GitHub integration** — repos, languages, and stats fetched in real time
- 🧩 **Interactive project filtering** by category
- ♿️ **Accessible** — skip links, focus rings, reduced-motion support, semantic HTML
- 🔍 **SEO-ready** — Open Graph, Twitter cards, JSON-LD structured data, sitemap, robots
- 📱 **Fully responsive** from 320px to ultrawide

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build -> dist/
npm run preview  # preview the production build locally
```

## ✏️ Editing your content

**All recruiter-facing content lives in one file:** [`src/data/content.ts`](src/data/content.ts).
Update your profile, skills, projects, experience, education, achievements, and socials there — the UI re-flows automatically. No component edits needed.

A few things you may want to personalize:

- **LinkedIn URL** — update `socials[].href` for LinkedIn in `content.ts` (currently a best-guess slug).
- **Résumé** — drop your PDF at `public/resume.pdf` so the "Résumé" button works.
- **OG image** — add `public/og-image.png` (1200×630) for rich link previews.
- **Domain** — replace `https://souravkumarverma.dev/` in `index.html`, `sitemap.xml`, and `robots.txt`.

## 📦 Deployment

This is a static SPA — deploy the `dist/` folder anywhere:

- **Vercel:** import the repo, framework preset **Vite**, build `npm run build`, output `dist`.
- **Netlify:** build `npm run build`, publish directory `dist`.
- **GitHub Pages:** push `dist/` (or use an action).

## 🗂 Project structure

```
src/
  components/
    layout/      Navbar, Footer
    sections/    Hero, About, Skills, Projects, Experience, GitHub, Education, Contact
    ui/          Section, Reveal, SpotlightCard, Magnetic, Button, Badge
  data/content.ts   ← single source of truth for all content
  hooks/         useTheme, useScrollSpy, useMediaQuery
  lib/           github.ts (API), utils.ts
```

Built with care. © 2026 Sourav Kumar Verma.
