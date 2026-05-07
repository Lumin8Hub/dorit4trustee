import { createFileRoute } from "@tanstack/react-router";
import { Mail, Instagram, Facebook } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JoinForm } from "@/components/JoinForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Get in touch with the Dorit Smali campaign. Have a question, idea, or story about our schools? Dorit reads every message.",
      },
      { property: "og:title", content: "Get in Touch — Dorit Reads Every Message" },
      {
        property: "og:description",
        content: "Have an idea, a concern, or a story about our schools?",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="contact">
          <div className="contact__inner">
            <div className="contact__copy">
              <p className="t-eyebrow">Get in Touch</p>
              <h1 className="section-heading section-heading--light">
                Have a question?
                <br />
                Dorit wants to hear it.
                <span className="accent-bar" aria-hidden="true" />
              </h1>
              <p>
                Have an idea, a concern, or a story about our schools? The campaign inbox is open —
                and Dorit reads every message.
              </p>
              <ul className="contact__details">
                <li>
                  <Mail size={18} strokeWidth={2} />
                  <a href="mailto:hello@doritsmali.ca">hello@doritsmali.ca</a>
                </li>
                <li className="contact__socials">
                  <a href="#" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="#" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="contact__form">
              <JoinForm id="contact-join" source="contact" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
