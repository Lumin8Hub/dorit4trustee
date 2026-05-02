# Dorit Smali for YRDSB Trustee 2026

Campaign website for Dorit Smali, candidate for York Region District School Board Trustee, Ward 1 (King & Vaughan).

Built with [TanStack Start](https://tanstack.com/start), React 19, Tailwind CSS v4, and Vite 7.

## Local development

```bash
bun install
bun run dev
```

The dev server runs on http://localhost:8080.

## Deploying to GitHub Pages

The site auto-deploys to **https://lumin8hub.github.io/dorit4trustee/** on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

How it works:

1. The workflow runs `bun run build` with `DEPLOY_TARGET=github-pages` and `BASE_PATH=/dorit4trustee/`.
2. `vite.config.ts` reads those env vars and switches TanStack Start into static SPA mode (no Cloudflare Worker), pre-rendering each route to its own HTML file under `dist/`.
3. The workflow copies `dist/index.html` → `dist/404.html` (the standard GitHub Pages SPA fallback so deep links still work) and adds `.nojekyll`.
4. The artifact is published with `actions/deploy-pages`.

### One-time setup

In the GitHub repo, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. After that, every push to `main` deploys automatically.

### Lovable preview

The Lovable preview is unaffected: it doesn't set `DEPLOY_TARGET`, so the dev server runs the full TanStack Start setup at base path `/` exactly as before.

## Project structure

- `src/routes/` — file-based routes (`index.tsx`, `meet-dorit.tsx`, `priorities.tsx`, `community.tsx`, `get-involved.tsx`, `contact.tsx`)
- `src/components/` — reusable UI (`Header`, `Footer`, `Hero`, `JoinForm`, `SectionHeading`, …)
- `src/styles.css` — design tokens (Mustard / Turquoise / Taupe / Cream palette) and Tailwind theme
