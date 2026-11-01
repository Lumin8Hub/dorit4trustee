import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageSquare } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { SITE, SOCIAL_LINKS } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Dorit Smali | YRDSB Trustee, King & Vaughan Ward 1" },
      {
        name: "description",
        content:
          "Send Dorit Smali, YRDSB Trustee for King Township and Vaughan Ward 1, a message or an event invitation, and find out who to contact first about a school concern.",
      },
      { property: "og:title", content: "Contact Dorit Smali" },
      {
        property: "og:description",
        content: "Messages and event invitations. Dorit reads every message.",
      },
    ],
  }),
  component: ContactPage,
});

const PATH = [
  { who: "Your child's teacher", when: "Questions about the classroom, homework or progress." },
  { who: "The principal", when: "School-level concerns, or if the teacher can't resolve it." },
  {
    who: "The school superintendent",
    when: "Concerns that haven't been resolved at the school. Your principal can tell you who this is.",
  },
  {
    who: "Me, your trustee",
    when: "Board policy, the budget, issues affecting many students, or when the earlier steps haven't worked.",
  },
];

function ContactPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="contact">
          <div className="contact__inner">
            <div className="contact__copy">
              <p className="t-eyebrow">Contact</p>
              <h1 className="section-heading section-heading--light">
                I Want to Hear
                <br />
                From You.
                <span className="accent-bar" aria-hidden="true" />
              </h1>
              <p>
                Want me at your community event or gathering? Have a message for me? Use the form
                and I'll get back to you. I read every one.
              </p>
              <ul className="contact__details">
                {SITE.yrdsbEmail ? (
                  <li>
                    <Mail size={18} strokeWidth={2} aria-hidden="true" />
                    <span>
                      Board matters: email me at{" "}
                      <a href={`mailto:${SITE.yrdsbEmail}`}>{SITE.yrdsbEmail}</a>
                    </span>
                  </li>
                ) : (
                  <li>
                    <MessageSquare size={18} strokeWidth={2} aria-hidden="true" />
                    <span>
                      Board matters will go to my official YRDSB email, which I'll post here once
                      it's set up. Until then, please use this form.
                    </span>
                  </li>
                )}
                <li className="contact__social-links">
                  {SOCIAL_LINKS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ))}
                </li>
              </ul>
              <p className="contact__join">
                Want to come to events or help with the next campaign?{" "}
                <Link to="/get-involved">Join Team Dorit</Link>.
              </p>
            </div>

            <div className="contact__form">
              <ContactForm />
            </div>
          </div>
        </section>

        <section id="who-to-contact" className="contact-path" aria-labelledby="path-title">
          <div className="container">
            <p className="t-eyebrow">Get the Fastest Answer</p>
            <h2 id="path-title" className="section-heading">
              Who to Contact First
              <span className="accent-bar" aria-hidden="true" />
            </h2>
            <ol className="contact-path__steps">
              {PATH.map((step, i) => (
                <li key={step.who}>
                  <span className="contact-path__number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{step.who}</h3>
                    <p>{step.when}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="contact-path__note">
              If a student is in danger, call 911. For urgent school matters, call the school
              directly.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
