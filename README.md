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

The site auto-deploys to **https://dorit4trustee.com/** on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

How it works:

1. The workflow runs `bun run build` with `DEPLOY_TARGET=github-pages` and `BASE_PATH=/` (the site is served from the apex of the custom domain).
2. `vite.config.ts` reads those env vars and switches TanStack Start into static SPA mode (no Cloudflare Worker), pre-rendering each route to its own HTML file under `dist/client/`.
3. The workflow uses the SPA shell (`dist/client/_shell.html`, falling back to `index.html`) to ensure both `dist/client/index.html` and `dist/client/404.html` exist, writes a `CNAME` file for the custom domain, and adds `.nojekyll`.
4. The artifact is published with `actions/deploy-pages`.

### One-time setup

In the GitHub repo:

1. Go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
2. Under **Custom domain**, set `dorit4trustee.com` and enable **Enforce HTTPS** once the certificate is issued.

After that, every push to `main` deploys automatically.

### Lovable preview

The Lovable preview is unaffected: it doesn't set `DEPLOY_TARGET`, so the dev server runs the full TanStack Start setup at base path `/` exactly as before.

## Project structure

- `src/routes/` — file-based routes (`index.tsx`, `meet-dorit.tsx`, `priorities.tsx`, `community.tsx`, `get-involved.tsx`, `contact.tsx`, `privacy.tsx`)
- `src/components/` — reusable UI (`Header`, `Footer`, `Hero`, `JoinForm`, `SectionHeading`, …)
- `src/styles.css` — design tokens (Mustard / Turquoise / Taupe / Cream palette) and Tailwind theme
