import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy - Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content: "Privacy information for the Dorit Smali for YRDSB Trustee campaign website.",
      },
      { property: "og:title", content: "Privacy - Dorit Smali for YRDSB Trustee 2026" },
      {
        property: "og:description",
        content: "How campaign contact information is collected, used, and protected.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="t-eyebrow">Privacy</p>
            <h1 className="section-heading">
              Privacy Policy
              <span className="accent-bar" aria-hidden="true" />
            </h1>
            <p className="page-hero__lede">
              This campaign only asks for the information needed to stay in touch with supporters
              and respond to community questions.
            </p>
          </div>
        </section>

        <section className="legal">
          <div className="legal__inner">
            <h2>Information We Collect</h2>
            <p>
              When you submit a form, the campaign may collect your name, email address, phone
              number, postal code, and any message you choose to send. We may also receive basic
              technical information from normal website logs, such as browser type and approximate
              visit time.
            </p>

            <h2>How We Use It</h2>
            <p>
              We use this information to send campaign updates, respond to requests, organize
              volunteers, and understand community interest in the campaign.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can unsubscribe from campaign updates or ask to have your contact information
              removed by emailing <a href="mailto:hello@doritsmali.ca">hello@doritsmali.ca</a>. Text
              messages may also be stopped by replying STOP.
            </p>

            <h2>Sharing</h2>
            <p>
              We do not sell personal information. Information may be shared only with campaign
              service providers or volunteers who need it to support campaign work.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href="mailto:hello@doritsmali.ca">hello@doritsmali.ca</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
