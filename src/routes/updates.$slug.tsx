import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ContactCta, PageShell } from "@/components/PageShell";
import { UPDATES, formatDate } from "@/data/updates";

export const Route = createFileRoute("/updates/$slug")({
  loader: ({ params }) => {
    const update = UPDATES.find((u) => u.slug === params.slug);
    if (!update) throw notFound();
    return update;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Dorit Smali, YRDSB Trustee` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: UpdatePage,
});

function UpdatePage() {
  const u = Route.useLoaderData();
  return (
    <PageShell
      eyebrow={`${u.category} · ${formatDate(u.date)}`}
      title={u.title}
      lede={u.summary}
    >
      <section className="legal">
        <article className="legal__inner post">
          {u.body.map((para) =>
            para.startsWith("## ") ? (
              <h2 key={para}>{para.slice(3)}</h2>
            ) : (
              <p key={para.slice(0, 40)}>{para}</p>
            ),
          )}
          {u.sources && u.sources.length > 0 && (
            <>
              <h2>Sources</h2>
              <ul className="post__sources">
                {u.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="post__back">
            <Link to="/updates">All updates</Link>
          </p>
        </article>
      </section>
      <ContactCta />
    </PageShell>
  );
}
