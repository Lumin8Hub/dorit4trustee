import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content: "How this website collects, uses and protects your information.",
      },
      { property: "og:title", content: "Privacy | Dorit Smali, YRDSB Trustee" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
  return (
    <PageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      lede="This website only asks for the information needed to respond to you."
    >
      <section className="legal">
        <div className="legal__inner">
          <h2>Whose Website This Is</h2>
          <p>
            {SITE.disclaimer} Information you send through this website is handled by Dorit Smali,
            not by YRDSB.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you use the contact form, we collect your name, email address, the community you
            live in, and the school, topic and message you choose to send. We may also receive basic
            technical information from normal website logs, such as browser type and approximate
            visit time.
          </p>

          <h2>How We Use It</h2>
          <p>
            We use your message only to read and reply to it. If your message is about a YRDSB
            matter, Dorit may follow up through her YRDSB account so it is handled through the
            board's proper channels. We do not add you to any mailing list from the contact form.
          </p>

          <h2>Election Data</h2>
          <p>
            This website does not use voter lists or contact information gathered during the 2026
            election campaign.
          </p>

          <h2>Optional Website Analytics</h2>
          <p>
            If you choose to accept analytics, this website uses Google Analytics 4 to collect
            limited usage information, such as pages visited and general device and browser
            information. Analytics are optional and are not loaded before you accept. You can change
            your choice at any time using the Analytics preferences control in the footer. We do not
            use advertising personalization or Google Signals. Query values other than standard
            source tags are excluded from page-view reporting.
          </p>

          <h2>Cookies and Preferences</h2>
          <p>
            Your analytics choice is stored in your browser's local storage so the site can
            remember it. Google Analytics may use cookies when enabled. This site does not use
            analytics cookies unless you opt in.
          </p>

          <h2>Sharing and Retention</h2>
          <p>
            We do not sell or share personal information. Messages are kept only as long as needed
            to respond and follow up. You can ask us to delete your information at any time by
            emailing {mail}.
          </p>

          <h2>Contact</h2>
          <p>Questions about this policy can be sent to {mail}.</p>
        </div>
      </section>
    </PageShell>
  );
}
