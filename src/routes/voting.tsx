import { createFileRoute, redirect } from "@tanstack/react-router";

// People guess /voting; send them to the voting guide.
export const Route = createFileRoute("/voting")({
  beforeLoad: () => {
    throw redirect({ to: "/vote" });
  },
});
