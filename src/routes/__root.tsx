import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="page">
      <Header variant="solid" />
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
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="btn btn--mustard btn--lg">
              Go Home
            </Link>
            <Link to="/contact" className="btn btn--turquoise btn--lg">
              Contact Dorit
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dorit Smali | YRDSB Trustee, King & Vaughan Ward 1" },
      {
        name: "description",
        content:
          "Dorit Smali, York Region District School Board trustee for King Township and Vaughan Ward 1.",
      },
      { name: "author", content: "Dorit Smali" },
      { property: "og:title", content: "Dorit Smali, YRDSB Trustee" },
      {
        property: "og:description",
        content:
          "Dorit Smali, York Region District School Board trustee for King Township and Vaughan Ward 1.",
      },
      { property: "og:site_name", content: "Dorit Smali, YRDSB Trustee" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&display=swap",
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
        <Toaster />
        <AnalyticsConsent />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
