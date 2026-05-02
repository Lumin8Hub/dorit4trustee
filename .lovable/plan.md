## Goal

Deploy this site to **https://lumin8hub.github.io/dorit4trustee/** via GitHub Actions, while keeping the Lovable preview (which runs the TanStack Start dev server) working exactly as it does today.

## Why this needs more than a workflow file

The project is built on **TanStack Start** — a full-stack SSR framework that, by default, produces a Cloudflare Worker bundle. GitHub Pages only serves **static files** (no Node, no Workers, no server-side rendering). Two things must change before a workflow can deploy anything:

1. The production build must emit static HTML/JS/CSS instead of a Worker bundle.
2. All asset URLs must be prefixed with `/dorit4trustee/` so they resolve under the project-page subpath, but only for the GitHub Pages build — not in the Lovable preview.

The good news: the site has no server functions, no loaders, and no API routes, so it converts cleanly to a static SPA. TanStack Start has a built-in `spa` mode that does exactly this (renders an SPA shell + optionally pre-renders each known route to HTML for SEO and fast first paint).

## What changes

### 1. `vite.config.ts` — add a Pages-only static build mode

Pass options to the Lovable wrapper so that **only when building for GitHub Pages**:
- Cloudflare Worker plugin is disabled (`cloudflare: false`)
- TanStack Start runs in `spa` mode with `prerender.enabled = true` and `crawlLinks = true` (so `/`, `/meet-dorit`, `/priorities`, `/community`, `/get-involved`, `/contact` each get a real HTML file)
- Vite `base` is set from a `BASE_PATH` env var (defaults to `/` so the Lovable preview is unaffected)

The Lovable preview and dev server keep their current behavior because the new branch is gated on `process.env.DEPLOY_TARGET === 'github-pages'`.

### 2. `src/router.tsx` — make the router base-path aware

Add `basepath: import.meta.env.BASE_URL` to `createRouter(...)`. Vite injects `BASE_URL` from the `base` config, so this is `/` in preview/dev and `/dorit4trustee/` in the GitHub Pages build. All `<Link to="/contact">` calls keep working unchanged.

### 3. `public/.nojekyll` and `public/404.html` strategy

- Add an empty `public/.nojekyll` so GitHub Pages serves files/folders that start with `_`.
- The workflow copies the built `index.html` to `404.html` after the build. This is the standard GitHub-Pages SPA fallback so any unknown deep link still boots the React app, which then routes client-side. (Pre-rendered routes will serve their own HTML directly; this only matters for edge cases.)

### 4. `.github/workflows/deploy.yml` — the workflow

A standard GitHub Pages deploy workflow:
- Trigger: push to `main` + manual `workflow_dispatch`
- Permissions: `pages: write`, `id-token: write`
- Steps: checkout → setup Bun → `bun install --frozen-lockfile` → `DEPLOY_TARGET=github-pages BASE_PATH=/dorit4trustee/ bun run build` → copy `dist/index.html` → `dist/404.html` → touch `dist/.nojekyll` → `actions/upload-pages-artifact` → `actions/deploy-pages`
- Concurrency group `pages` so overlapping pushes don't race.

### 5. `package.json` — no new dependencies

All needed pieces (`@tanstack/react-start` SPA mode, the existing Lovable wrapper, Vite) are already installed. No new packages.

### 6. `README.md` — short "Deploying" section

One paragraph explaining: pushing to `main` triggers GitHub Actions, which builds the static SPA at base path `/dorit4trustee/` and publishes to Pages. Note that the Lovable preview is unaffected because it doesn't set `DEPLOY_TARGET`.

## What does NOT change

- `src/routes/__root.tsx`, every page route, components, styles — untouched.
- The Lovable preview build path, sandbox config, port 8080 — untouched.
- `wrangler.jsonc` stays (it's only consulted by the Cloudflare plugin, which is disabled in the Pages build).
- No conversion to React Router DOM, no `BrowserRouter`/`HashRouter`, no `_redirects` file.

## Caveats / things to know

- The `JoinForm` currently fakes a submit with `setTimeout` — it will keep working on Pages because there is no real backend yet. Wiring it to Mailchimp/NationBuilder is out of scope for this change.
- First Pages deployment requires a one-time manual step in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow itself doesn't need to do anything — just toggling the source. I'll mention this in the README.
- Pre-rendering runs the React app in Node during the build; if any route references `window`/`document` at module top level it would crash. A quick scan of the current routes shows none do, so this should be clean.

## Technical reference (for implementation)

```text
vite.config.ts
  defineConfig({
    cloudflare: process.env.DEPLOY_TARGET === 'github-pages' ? false : undefined,
    tanstackStart: process.env.DEPLOY_TARGET === 'github-pages'
      ? { spa: { enabled: true, prerender: { enabled: true, crawlLinks: true } } }
      : undefined,
    vite: { base: process.env.BASE_PATH ?? '/' },
  })

src/router.tsx
  createRouter({ ..., basepath: import.meta.env.BASE_URL })

.github/workflows/deploy.yml
  env:
    DEPLOY_TARGET: github-pages
    BASE_PATH: /dorit4trustee/
```

Approve this and I'll implement everything in one pass.