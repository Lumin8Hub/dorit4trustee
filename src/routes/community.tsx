import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Shield, Home as HomeIcon, HandHeart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const COMMUNITY_WORK = [
  { icon: Utensils, label: "Supporting families facing food insecurity" },
  { icon: Shield, label: "Assisting women experiencing abuse" },
  { icon: HomeIcon, label: "Helping people experiencing homelessness" },
  { icon: HandHeart, label: "Local charitable initiatives, including B.A.M. Organization" },
];

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Dorit's lifelong pattern of showing up across York Region — from food insecurity to women's safety to homelessness.",
      },
      { property: "og:title", content: "Showing Up Where It Matters" },
      {
        property: "og:description",
        content:
          "Dorit's lifelong volunteer work across York Region — not a campaign talking point, a pattern.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="community">
          <div className="community__inner">
            <div className="community__copy">
              <p className="t-eyebrow">Rooted in Community</p>
              <h1 className="section-heading">
                Showing Up
                <br />
                Where It Matters.
                <span className="accent-bar" aria-hidden="true" />
              </h1>
              <p>
                Long before this campaign, Dorit has been an active volunteer
                across York Region. Her commitment to community service isn't a
                campaign talking point — it's a lifelong pattern of showing up
                where help is needed.
              </p>
            </div>

            <ul className="community__list">
              {COMMUNITY_WORK.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="community__item">
                    <span className="community__item-icon">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="community__item-label">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
