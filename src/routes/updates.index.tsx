import { createFileRoute } from "@tanstack/react-router";
import { ExternalRedirectPage, redirectHead } from "@/components/PageShell";
import { BOARD_NEWS_URL } from "@/data/site";

// Board updates are not republished here. Old /updates links go straight to the YRDSB newsroom.
export const Route = createFileRoute("/updates/")({
  head: () => redirectHead(BOARD_NEWS_URL),
  component: () => <ExternalRedirectPage href={BOARD_NEWS_URL} label="the YRDSB newsroom" />,
});
