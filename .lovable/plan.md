## Dorit Smali for YRDSB Trustee 2026 — Campaign Website

Build the campaign website exactly to the reference: warm cream backgrounds, mustard/turquoise/taupe palette, Anton display + Montserrat body + Caveat script, "OUR KIDS" mega hero with stacked text-shadow, and the signature mustard underline accent bar under every section heading.

### Pages (separate routes for SEO/SSR)

- `/` — Home: Hero ("MAKE OUR SCHOOLS WORK FOR / OUR KIDS"), inline Join form (desktop) / standalone form section (mobile), 3 Pillars block, brief teasers + CTA links to deeper pages.
- `/meet-dorit` — Portrait, "from one mom to another" script tag, full bio, "Why I'm Running" pull quote section.
- `/priorities` — Three numbered priority cards (Students First, Responsible Stewardship, A Voice for Families).
- `/community` — "Showing Up Where It Matters" — bio of community work + the four community-work items (food insecurity, women experiencing abuse, homelessness, B.A.M. Organization).
- `/get-involved` — Volunteer / Donate / Endorse action cards + the full Join form.
- `/contact` — Contact section with email, social links, and Join form on a dark background.

Each route gets its own `head()` with unique title, description, og:title, og:description.

### Shared shell

- **Header** (overlay on hero, solid cream on inner pages): logo lockup ("DORIT SMALI" mustard / "YRDSB TRUSTEE 2026" turquoise), nav links, Volunteer (turquoise) + Donate (mustard) buttons. Mobile: hamburger → full-screen ink-colored slide-down menu.
- **Footer**: 3-column (brand + url, nav, legal/authorization line, © 2026).

### Design system implementation

- Replace `src/styles.css` with: Tailwind import + CSS custom properties for the full token set (mustard `#FFDB58`, turquoise `#6EFAFB`, taupe `#968E85`, cream `#F5EFE4`, cream-deep `#EDE5D6`, ink `#1A1A1A`, plus all `-deep` variants).
- Load Anton, Montserrat, Caveat from Google Fonts via `head().links`.
- Map design tokens into Tailwind's `@theme inline` so utilities (`bg-mustard`, `text-turquoise-deep`, `font-display`, etc.) work alongside hand-written component classes.
- Type scale: `--fs-mega: clamp(72px, 10vw, 168px)` for hero, display/h1/h2/h3 per spec.
- Section heading pattern: turquoise eyebrow → Anton uppercase headline → 96px × 4px mustard accent bar.

### Reusable components (`src/components/`)

`Header`, `MobileMenu`, `Logo`, `Footer`, `JoinForm`, `Hero`, `Pillars`, `SectionHeading` (eyebrow + headline + accent bar), `PriorityCard`, `ActionCard`, `CommunityItem`.

### Assets

Use the uploaded portrait + landscape mockup as visual reference only — substitute high-quality stock placeholders (the Unsplash URLs already in `app.jsx`: hero composite + portrait) until real photography is provided. Add a `// TODO` note in the hero/portrait files.

### Form behavior

`JoinForm` is presentational with local submitting state (mock 800ms delay + success toast via existing `sonner`). Backend integration (NationBuilder/Mailchimp) flagged as TODO. Same form is reused in hero, mobile section, get-involved, and contact.

### Out of scope (flag as TODOs)

- Real backend for form submissions
- Real Donate flow / payment processor
- Privacy policy page (linked from form disclaimer)
- Real social URLs and headshot

### Technical notes

- TanStack Start file-based routing under `src/routes/`. Each section file declares its own `head()`.
- Hash-anchor `href="#..."` links from `app.jsx` rewritten to `<Link to="/...">`.
- Mobile breakpoint at 767px swaps hero layout (form moves out, mobile CTAs + scroll indicator appear), per design spec.
- All styles via global `styles.css` component classes (matching the provided `styles.css` from instructions.md), not inline Tailwind, to preserve fidelity to the design system.
