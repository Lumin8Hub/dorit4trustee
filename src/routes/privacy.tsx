import { createFileRoute, Link } from "@tanstack/react-router";
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
  const form = <Link to="/contact">contact form</Link>;
  return (
    <PageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      lede="What we collect, why, and how to ask us to remove it."
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
            <strong>Join Team Dorit sign-up:</strong> your name, email address, optional mobile
            number, home street address, community and postal code, and, if you choose to tell us,
            which school board you vote for, whether you are a YRDSB parent and how you would like
            to help.
          </p>
          <p>
            <strong>Contact form:</strong> your name, email address, the community you live in, and
            the school, topic and message you choose to send.
          </p>
          <p>
            We may also receive basic technical information from normal website logs, such as
            browser type and approximate visit time.
          </p>

          <h2>How We Use It</h2>
          <p>
            Sign-up information is used to keep in touch with supporters: invitations to community
            events, volunteer opportunities and Dorit's future election campaigns. Your address
            helps us confirm that you live in King Township or Vaughan Ward 1 and organize local
            events and volunteers. We only send you messages if you check the consent box, and you
            can unsubscribe at any time.
          </p>
          <p>
            Contact-form messages are used to read and reply to you. If your message is about a
            YRDSB matter, Dorit will follow up through her official YRDSB account so it is handled
            through the board's proper channels.
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
            Your analytics choice is stored in your browser's local storage so the site can remember
            it. Google Analytics may use cookies when enabled. This site does not use analytics
            cookies unless you opt in.
          </p>

          <h2>Sharing and Retention</h2>
          <p>
            We do not sell personal information or share it with YRDSB or any other organization.
            Supporter information is kept until you ask us to remove it. Messages are kept only as
            long as needed to respond and follow up. You can ask us to delete your information at
            any time through the {form}.
          </p>

          <h2>Contact</h2>
          <p>Questions about this policy can be sent through the {form}.</p>
        </div>
      </section>
    </PageShell>
  );
}
