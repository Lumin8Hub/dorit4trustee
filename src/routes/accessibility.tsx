import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content: "Accessibility commitment for dorit4trustee.com and how to report a barrier.",
      },
    ],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <PageShell
      eyebrow="Accessibility"
      title="Accessibility"
      lede="Every family should be able to use this website."
    >
      <section className="legal">
        <div className="legal__inner">
          <h2>Our Goal</h2>
          <p>
            This website aims to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.
            Pages use clear headings, descriptive image text, sufficient colour contrast and
            keyboard-friendly navigation.
          </p>
          <h2>Report a Barrier</h2>
          <p>
            If something on this site is hard to use, or you need information in another format, use
            the <Link to="/contact">contact form</Link> and tell us the page and the problem. We
            will respond and work to fix it.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
