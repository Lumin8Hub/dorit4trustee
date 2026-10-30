import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { RESOURCE_GROUPS } from "@/data/resources";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Useful Links for Families | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content:
          "Quick links to YRDSB governance, school programs, student support, Ontario education resources and local services in King and Vaughan.",
      },
      { property: "og:title", content: "Useful Links for Families" },
      {
        property: "og:description",
        content: "YRDSB, Ontario and local links in one place.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Useful Links for Families"
      lede="The official sources for school boundaries, registration, student support, board policies and more."
    >
      <section className="resources">
        <div className="container resources__grid">
          {RESOURCE_GROUPS.map((group) => (
            <div key={group.title} className="resources__group">
              <h2 className="resources__title">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
