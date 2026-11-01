import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Newspaper, School, UsersRound } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PriorityCard } from "@/components/PriorityCard";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { PRIORITIES } from "@/data/priorities";
import { ELEMENTARY, SECONDARY } from "@/data/schools";
import { BOARD_NEWS_URL, ELECTION_RESULT, SITE } from "@/data/site";
import { COMMUNITY_PHOTOS } from "@/data/communityPhotos";

const OG_IMAGE = "https://dorit4trustee.com/images/hero-desktop.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dorit Smali | YRDSB Trustee, King & Vaughan Ward 1" },
      {
        name: "description",
        content:
          "Dorit Smali is the York Region District School Board trustee for King Township and Vaughan Ward 1. Join her supporter team, follow her commitments and get in touch.",
      },
      { property: "og:title", content: "Dorit Smali, YRDSB Trustee" },
      {
        property: "og:description",
        content: "Working for our kids in King Township and Vaughan Ward 1.",
      },
      { property: "og:image", content: OG_IMAGE },
    ],
  }),
  component: HomePage,
});

const QUICK_LINKS = [
  {
    icon: UsersRound,
    label: "Join Team Dorit",
    text: "Events, meet-and-greets and the next campaign.",
    to: "/get-involved",
  },
  {
    icon: Mail,
    label: "Contact Dorit",
    text: "Send a message or an event invitation.",
    to: "/contact",
  },
  {
    icon: School,
    label: "Our Schools",
    text: `${ELEMENTARY.length} elementary and ${SECONDARY.length} secondary schools.`,
    to: "/schools",
  },
  {
    icon: Newspaper,
    label: "Board News",
    text: "Official news from the York Region District School Board.",
    href: BOARD_NEWS_URL,
  },
] as const;

function HomePage() {
  return (
    <div className="page">
      <Header variant="overlay" />
      <main>
        <section className="hero">
          <div className="hero__scrim" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__panel">
              <div className="hero__copy">
                <h1 className="hero__title">
                  <span className="t-eyebrow hero__eyebrow">YRDSB Trustee · {SITE.areaShort}</span>{" "}
                  <span className="hero__headline">
                    Working for Our Kids
                    <span className="hero__underline" aria-hidden="true" />
                  </span>
                </h1>
                <p className="hero__kicker">
                  Dorit Smali, your public school trustee for King Township and Vaughan Ward 1
                </p>
              </div>
              <div className="hero__ctas">
                <Link to="/get-involved" className="btn btn--mustard">
                  Join Team Dorit
                </Link>
                <Link to="/contact" className="btn btn--turquoise">
                  Contact Dorit
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="letter" aria-labelledby="letter-title">
          <div className="container letter__inner">
            <img
              src="/images/dorit-portrait.webp"
              className="letter__portrait"
              alt="Portrait of Dorit Smali"
              loading="lazy"
            />
            <div className="letter__body">
              <p className="t-eyebrow">A Letter to Residents</p>
              <h2 id="letter-title" className="section-heading">
                Dear Neighbours,
                <span className="accent-bar" aria-hidden="true" />
              </h2>
              <p>
                Thank you. On October 26, families across King Township and Vaughan Ward 1 elected
                me as your York Region District School Board trustee, with{" "}
                {ELECTION_RESULT.votes.toLocaleString("en-CA")} votes (
                <a href={ELECTION_RESULT.certificateUrl}>certified results</a>). I am honoured by
                your trust, and I take the responsibility seriously.
              </p>
              <p>
                To everyone who voted, whoever you supported: I work for every family in our ward.
                That includes the parents I met at your doors, at markets and community events in
                King and Vaughan, and the ones I haven't met yet.
              </p>
              <p>
                I made five commitments: excellence through merit, unity and equality, keeping
                politics out of the classroom, real support for special education, and safe schools.
                This website tracks where each one stands.
              </p>
              <p>
                My term begins on {SITE.termStart}. I look forward to working with families,
                teachers and staff in all {ELEMENTARY.length + SECONDARY.length} of our schools.
              </p>
              <p>
                To the volunteers and supporters who carried this campaign: please stay with me.{" "}
                <Link to="/get-involved">Join Team Dorit</Link> to hear about community events and
                to help when it's time to run again.
              </p>
              <p className="letter__signoff">
                Sincerely,
                <span className="letter__signature">Dorit Smali</span>
              </p>
              <p className="letter__ps">
                P.S. This is my personal website for friends and supporters. Board business goes
                through my official YRDSB email, which I'll share here once it's set up. Official
                board news is on the <a href={BOARD_NEWS_URL}>YRDSB newsroom</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="quick-links" aria-label="Quick links">
          <div className="container quick-links__grid">
            {QUICK_LINKS.map((q) => {
              const Icon = q.icon;
              const inner = (
                <>
                  <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                  <span className="quick-link__label">{q.label}</span>
                  <span className="quick-link__text">{q.text}</span>
                </>
              );
              return "href" in q ? (
                <a
                  key={q.href}
                  href={q.href}
                  className="quick-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link key={q.to} to={q.to} className="quick-link">
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        <section id="commitments" className="priorities--home" aria-labelledby="commitments-title">
          <div className="priorities__inner">
            <p className="t-eyebrow priorities__eyebrow">My Commitments</p>
            <h2 id="commitments-title" className="priorities__heading t-section">
              Five Promises. Tracked in Public.
            </h2>
            <p className="priorities__intro">
              I am one of 12 elected trustees, so I can't deliver any of these alone. Here is where
              each one stands.
            </p>
            <div className="promises-grid">
              {PRIORITIES.map((p, i) => (
                <PriorityCard key={p.id} priority={p} number={i + 1} />
              ))}
              <aside className="promise-card promise-card--cta">
                <h3 className="promise-card__title">See the Progress</h3>
                <p className="promise-card__body">
                  Each commitment has a status, a record of what has happened, and the next decision
                  to watch.
                </p>
                <Link to="/commitments" className="btn btn--mustard promise-card__cta">
                  Track My Commitments
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section className="home-schools" aria-labelledby="schools-title">
          <div className="container home-schools__inner">
            <div>
              <p className="t-eyebrow">Our Schools</p>
              <h2 id="schools-title" className="section-heading">
                {ELEMENTARY.length + SECONDARY.length} Schools. One Community.
                <span className="accent-bar" aria-hidden="true" />
              </h2>
              <p>
                I represent {ELEMENTARY.length} elementary and {SECONDARY.length} secondary YRDSB
                schools across King Township and Vaughan Ward 1, from Schomberg and Nobleton to
                Kleinburg and Maple.
              </p>
              <Link to="/schools" className="btn btn--ink">
                See All Schools and the Ward Map
              </Link>
            </div>
            <img
              src="/images/ward_1_map.webp"
              alt="Map of the King and Vaughan Ward 1 trustee area with school locations"
              className="home-schools__map"
              width={1196}
              height={1550}
              loading="lazy"
            />
          </div>
        </section>

        <section className="photo-carousel" aria-labelledby="community-title">
          <div className="photo-carousel__inner">
            <p className="t-eyebrow photo-carousel__eyebrow">In the Community</p>
            <h2 id="community-title" className="photo-carousel__heading t-section">
              Showing Up for Our Community
            </h2>
          </div>
          <PhotoCarousel photos={COMMUNITY_PHOTOS} />
        </section>

        <section className="support-cta" aria-labelledby="home-cta-title">
          <div className="container support-cta__inner">
            <h2 id="home-cta-title" className="section-heading section-heading--sm">
              Stay on Team Dorit
            </h2>
            <p className="support-cta__lede">
              Hear about community events, meet-and-greets and how to help in the next campaign.
            </p>
            <div className="support-cta__buttons">
              <Link to="/get-involved" className="btn btn--mustard btn--lg">
                Join Team Dorit
              </Link>
              <Link to="/contact" className="btn btn--ink btn--lg">
                Contact Dorit
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
