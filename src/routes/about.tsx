import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCta } from "@/components/PageShell";
import { SITE } from "@/data/site";

const PORTRAIT_OG = "https://dorit4trustee.com/images/dorit-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dorit Smali | YRDSB Trustee, King & Vaughan Ward 1" },
      {
        name: "description",
        content:
          "Dorit Smali is a mom, business leader and York Region community builder serving as YRDSB Trustee for King Township and Vaughan Ward 1.",
      },
      { property: "og:title", content: "About Dorit Smali" },
      { property: "og:description", content: "A mom, a leader, a neighbour." },
      { property: "og:image", content: PORTRAIT_OG },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="meet">
          <div className="meet__inner">
            <div className="meet__photo">
              <img src="/images/dorit-portrait.webp" alt="Portrait of Dorit Smali" />
            </div>

            <div className="meet__copy">
              <p className="t-eyebrow">About Dorit</p>
              <h1 className="section-heading">
                A Mom, a Leader,
                <br />a Neighbour.
                <span className="accent-bar" aria-hidden="true" />
              </h1>

              <p>
                A proud wife, mother of two young children, and a dedicated member of the York
                Region community, Dorit has spent her life caring about people and acting on it.
              </p>
              <p>
                For more than 20 years, she has worked as a business leader, helping large
                organizations adopt new technologies to deliver better services at a lower cost.
                She knows how to manage complex budgets, ask the right questions, and turn
                priorities into results. That matters on a board that oversees a budget of about{" "}
                {SITE.boardBudget}.
              </p>
              <p>
                Long before her professional career, Dorit was driven by something simpler: a belief
                that strong communities are built when people show up for one another. When she
                isn't working, volunteering, or chasing after her two kids, you'll often find her at
                the pottery wheel.
              </p>
            </div>
          </div>
        </section>

        <section className="facts" aria-label="Dorit in the role">
          <div className="container facts__grid">
            <div className="facts__group">
              <h2 className="facts__title">Serving King &amp; Vaughan Ward 1</h2>
              <ul>
                <li>
                  YRDSB Trustee, {SITE.termStart} to {SITE.termEnd}
                </li>
                <li>Elected October 26, 2026</li>
                <li>
                  Represents 15 schools across King Township and Vaughan Ward 1.{" "}
                  <Link to="/schools">See the schools</Link>
                </li>
              </ul>
            </div>
            <div className="facts__group">
              <h2 className="facts__title">Experience</h2>
              <ul>
                <li>More than 20 years as a business and technology leader</li>
                <li>Experience managing complex budgets for large organizations</li>
                <li>
                  Long-time York Region volunteer: food security, support for women experiencing
                  abuse, homelessness, and local charities including B.A.M. Organization
                </li>
              </ul>
            </div>
            <div className="facts__group">
              <h2 className="facts__title">On the Board</h2>
              <ul>
                <li>Committee appointments are made at the start of the term.</li>
                <li>This section will list Dorit's committees once they are confirmed.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="why">
          <div className="why__inner">
            <p className="t-eyebrow why__eyebrow">Why I Serve</p>
            <blockquote className="why__quote">
              <span className="why__quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              Our schools, families, and children deserve strong, caring, practical leadership that
              always puts students first.
              <footer className="why__attribution t-script">— Dorit</footer>
            </blockquote>
            <div className="why__body">
              <p>
                As a parent, my greatest priority is making sure our children receive the best
                possible education. Public schools should be places where every student is given the
                tools to succeed, academically, practically, and personally.
              </p>
              <p>
                As your trustee, I will keep the focus on the classroom: strong academics, practical
                life skills, and meaningful opportunities that prepare students for whatever comes
                next. The board's budget belongs to our community, and it should work as hard as
                possible for our students.
              </p>
            </div>
          </div>
        </section>
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
