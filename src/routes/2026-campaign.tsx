import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ENDORSEMENTS } from "@/data/endorsements";
import { NOMINATION_PHOTO } from "@/data/communityPhotos";
import { ELECTION_RESULT } from "@/data/site";

export const Route = createFileRoute("/2026-campaign")({
  head: () => ({
    meta: [
      { title: "2026 Campaign | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content:
          "Thank you to the volunteers, supporters and endorsers of Dorit Smali's 2026 campaign for YRDSB Trustee, King Township and Vaughan Ward 1.",
      },
      { property: "og:title", content: "Thank You: The 2026 Campaign" },
      {
        property: "og:description",
        content: "Certified results, endorsements and the 2026 platform.",
      },
    ],
  }),
  component: CampaignArchivePage,
});

// Certified totals. Source: Township of King, Certificate of Election Results (Oct 28, 2026).
// "Combined results for the Township of King and City of Vaughan Ward 1."
const RESULTS = [
  { name: "Dorit Smali", votes: 5430, elected: true },
  { name: "Arslan Ahmad", votes: 4606, elected: false },
  { name: "Brier Dodge Phounsy", votes: 3356, elected: false },
];
const TOTAL = RESULTS.reduce((sum, r) => sum + r.votes, 0);

function CampaignArchivePage() {
  return (
    <PageShell
      eyebrow="2026 Campaign"
      title="Thank You"
      lede="To every volunteer who knocked on doors, every family who put up a sign, every endorser and every resident who voted: thank you."
    >
      <section className="legal">
        <div className="legal__inner">
          <h2>The Result</h2>
          <p>
            On October 26, 2026, Dorit Smali was elected YRDSB Trustee for King Township and
            Vaughan Ward 1.
          </p>
          <table className="results-table">
            <caption className="sr-only">
              Certified results, YRDSB Trustee, King Township and Vaughan Ward 1
            </caption>
            <thead>
              <tr>
                <th scope="col">Candidate</th>
                <th scope="col">Votes</th>
                <th scope="col">Share</th>
              </tr>
            </thead>
            <tbody>
              {RESULTS.map((r) => (
                <tr key={r.name} className={r.elected ? "results-table__elected" : undefined}>
                  <th scope="row">
                    {r.name}
                    {r.elected && " (elected)"}
                  </th>
                  <td>{r.votes.toLocaleString("en-CA")}</td>
                  <td>{((r.votes / TOTAL) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="results-table__source">
            Combined results for the Township of King and City of Vaughan Ward 1, certified{" "}
            {ELECTION_RESULT.certifiedOn}. Source:{" "}
            <a href={ELECTION_RESULT.certificateUrl}>
              Township of King, Certificate of Election Results (PDF)
            </a>
            . Shares are of votes cast for the three trustee candidates.
          </p>

          <figure className="archive-photo">
            <img src={NOMINATION_PHOTO.src} alt={NOMINATION_PHOTO.alt} loading="lazy" />
            <figcaption>Filing nomination papers, 2026.</figcaption>
          </figure>

          <h2>The 2026 Platform</h2>
          <p>
            Dorit ran on five commitments: Excellence Through Merit, Unity and Equality for All, Keep
            Politics Out of the Classroom, Real Support for Special Education, and Restore School
            Resource Officers. You can follow the progress on each one on the{" "}
            <Link to="/commitments">Commitments</Link> page.
          </p>
        </div>
      </section>

      <section className="endorsements" aria-labelledby="endorsements-title">
        <div className="endorsements__inner">
          <p className="t-eyebrow endorsements__eyebrow">2026 Endorsements</p>
          <h2 id="endorsements-title" className="endorsements__heading">
            With Thanks to Our Endorsers
          </h2>
          <div className="endorsements__grid">
            {ENDORSEMENTS.map((e) => (
              <article
                key={e.name}
                className={`endorsement-card${e.quote ? "" : " endorsement-card--short"}`}
              >
                <div className="endorsement-card__header">
                  <img
                    className="endorsement-card__photo"
                    src={e.photo}
                    alt={`Portrait of ${e.name}`}
                    loading="lazy"
                    width={112}
                    height={112}
                  />
                  <div className="endorsement-card__text">
                    <h3 className="endorsement-card__name">
                      {e.website ? <a href={e.website}>{e.name}</a> : e.name}
                    </h3>
                    <p className="endorsement-card__role">{e.role}</p>
                    <p className="endorsement-card__riding">{e.riding}</p>
                  </div>
                </div>
                {e.quote && (
                  <blockquote className="endorsement-card__quote">
                    {e.quote.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </blockquote>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
