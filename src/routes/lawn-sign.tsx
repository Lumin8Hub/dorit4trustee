import { createFileRoute } from "@tanstack/react-router";
import { RedirectPage, redirectHead } from "@/components/PageShell";

// Retired campaign URL. Kept so old links, flyers and QR codes still land.
export const Route = createFileRoute("/lawn-sign")({
  head: () => redirectHead("/contact"),
  component: () => <RedirectPage to="/contact" />,
});
