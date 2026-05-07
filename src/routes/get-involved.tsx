import { createFileRoute } from "@tanstack/react-router";
import { Users, Heart, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JoinForm } from "@/components/JoinForm";

const GET_INVOLVED = [
  {
    icon: Users,
    variant: "turquoise" as const,
    title: "Volunteer",
    body: "Help us reach more families.",
    cta: "Sign up to volunteer",
  },
  {
    icon: Heart,
    variant: "mustard" as const,
    title: "Donate",
    body: "Every contribution makes an impact.",
    cta: "Contribute today",
  },
  {
    icon: MessageCircle,
    variant: "taupe" as const,
    title: "Endorse",
    body: "Add your name to our growing list.",
    cta: "Add your endorsement",
  },
];

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Volunteer, donate, or endorse the campaign. Whether you have five minutes or five hours, there's a way to help.",
      },
      { property: "og:title", content: "Get Involved — Join the Movement" },
      {
        property: "og:description",
        content: "This campaign is powered by people who care about our schools and our community.",
      },
    ],
  }),
  component: GetInvolvedPage,
});

function GetInvolvedPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="get-involved">
          <div className="container">
            <div className="get-involved__head">
              <p className="t-eyebrow">Get Involved</p>
              <h1 className="section-heading">
                Join the Movement.
                <span
                  className="accent-bar"
                  aria-hidden="true"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </h1>
              <p className="get-involved__lede">
                This campaign is powered by people who care about our schools and our community.
                Whether you have five minutes or five hours, there's a way to help.
              </p>
            </div>

            <div className="get-involved__grid">
              {GET_INVOLVED.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href="#join"
                    className={`action-card action-card--${item.variant}`}
                  >
                    <span className="action-card__icon">
                      <Icon size={26} strokeWidth={1.75} />
                    </span>
                    <h3 className="action-card__title">{item.title}</h3>
                    <p className="action-card__body">{item.body}</p>
                    <span className="action-card__cta">{item.cta} →</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="join" className="mobile-join" style={{ display: "block" }}>
          <JoinForm id="involved-join" source="get-involved" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
