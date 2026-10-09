# twan-nguyen.github.io

Personal portfolio, built with Next.js (static export) and Tailwind CSS, hosted on GitHub Pages at <https://twan-nguyen.github.io>.

## Edit content

All content lives in [`src/data/profile.ts`](src/data/profile.ts), with an English version served at `/` and a Vietnamese version at `/vi/`. Each language has its own root layout under `src/app/(en)` and `src/app/(vi)` so the page gets the right `<html lang>`.

## Design

Visual and content rules live in [`DESIGN.md`](DESIGN.md). Read it before changing the layout, colours, fonts or copy.

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. `npm run build` writes the static site to `out/`.

## Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `out/` to GitHub Pages.
