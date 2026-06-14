# portfolio-site

This is a [Next.js](https://nextjs.org) portfolio site.

> NOTE: This README was updated to include a Project Structure overview and a Components reference to help contributors and future you quickly understand the repository layout and purpose of the main components.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Updating Statistics (Codolio)

This project syncs **DSA Progress**, **Fundamentals**, and **GitHub Stats** from the Codolio API. Stats are stored in `public/data/codio-stats.json` and displayed by the stats component.

- API integration code: `lib/codolio-stats.ts`
- Endpoint: `app/api/codolio/route.ts` (GET returns cached stats; POST refreshes cached stats and writes to `public/data/codio-stats.json` — POST requires the cron secret)

Required secrets (for automated updates):
1. `CODOLIO_USER_KEY` — your Codolio username
2. `CODOLIO_CRON_SECRET` — secret token used by the POST endpoint and GitHub Actions

A GitHub Actions workflow updates stats daily (see `.github/workflows/update-stats.yml`). You can also trigger the workflow manually from the Actions tab.

## Running Manual Update (local)

```bash
# start dev server in one terminal
npm run dev

# in another terminal, call the local API endpoint
curl -X POST http://localhost:3000/api/codolio \
  -H "Authorization: Bearer $CODOLIO_CRON_SECRET" \
  -H "Content-Type: application/json"
```

## Project structure

Top-level layout of the repository and purpose of major files/directories:

- app/
  - Next.js App Router directory. Contains route handlers and page components (e.g., `app/page.tsx`, `app/layout.tsx`, and API routes such as `app/api/codolio/route.ts`).
- components/
  - UI components used by the site. See the Components section below for details. Also contains `components/ui/` — a library of reusable atomic UI primitives.
- lib/
  - Utility libraries and integrations (for example `lib/codolio-stats.ts` for Codolio integration).
- public/
  - Static assets (images, `og-image.png`, `sitemap.xml`) and generated data (`public/data/codio-stats.json`).
- styles/
  - Global CSS and any style files used by the site.
- hooks/
  - Custom React hooks used across components.
- scripts/
  - Utility scripts used in development or build tasks.
- .github/
  - GitHub Actions workflows (e.g., update-stats.yml, seo-check.yml), issue/PR templates.
- components.json
  - Component manifest used by the project tooling.
- next.config.mjs
  - Next.js configuration (image optimization, base paths, etc.).
- package.json / pnpm-lock.yaml / package-lock.json
  - Project dependencies and scripts.
- tsconfig.json
  - TypeScript configuration.
- vercel.json
  - Vercel deployment configuration.

This structure reflects a typical Next.js site with a focus on component-driven UI and automated stats + SEO validation workflows.

## Components (overview)

This project contains both page-level components and a comprehensive `components/ui/` primitives library.

Top-level components (found in `components/`):

- hero.tsx
  - The main hero section for the landing page — headline, subheadline, and primary call-to-action.
- navbar.tsx
  - The navigation bar and site header. Handles site navigation links, mobile menu, and branding.
- footer.tsx
  - The site footer with social links, copyright, and contact information.
- sections.tsx
  - Defines and composes the main page sections (projects, about, contact, etc.).
- stats.tsx
  - Renders the Codolio/GitHub/DSA statistics pulled from `public/data/codio-stats.json`.
- DSASection.tsx
  - A specialized section that summarizes algorithm & data structure progress and problem distribution.
- bento-grid.tsx
  - A responsive grid layout used to display projects or cards in a bento-style layout.
- tech-cube.tsx
  - A visual/interactive component showcasing tech stack items (3D cube or animated UI element).
- json-ld-script.tsx
  - Injects JSON-LD structured data (Person, Website, CreativeWork schemas) into the page head for SEO.
- theme-provider.tsx
  - Provides color scheme / theme context (dark/light) to the app.

Components/UI primitives (folder: `components/ui/`)

This folder contains many small, reusable UI components (buttons, inputs, menus, dialogs, layout helpers). They are used throughout the site and include:

- Controls: `button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio-group.tsx`, `switch.tsx`, `slider.tsx`, `input-otp.tsx`
- Navigation & overlays: `drawer.tsx`, `dialog.tsx`, `popover.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`, `navigation-menu.tsx`, `menubar.tsx`
- Layout & display: `card.tsx`, `bento-grid.tsx` (root), `carousel.tsx`, `tabs.tsx`, `table.tsx`, `scroll-area.tsx`, `sidebar.tsx`
- Feedback & status: `toast.tsx`, `toaster.tsx`, `spinner.tsx`, `progress.tsx`, `skeleton.tsx`, `alert.tsx`, `alert-dialog.tsx`
- Form & input helpers: `form.tsx`, `field.tsx`, `label.tsx`, `input-group.tsx`, `button-group.tsx`
- Misc: `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`, `kbd.tsx`, `hover-card.tsx`, `carousel.tsx`, `chart.tsx` (charting helpers)

Many of these files are wrappers and composition helpers around lower-level UI libraries — they provide consistent styling and accessibility patterns across the site. The `ui` folder acts as an internal design system.

## How components are organized and how to add one

- Page-level components live in `components/` and are composed by pages in `app/`.
- Reusable primitives go into `components/ui/`. When adding a new primitive, follow the existing naming and export patterns and add stories/examples if applicable.
- Keep components small and focused: single responsibility, typed props (TypeScript), clear accessibility attributes (aria-*), and unit-friendly (pure rendering where possible).

## Contributing

- Run `npm install` (or `pnpm install`) to install dependencies.
- Start dev server with `npm run dev`.
- Run linting and tests (if available) before opening PRs.
- For visual or component changes, add screenshots or a short demo GIF to the PR description.

## Where to find specific code mentioned in this README

- Codolio integration: `lib/codolio-stats.ts`
- API endpoint: `app/api/codolio/route.ts`
- Stats file: `public/data/codio-stats.json`
- SEO checks & workflows: `.github/workflows/seo-check.yml`
- Component entry points: `components/` and `components/ui/`

---

If you'd like, I can:
- Expand the Components section into a table that documents each file with its props and an example usage.
- Generate a visual tree (ASCII or markdown) of the whole repository.
- Split the long `components/ui/` list into smaller categories with file counts and links to the files.

Tell me which of the above you'd prefer and I'll update the README accordingly.
