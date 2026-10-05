import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ELECTION_DAY, KING, VAUGHAN, VERIFIED_ON } from "@/data/voting";

export const Route = createFileRoute("/vote")({
  head: () => ({
    meta: [
      { title: "How to Vote - Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Dates, deadlines and links for voting in the 2026 municipal election in Vaughan and King, including online and in-person options.",
      },
      {
        property: "og:title",
        content: "How to Vote in Vaughan and King - 2026 Municipal Election",
      },
      {
        property: "og:description",
        content:
          "Online voting dates, registration deadlines, advance polls and Election Day hours.",
      },
    ],
  }),
  component: VotePage,
});

function OfficialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalLink size={14} strokeWidth={2.25} aria-hidden="true" className="vote-guide__ext" />
    </a>
  );
}

function VotePage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="t-eyebrow">2026 Municipal Election</p>
            <h1 className="section-heading">
              How to Vote
              <span className="accent-bar" aria-hidden="true" />
            </h1>
            <p className="page-hero__lede">
              Election Day is {ELECTION_DAY.date}. Voting works differently in Vaughan and King, so
              find your municipality below.
            </p>
            <nav className="vote-guide__jump" aria-label="Choose your municipality">
              <a href="#vaughan" className="btn btn--mustard">
                I live in Vaughan
              </a>
              <a href="#king" className="btn btn--turquoise">
                I live in King
              </a>
            </nav>
          </div>
        </section>

        <section className="vote-guide">
          <div className="vote-guide__inner">
            <article id="vaughan" className="vote-guide__card vote-guide__card--vaughan">
              <h2 className="vote-guide__title">
                <MapPin size={24} strokeWidth={2.25} aria-hidden="true" />
                Vaughan
              </h2>

              <h3>1. Register to vote online by {VAUGHAN.registerOnlineBy}</h3>
              <p>
                Online voting is the only way to vote early in Vaughan, and you must register for it
                in advance. You need to be on the Voters&apos; List, and you need acceptable ID and
                your own email address.
              </p>
              <p className="vote-guide__actions">
                <a
                  href={VAUGHAN.registerUrl}
                  className="btn btn--mustard"
                  target="_blank"
                  rel="noreferrer"
                >
                  Register to Vote Online
                  <ExternalLink size={16} strokeWidth={2.25} aria-hidden="true" />
                </a>
              </p>
              <p>
                Not sure you&apos;re on the Voters&apos; List?{" "}
                <OfficialLink href={VAUGHAN.votersListUrl}>Check your registration</OfficialLink>
              </p>

              <h3>2. Vote online, {VAUGHAN.onlineDates}</h3>
              <p>
                Online voting runs {VAUGHAN.onlineWindow}. Every Vaughan Public Library branch has a
                voting kiosk if you&apos;d rather not vote from home.
              </p>

              <h3>Or vote in person on Election Day</h3>
              <p>
                {ELECTION_DAY.date}, {ELECTION_DAY.hours} Your notice from the City tells you where
                to vote.
              </p>

              <p className="vote-guide__source">
                Official source:{" "}
                <OfficialLink href={VAUGHAN.infoUrl}>City of Vaughan Elections</OfficialLink>
              </p>
            </article>

            <article id="king" className="vote-guide__card vote-guide__card--king">
              <h2 className="vote-guide__title">
                <MapPin size={24} strokeWidth={2.25} aria-hidden="true" />
                King
              </h2>

              <h3>1. Find your Voter Information Letter</h3>
              <p>
                King mailed letters the week of September 21. Yours has the PIN you need to vote
                online. No letter, or wrong details?{" "}
                <OfficialLink href={KING.votersListUrl}>Check your voter information</OfficialLink>{" "}
                by {KING.votersListDeadline}.
              </p>

              <h3>2. Vote online, {KING.onlineDates}</h3>
              <p>Online voting runs {KING.onlineWindow} Log in with your PIN and date of birth.</p>
              <p className="vote-guide__actions">
                <a
                  href={KING.voteUrl}
                  className="btn btn--turquoise"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vote Online (from Oct 13)
                  <ExternalLink size={16} strokeWidth={2.25} aria-hidden="true" />
                </a>
              </p>

              <h3>Or vote in person early</h3>
              <p>All advance polls are open {KING.advanceHours}</p>
              <ul className="vote-guide__list">
                {KING.advanceDays.map((day) => (
                  <li key={day.date}>
                    <strong>{day.date}</strong>
                    <span>
                      {day.place}, {day.address}
                    </span>
                  </li>
                ))}
              </ul>

              <h3>Or vote in person on Election Day</h3>
              <p>
                {ELECTION_DAY.date}, {ELECTION_DAY.hours} Your Voter Information Letter shows your
                voting location. Bring the letter and ID showing your name and address.
              </p>

              <p className="vote-guide__source">
                Official source:{" "}
                <OfficialLink href={KING.infoUrl}>Township of King Elections</OfficialLink>
              </p>
            </article>

            <aside className="vote-guide__note">
              <h2>Who votes for YRDSB trustee?</h2>
              <p>
                You vote for a York Region District School Board trustee if you are an English
                public school supporter. Your Voter Information Letter or Voters&apos; List entry
                shows your school support. Not sure if you live in Ward 1?{" "}
                <Link to="/ward-1">Check the map.</Link>
              </p>
              <p className="vote-guide__checked">
                Dates and places checked against official municipal sources on {VERIFIED_ON}. Always
                confirm with your municipality.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
