import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { DonateModal } from "@/components/DonateModal";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="page">
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p className="t-eyebrow">404</p>
          <h1 className="section-heading" style={{ margin: "16px 0" }}>
            Page Not Found
            <span
              className="accent-bar"
              aria-hidden="true"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </h1>
          <p style={{ marginBottom: 24 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn--mustard btn--lg">
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "A fresh voice for King-Vaughan Ward 1 families. Strong, caring, practical leadership for our YRDSB schools.",
      },
      { name: "author", content: "Dorit Smali Campaign" },
      { property: "og:title", content: "Dorit Smali for YRDSB Trustee 2026" },
      {
        property: "og:description",
        content:
          "A fresh voice for King-Vaughan Ward 1 families. Strong, caring, practical leadership for our YRDSB schools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@500;700&family=Montserrat:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <DonateModal />
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
