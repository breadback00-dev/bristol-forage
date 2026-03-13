# Bristol Forage

## What This Is
Bristol Forage is an interactive web platform for discovering wild edible plants in Bristol, UK. Map-first interface where users explore locations and discover what's growing nearby, filtered by category and season.

## Tech Stack
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS with custom CSS variables for the earthy colour palette
- **Map:** Leaflet via react-leaflet (must be dynamically imported with `ssr: false`)
- **Data:** Static TypeScript files in `/src/data/` — no database for MVP
- **Community sightings:** localStorage for MVP persistence
- **Deployment target:** Vercel

## Project Structure
```
src/
  app/
    page.tsx              → Map view (landing page)
    layout.tsx            → Root layout with nav
    guide/
      page.tsx            → Field Guide (sidebar + calendar + species cards)
      [slug]/page.tsx     → Individual species detail pages
    community/
      page.tsx            → Sightings feed + submission form
  components/
    map/                  → Map, LocationPin, LocationPanel, SearchBar, CategoryFilter
    guide/                → SpeciesSidebar, SeasonCalendar, SpeciesCard, NutritionBars, ExportButton
    community/            → SightingCard, SubmitForm, PendingReview
    ui/                   → SeasonBadge, PrepBadge, LookalikeWarning
    Nav.tsx               → Top navigation
  data/
    species.ts            → All 17 plant species with full data
    locations.ts          → All 10 Bristol foraging locations
  lib/
    types.ts              → TypeScript interfaces
    seasons.ts            → Season helper functions
    sightings.ts          → localStorage CRUD for community sightings
```

## Design Direction
Organic naturalist aesthetic — earthy greens, warm browns, cream/parchment backgrounds. Think field notebook meets modern web app. Serif headings (Playfair Display), clean sans body (Source Sans 3). Warm, trustworthy, slightly rugged.

### Colour Palette (CSS variables)
- `--green: #4a7c5f` — primary actions, in-season indicators
- `--green-light: #edf4ef` — light green backgrounds
- `--green-dark: #2d5a3d` — headings, nav background
- `--brown: #7a6248` — secondary/hedgerow accent
- `--brown-light: #f5efe8` — brown backgrounds
- `--red: #8a3a2a` — lookalike warnings
- `--red-light: #fdf0ed` — warning backgrounds
- `--border: #e8e4de` — borders
- `--muted: #9a9690` — secondary text
- `--bg: #f7f5f2` — page background
- `--ink: #2a2520` — body text

### Habitat Pin Colours
- Woodland: `#4a7c5f`
- Hedgerow: `#7a6248`
- Wetland: `#557278`
- Grassland: `#6a4878`

## Key Technical Notes
- Leaflet MUST use dynamic import with `ssr: false` — it requires `window`
- Season logic must handle month wrap-around (e.g. Nov–Feb spans year boundary)
- Months are 0-indexed throughout (0 = January)
- Current month: `new Date().getMonth()`
- Export function generates a self-contained HTML blob for download
- All filtering/search is client-side, no loading states needed
- Mobile-first: side panel becomes bottom sheet on small screens, guide sidebar collapses to top filter bar

## Commands
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Lint
```

## Phase Plan
See PHASES.md for the step-by-step build plan with prompts for each phase.

## Legal
Every species detail page and community form must include:
"Personal foraging permitted under the Theft Act 1968. Never uproot plants without landowner permission. Always use multiple identification methods before consuming any wild food."
