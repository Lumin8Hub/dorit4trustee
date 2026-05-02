import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// TODO: replace with official portrait of Dorit Smali
const PORTRAIT_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80";

export const Route = createFileRoute("/meet-dorit")({
  head: () => ({
    meta: [
      { title: "Meet Dorit — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Meet Dorit Smali — a mom, business leader, and York Region community builder running for YRDSB Trustee.",
      },
      { property: "og:title", content: "Meet Dorit Smali" },
      {
        property: "og:description",
        content: "A mom, a leader, a neighbour — running to put students first.",
      },
      { property: "og:image", content: PORTRAIT_IMAGE },
    ],
  }),
  component: MeetDoritPage,
});

function MeetDoritPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="meet">
          <div className="meet__inner">
            <div className="meet__photo">
              <img src={PORTRAIT_IMAGE} alt="Portrait of Dorit Smali" />
              <div className="meet__photo-tag t-script">from one mom to another</div>
            </div>

            <div className="meet__copy">
              <p className="t-eyebrow">Meet Dorit Smali</p>
              <h1 className="section-heading">
                A Mom, a Leader,
                <br />a Neighbour.
                <span className="accent-bar" aria-hidden="true" />
              </h1>

              <p>
                A proud wife, mother of two young children, and a dedicated member
                of the York Region community, Dorit has spent her life caring
                about people — and acting on it.
              </p>

              <p>
                For more than 20 years, she has worked as a business leader,
                helping large organizations adopt new technologies to deliver
                better services at a lower cost. That experience comes with a
                clear understanding of how to manage complex budgets, ask the
                right questions, and turn priorities into results.
              </p>

              <p>
                But long before her professional career, Dorit was driven by
                something simpler: a belief that strong communities are built
                when people show up for one another. When she isn't working,
                volunteering, or chasing after her two kids, you'll often find
                her at the pottery wheel, finding calm and creativity in the
                craft.
              </p>
            </div>
          </div>
        </section>

        <section className="why">
          <div className="why__inner">
            <p className="t-eyebrow why__eyebrow">Why I'm Running</p>

            <blockquote className="why__quote">
              <span className="why__quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              Our schools, families, and children deserve strong, caring,
              practical leadership that always puts students first.
              <footer className="why__attribution t-script">— Dorit</footer>
            </blockquote>

            <div className="why__body">
              <p>
                As a parent, my greatest priority is making sure our children
                receive the best possible education. As a community member, I
                believe public schools should be places where every student is
                given the tools to succeed — academically, practically, and
                personally.
              </p>
              <p>
                I'm running for School Board Trustee to bring focus back to the
                classroom: strong academics, practical life skills, and
                meaningful opportunities that prepare students for whatever
                comes next. The YRDSB manages a budget of more than $1.8
                billion. That money belongs to our community, and it should be
                working as hard as possible for our students.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
