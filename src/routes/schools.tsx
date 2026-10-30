import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { ContactCta, PageShell } from "@/components/PageShell";
import { ELEMENTARY, SECONDARY, type School } from "@/data/schools";

export const Route = createFileRoute("/schools")({
  head: () => ({
    meta: [
      { title: "Our Schools | Dorit Smali, YRDSB Trustee, King & Vaughan Ward 1" },
      {
        name: "description",
        content:
          "The 13 elementary and 2 secondary YRDSB schools in King Township and Vaughan Ward 1, with the trustee area map.",
      },
      { property: "og:title", content: "Schools in King & Vaughan Ward 1" },
      {
        property: "og:description",
        content: "Find your school and see the YRDSB trustee area map.",
      },
    ],
  }),
  component: SchoolsPage,
});

function SchoolList({ title, schools }: { title: string; schools: School[] }) {
  return (
    <div>
      <h3 className="ward-map__school-type">
        {title} ({schools.length})
      </h3>
      <ul className="ward-map__school-list">
        {schools.map((s) => (
          <li key={s.name}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.name}
              <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only"> (opens the school website)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SchoolsPage() {
  return (
    <PageShell
      eyebrow="Our Schools"
      title="Schools I Represent"
      lede={`King Township and Vaughan Ward 1 include ${ELEMENTARY.length} elementary and ${SECONDARY.length} secondary York Region District School Board schools.`}
    >
      <section className="ward-map">
        <div className="container">
          <div className="ward-map__schools">
            <div className="ward-map__school-grid">
              <SchoolList title="Elementary Schools" schools={ELEMENTARY} />
              <SchoolList title="Secondary Schools" schools={SECONDARY} />
            </div>
            <p className="ward-map__caption">
              Source:{" "}
              <a href="https://www2.yrdsb.ca/node/1360">
                YRDSB, King and Vaughan Ward 1 trustee page
              </a>
              . Not sure which school serves your address? Use YRDSB's{" "}
              <a href="https://www2.yrdsb.ca/schools-programs/school-boundaries">
                school boundaries tool
              </a>
              .
            </p>
          </div>

          <div className="ward-map__image-wrap">
            <h2 className="section-heading section-heading--sm">Trustee Area Map</h2>
            <img
              src="/images/ward_1_map.webp"
              alt="York Region District School Board Trustee Electoral Area 2026–2030: King-Vaughan Ward 1, showing ward boundaries K1 through K6 and V1 with elementary and secondary school locations"
              className="ward-map__image"
              width={1196}
              height={1550}
              loading="lazy"
            />
          </div>

          <div className="info-panel">
            <h2 className="section-heading section-heading--sm">School Councils</h2>
            <p>
              Every school has a school council of parents, staff and community members. It is the
              best way to have a say at your child's school. If your school council would like me
              to attend a meeting, please get in touch.
            </p>
            <p>
              <a href="https://www2.yrdsb.ca/schools-programs/school-councils-0">
                Learn about YRDSB school councils
              </a>
            </p>
          </div>
        </div>
      </section>
      <ContactCta heading="Invite Dorit to Your School Council" />
    </PageShell>
  );
}
