import { createFileRoute } from "@tanstack/react-router";
import { CalendarHeart, Megaphone, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SupporterForm } from "@/components/SupporterForm";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Join Team Dorit | Dorit Smali, King & Vaughan Ward 1" },
      {
        name: "description",
        content:
          "Join Dorit Smali's supporter team in King Township and Vaughan Ward 1. Hear about community events and help with the next campaign.",
      },
      { property: "og:title", content: "Join Team Dorit" },
      {
        property: "og:description",
        content: "Events, meet-and-greets and the next campaign. Sign up to stay involved.",
      },
    ],
  }),
  component: GetInvolvedPage,
});

const WAYS = [
  {
    icon: CalendarHeart,
    title: "Community events",
    text: "Be the first to hear about meet-and-greets and gatherings in King and Vaughan.",
  },
  {
    icon: Users,
    title: "The next campaign",
    text: "Knock on doors, make calls or host a sign when it's time to run again.",
  },
  {
    icon: Megaphone,
    title: "Spread the word",
    text: "Share news with your neighbours and help our team keep growing.",
  },
];

function GetInvolvedPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="contact">
          <div className="contact__inner contact__inner--top">
            <div className="contact__copy">
              <p className="t-eyebrow">Get Involved</p>
              <h1 className="section-heading section-heading--light">
                Stay on
                <br />
                Team Dorit.
                <span className="accent-bar" aria-hidden="true" />
              </h1>
              <p>
                Thank you for helping elect me in 2026. Whether you knocked on doors, hosted a sign
                or simply voted, I want to stay in touch. Sign up to hear about community events,
                and to be first in line when we build the next campaign.
              </p>
              <ul className="supporter-ways">
                {WAYS.map((w) => {
                  const Icon = w.icon;
                  return (
                    <li key={w.title}>
                      <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                      <div>
                        <h2>{w.title}</h2>
                        <p>{w.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="contact__form">
              <SupporterForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
