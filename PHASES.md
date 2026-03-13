# Bristol Forage — Build Phases

This is your step-by-step plan. Each phase has a goal, what's already done, and the exact prompt to paste into Claude Code.

---

## Phase 0: Setup (you do this manually)

```bash
cd bristol-forage
npm install
npm run dev
```

Verify the dev server starts and you can see the map page at `http://localhost:3000`. The map should load with pins. The Field Guide and Community pages should be navigable.

**If there are TypeScript or build errors**, paste the error into Claude Code and ask it to fix them — that's exactly what it's for.

---

## Phase 1: Polish the Map Experience

**What's already built:** Map with pins, popups, search, category filters, side panel, season indicator.

**What needs work:** The side panel animation, mobile responsiveness (panel should be bottom-sheet on small screens), map zoom controls repositioned, and any Leaflet SSR edge cases.

### Claude Code Prompt:
```
Look at the map page (src/app/page.tsx and src/components/map/). The map works but needs polish:

1. Add a CSS animation for the side panel sliding in from the right (it has the class animate-slide-in but no keyframe defined)
2. On mobile (<768px), make the LocationPanel slide up from the bottom instead of from the right, max-height 70vh, with a drag handle at the top
3. Add Leaflet zoom controls to the bottom-right instead of default top-left
4. Make sure the search bar and category filters don't overlap on small screens — stack them vertically with sensible max-width
5. Test that clicking a pin popup "Explore this location" button opens the side panel correctly

Keep the earthy naturalist design aesthetic — see CLAUDE.md for colour palette.
```

---

## Phase 2: Field Guide Refinements

**What's already built:** Sidebar with search/filter/checkboxes, seasonal calendar table, species cards grid with nutrition bars and lookalike warnings.

**What needs work:** Export button, mobile sidebar collapse, scroll-triggered nutrition bar animation.

### Claude Code Prompt:
```
The Field Guide page (src/app/guide/page.tsx) needs these improvements:

1. Add an Export button above the calendar that generates a printable HTML file of all selected species. It should create a Blob with self-contained HTML including: species name, latin name, season, prep type, habitat, all ID points, harvest notes, uses, storage, lookalike warnings, and the legal disclaimer. Trigger download as "bristol-foraging-guide.html".

2. On mobile (<768px), collapse the left sidebar into a horizontal top bar with: a search input, horizontally scrollable category chips, and a collapsible species list (toggle button to show/hide). The main content should take full width below it.

3. The nutrition bars on species cards should animate from 0 to their value when they scroll into view. Use an IntersectionObserver.

4. Add a "Select All / Deselect All" toggle at the top of the sidebar species list.

Keep all existing functionality working. See CLAUDE.md for design direction.
```

---

## Phase 3: Species Detail Pages

**What's already built:** Full individual pages at /guide/[slug] with all data sections, season bar, lookalike warnings, location cross-references.

**What needs work:** Visual polish, breadcrumb navigation, potential image placeholder cards.

### Claude Code Prompt:
```
The species detail pages (src/app/guide/[slug]/page.tsx) are functional but need visual polish:

1. Add a botanical-style placeholder image at the top of each species page. Generate this as a styled div/SVG with: the species category colour as background, species name in elegant serif typography, and a simple botanical silhouette or icon appropriate to the category (leaf for Greens, mushroom for Fungi, berry cluster for Hedgerow/Fruits, flower for Herbs). These will be replaced with real photos later.

2. Add "Previous" and "Next" species navigation at the bottom of each page.

3. Add a "Find on Map" button that links back to the map page. For now just link to / — later we can pass coordinates as query params.

4. Improve the section layout: add subtle divider lines between sections, slightly more spacing, and ensure the page reads like a field guide entry.

5. Add structured data (JSON-LD) for SEO — use the species data to generate a basic schema.org entry.

See CLAUDE.md for fonts and colour palette.
```

---

## Phase 4: Community Features

**What's already built:** Sighting cards, pending/approved split, submission form with all fields, localStorage persistence.

**What needs work:** Photo preview on form, better form validation UX, confirmation toast instead of alert, and making pending count update in nav badge.

### Claude Code Prompt:
```
The Community page (src/app/community/page.tsx) needs UX improvements:

1. Replace the browser alert on successful submission with a green toast notification that appears at the top of the page and auto-dismisses after 3 seconds.

2. Add photo preview: when a user selects an image file, show a thumbnail preview below the file input before submission.

3. Make the Nav pending badge (src/components/Nav.tsx) reactive — it should update when a sighting is submitted or approved without requiring a page navigation. Consider using a simple context or event-based approach.

4. Add form validation highlighting: fields with errors should get a red border, and the error message should appear below each specific field rather than one generic error.

5. Add a "Clear all sightings" dev/reset button at the bottom of the page (small, muted, clearly labelled as a reset tool).

Keep the earthy naturalist aesthetic. See CLAUDE.md.
```

---

## Phase 5: Final Polish & Deploy

### Claude Code Prompt:
```
Final polish pass before deploying to Vercel:

1. Add a proper favicon — generate a simple SVG leaf icon in forage-green colour, save as public/favicon.svg and reference in layout.tsx.

2. Add an offline-friendly manifest.json and basic PWA meta tags (this is used outdoors, connectivity matters).

3. Run through all pages and fix any Tailwind classes that don't exist (we're using custom forage-* colours, make sure tailwind.config.ts includes all of them).

4. Add a simple 404 page (src/app/not-found.tsx) with the Bristol Forage branding and a "Back to Map" link.

5. Run `npm run build` and fix any build errors.

6. Set up for Vercel deployment: ensure next.config.js has no issues, and add a vercel.json if needed.

7. Add Open Graph meta tags in layout.tsx for social sharing: title, description, and a generated OG image placeholder.
```

---

## Future Phases (Post-Launch)

These are stretch goals for after the MVP is live:

- **Supabase backend** — replace localStorage with a real database for community sightings
- **Real plant photos** — source or photograph species images
- **Foraging routes** — suggested walking routes connecting multiple locations
- **GPS "near me"** — use device location to show nearby foraging spots
- **AI plant identification** — photo upload with species suggestion
- **Seasonal push notifications** — alert when species come into season
