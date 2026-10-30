import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { UPDATES, formatDate } from "@/data/updates";

export const Route = createFileRoute("/updates/")({
  head: () => ({
    meta: [
      { title: "Board Updates | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content:
          "What the York Region District School Board decided, how Dorit voted, and what it means for families in King and Vaughan Ward 1.",
      },
      { property: "og:title", content: "Board Updates from Dorit Smali" },
      {
        property: "og:description",
        content: "What the board decided and what it means for your child.",
      },
    ],
  }),
  component: UpdatesPage,
});

function UpdatesPage() {
  return (
    <PageShell
      eyebrow="Board Updates"
      title="Updates from the Board"
      lede="After each board meeting, I'll explain what we decided, how I voted and why, and what it means for families."
    >
      <section className="updates-list">
        <div className="container">
          <div className="update-grid">
            {UPDATES.map((u) => (
              <article key={u.slug} className="update-card">
                <p className="update-card__meta">
                  {u.category} · <time dateTime={u.date}>{formatDate(u.date)}</time>
                </p>
                <h2 className="update-card__title">
                  <Link to="/updates/$slug" params={{ slug: u.slug }}>
                    {u.title}
                  </Link>
                </h2>
                <p className="update-card__summary">{u.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
