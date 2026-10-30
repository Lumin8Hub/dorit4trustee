import { createFileRoute } from "@tanstack/react-router";
import { RedirectPage, redirectHead } from "@/components/PageShell";

// Retired campaign URL (renamed). Kept so old links, flyers and QR codes still land.
export const Route = createFileRoute("/ward-1")({
  head: () => redirectHead("/schools"),
  component: () => <RedirectPage to="/schools" />,
});
