import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactCta, PageShell } from "@/components/PageShell";
import { StatusPill } from "@/components/PriorityCard";
import { COMMITMENTS_UPDATED, PRIORITIES, STATUS_LABELS } from "@/data/priorities";

export const Route = createFileRoute("/commitments")({
  head: () => ({
    meta: [
      { title: "My Commitments | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content:
          "Five commitments, tracked in public: merit, unity, politics out of the classroom, special education, and school resource officers.",
      },
      { property: "og:title", content: "Five Promises. Tracked in Public." },
      {
        property: "og:description",
        content: "Where each of Dorit Smali's commitments stands, and the next decision to watch.",
      },
    ],
  }),
  component: CommitmentsPage,
});

function CommitmentsPage() {
  return (
    <PageShell
      eyebrow="My Commitments"
      title="My Commitments to You"
      lede={
        <>
          I made five commitments during the campaign. I am one of 12 elected trustees, so I can't
          deliver any of them alone. Here is where each one stands, what the board has decided, and
          what comes next. <strong>Updated {COMMITMENTS_UPDATED}.</strong>
        </>
      }
    >
      <section className="tracker">
        <div className="container">
          <ul className="tracker__legend" aria-label="Status key">
            {Object.entries(STATUS_LABELS).map(([key]) => (
              <li key={key}>
                <StatusPill status={key as keyof typeof STATUS_LABELS} />
              </li>
            ))}
          </ul>

          {PRIORITIES.map((p, i) => {
            const Icon = p.icon;
            return (
              <article key={p.id} id={p.id} className="commitment">
                <header className="commitment__head">
                  <span className="commitment__number" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="promise-card__icon">
                    <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h2 className="commitment__title">
                    <span className="sr-only">Commitment {i + 1}: </span>
                    {p.title}
                  </h2>
                  <StatusPill status={p.status} />
                </header>

                <div className="commitment__body">
                  <div>
                    <h3>What I committed to</h3>
                    <p>{p.summary}</p>
                    {p.bullets && (
                      <ul className="promise-card__bullets">
                        {p.bullets.map((b) => (
                          <li key={b.label}>
                            <strong>{b.label}:</strong> {b.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h3>Where it stands</h3>
                    <p>{p.progress}</p>
                    {p.log.length > 0 && (
                      <>
                        <h3>Record</h3>
                        <ol className="commitment__log">
                          {p.log.map((entry) => (
                            <li key={entry.date + entry.text}>
                              <strong>{entry.date}:</strong> {entry.text}
                              {entry.source && (
                                <>
                                  {" "}
                                  <a href={entry.source.href}>Source: {entry.source.label}</a>
                                </>
                              )}
                            </li>
                          ))}
                        </ol>
                      </>
                    )}
                    <h3>Next to watch</h3>
                    <p>{p.next}</p>
                  </div>
                </div>
              </article>
            );
          })}

          <p className="tracker__note">
            Have a view on one of these? <Link to="/contact">Tell me.</Link> The original 2026
            platform is kept on the <Link to="/2026-campaign">2026 Campaign</Link> page.
          </p>
        </div>
      </section>
      <ContactCta />
    </PageShell>
  );
}
