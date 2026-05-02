## What went wrong

Two issues, one fatal and one cosmetic:

**1. Build output path (the actual failure).** TanStack Start's SPA build emits two folders:

```text
dist/
├── client/   ← static SPA (index.html + assets)  ← THIS is what Pages needs
└── server/   ← prerender helper (not used at runtime)
```

The workflow assumed the old single-folder layout (`dist/index.html`) and crashed at the `cp` step. The build itself succeeded — the log shows `dist/client/assets/...` being written. We just need to point the fallback copy and the Pages upload at `dist/client/`.

**2. Only `/` got prerendered.** The log says `Prerendered 1 pages: /`. The crawler starts at `/` and follows `<a href>`/`<Link>` tags, but the homepage's nav is rendered inside the `Header` component which the crawler may not have walked deeply enough to discover. The site will still work — `404.html` is the SPA fallback so deep links like `/meet-dorit` boot the React app and route client-side — but we lose per-page SEO.

The cheap, deterministic fix: pass an explicit `pages` list to TanStack Start's SPA prerender config so all six routes get their own static HTML.

## Changes

### `.github/workflows/deploy.yml`
Update the two paths after the build:
- `cp dist/client/index.html dist/client/404.html`
- `touch dist/client/.nojekyll`
- `actions/upload-pages-artifact@v3` `with: path: dist/client`

### `vite.config.ts`
Extend the `tanstackStart.spa.prerender` block with an explicit page list so the crawler doesn't have to discover them:

```ts
spa: {
  enabled: true,
  prerender: {
    enabled: true,
    crawlLinks: true,
    pages: [
      { path: "/" },
      { path: "/meet-dorit" },
      { path: "/priorities" },
      { path: "/community" },
      { path: "/get-involved" },
      { path: "/contact" },
    ],
  },
},
```

Each route ends up at `dist/client/<route>/index.html` (or `<route>.html` depending on `autoSubfolderIndex`), giving real SEO for every page. Deep links that aren't in the list still work via `404.html`.

Nothing else changes — Lovable preview, dev server, all source files stay as-is.

## Note on the unrelated warning

The "Node.js 20 actions are deprecated" warning at the bottom is GitHub's own deprecation notice for `actions/checkout@v4`'s runtime. It's not an error and doesn't affect this deployment; GitHub will auto-upgrade these actions before the September 2026 cutoff.

Approve and I'll apply both fixes.