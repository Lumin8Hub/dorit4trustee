import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Wallet, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PRIORITIES = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Students First",
    body:
      "Keep the focus where it belongs — on education and student achievement. Strong academics, practical life skills, and meaningful opportunities that prepare students for whatever comes next.",
  },
  {
    icon: Wallet,
    number: "02",
    title: "Responsible Stewardship",
    body:
      "With a $1.8 billion budget, every dollar matters. Twenty-plus years of business leadership — managing budgets, modernizing operations, delivering results — directed at making sure resources reach the classroom.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "A Voice for Families",
    body:
      "Parents and families deserve a trustee who listens, communicates clearly, and shows up. A steady, accessible voice for the people I serve.",
  },
];

export const Route = createFileRoute("/priorities")({
  head: () => ({
    meta: [
      { title: "Priorities — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Three priorities: Students First, Responsible Stewardship, and a Voice for Families.",
      },
      { property: "og:title", content: "Three Priorities for YRDSB" },
      {
        property: "og:description",
        content:
          "What you'll get from me as your trustee — every meeting, every vote, every day.",
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
              <p className="t-eyebrow">My Commitments</p>
              <h1 className="section-heading">
                Three Priorities.
                <span
                  className="accent-bar"
                  aria-hidden="true"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </h1>
              <p className="priorities__lede">
                What you'll get from me as your trustee — every meeting, every
                vote, every day in this role.
              </p>
            </div>

            <ol className="priorities__list">
              {PRIORITIES.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="priority-card">
                    <div className="priority-card__top">
                      <span className="priority-card__num">{p.number}</span>
                      <span className="priority-card__icon">
                        <Icon size={26} strokeWidth={1.75} />
                      </span>
                    </div>
                    <h3 className="priority-card__title">{p.title}</h3>
                    <p className="priority-card__body">{p.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
