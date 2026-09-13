import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LawnSignForm } from "@/components/LawnSignForm";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/lawn-sign")({
  head: () => ({
    meta: [
      { title: "Request a Lawn Sign — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Request a free Dorit Smali lawn sign for your home in King-Vaughan Ward 1. We deliver it and pick it up after Election Day.",
      },
      { property: "og:title", content: "Request a Lawn Sign" },
      {
        property: "og:description",
        content: "Show your neighbours you are voting for Dorit. We deliver and pick up.",
      },
      {
        property: "og:image",
        content: "https://dorit4trustee.com/images/hero-desktop.png",
      },
    ],
  }),
  component: LawnSignPage,
});

function LawnSignPage() {
  return (
    <div className="page">
      <Header variant="solid" nav="voter" />
      <main>
        <section className="lawn-sign-page">
          <div className="container lawn-sign-page__inner">
            <SectionHeading align="center" eyebrow="Show Your Support">
              Request a Lawn Sign
            </SectionHeading>
            <p className="lawn-sign-page__lede">
              A sign on your lawn tells your neighbours you are voting for Dorit. It takes 30
              seconds to request one. We deliver it, and we collect it after Election Day on October
              26.
            </p>

            <LawnSignForm id="lawn-sign-page" source="lawn-sign-page" />

            <div className="lawn-sign-page__how">
              <h2 className="section-heading section-heading--sm">How It Works</h2>
              <ol className="how-it-works">
                <li>
                  <span className="priority-card__number">1</span>
                  <p>You fill out the form.</p>
                </li>
                <li>
                  <span className="priority-card__number">2</span>
                  <p>We confirm by email within two days.</p>
                </li>
                <li>
                  <span className="priority-card__number">3</span>
                  <p>
                    A volunteer places the sign at your home. After Election Day, we come back and
                    pick it up.
                  </p>
                </li>
              </ol>
            </div>

            <p className="lawn-sign-page__ward-note">
              We can only place signs at addresses in King-Vaughan Ward 1.
              <br />
              Not sure if that is you? <Link to="/ward-1">Check the map.</Link>
            </p>
            <p className="lawn-sign-page__contact">
              Questions? Email <a href="mailto:info@dorit4trustee.com">info@dorit4trustee.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
