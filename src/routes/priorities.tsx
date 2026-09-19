import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LawnSignCard, PriorityCard } from "@/components/PriorityCard";
import { PRIORITIES, WHY_THIS_MATTERS } from "@/data/priorities";

export const Route = createFileRoute("/priorities")({
  head: () => ({
    meta: [
      { title: "My Priorities — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Five promises for our schools: Excellence Through Merit, Unity and Equality for All, Keep Politics Out of the Classroom, Real Support for Special Education, and Restore School Resource Officers.",
      },
      { property: "og:title", content: "Priorities for Our Schools" },
      {
        property: "og:description",
        content:
          "A back to basics approach that puts student achievement and community harmony first.",
      },
    ],
  }),
  component: PrioritiesPage,
});

function PrioritiesPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="priorities">
          <div className="container">
            <div className="priorities__head">
              <p className="t-eyebrow">Priorities for Our Schools</p>
              <h1 className="section-heading">
                A Back to Basics Approach
                <span
                  className="accent-bar"
                  aria-hidden="true"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </h1>
              <p className="priorities__lede">
                As your trustee, I will put student achievement and community harmony first. Five
                promises:
              </p>
            </div>

            <div className="promises-grid">
              {PRIORITIES.map((p, i) => (
                <PriorityCard key={p.id} priority={p} number={i + 1} variant="detail" />
              ))}
              <LawnSignCard href="/lawn-sign" source="priorities-page-grid" />
            </div>

            <div className="priorities__why">
              <h2 className="section-heading section-heading--sm">Why This Matters</h2>
              <p className="priorities__why-lede">
                Five promises. One goal: schools that work for every family in King-Vaughan.
              </p>
              <ul className="priorities__why-list">
                {WHY_THIS_MATTERS.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
