import { createFileRoute } from "@tanstack/react-router";
import { RedirectPage, redirectHead } from "@/components/PageShell";

// Retired campaign URL. Kept so old links, flyers and QR codes still land.
export const Route = createFileRoute("/donate")({
  head: () => redirectHead("/"),
  component: () => <RedirectPage to="/" />,
});
