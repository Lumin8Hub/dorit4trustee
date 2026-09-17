import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  MapPin,
  Users,
  Vote,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LawnSignForm } from "@/components/LawnSignForm";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { SectionHeading } from "@/components/SectionHeading";
import { COMMUNITY_PHOTOS } from "@/data/communityPhotos";
import { ENDORSEMENTS } from "@/data/endorsements";

const HOME_PRIORITIES = [
  {
    icon: Award,
    title: "Excellence Through Merit",
    body: "Every child deserves the best instruction. I will advocate for hiring all teachers on merit, so the most qualified, capable, and passionate educators lead our classrooms.",
  },
  {
    icon: Users,
    title: "Unity and Equality for All",
    body: "Schools should bring us together, not pull us apart. I will promote unity and oppose discrimination, division, and segregation in every form. Every student is an individual, and every background deserves respect, without new barriers.",
  },
  {
    icon: BookOpen,
    title: "Neutral Learning Environments",
    body: "The classroom is for academics, skills, and critical thinking. I will work to keep politics out of schools, so the curriculum stays on core subjects and students stay focused on their education and their future.",
  },
  {
    icon: GraduationCap,
    title: "Enhancing Special Education and Individualized Support",
    body: "Every exceptional student deserves the resources to reach their full potential. I will advocate for more funding and targeted support: specialized staff, smaller learning groups, IEPs backed by real personnel, and shorter wait times for assessments.",
  },
];

const HERO_DESKTOP_OG = "https://dorit4trustee.com/images/hero-desktop.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dorit Smali for YRDSB Trustee 2026 — Make Our Schools Work for Our Kids" },
      {
        name: "description",
        content:
          "A fresh voice for King-Vaughan Ward 1 families. Join the campaign for strong, caring, practical leadership in our YRDSB schools.",
      },
      { property: "og:title", content: "Make Our Schools Work for Our Kids" },
      {
        property: "og:description",
        content: "A fresh voice for King-Vaughan Ward 1 families.",
      },
      { property: "og:image", content: HERO_DESKTOP_OG },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="page">
      <Header variant="overlay" nav="voter" />
      <main>
        <section className="hero">
          <div className="hero__scrim" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__panel">
              <div className="hero__copy">
                <p className="t-eyebrow hero__eyebrow">Make Our Schools Work For</p>
                <h1 className="hero__headline">
                  Our Kids
                  <span className="hero__underline" aria-hidden="true" />
                </h1>
                <p className="hero__subtitle">Back to Basics. Back to Learning.</p>
                <p className="hero__kicker">Dorit Smali for YRDSB Trustee, King-Vaughan Ward 1</p>
              </div>

              <div className="hero__ctas">
                <a href="#priorities" className="btn btn--mustard btn--lg">
                  See My Priorities
                </a>
                <Link to="/lawn-sign" className="btn btn--turquoise btn--lg">
                  Request a Lawn Sign
                </Link>
              </div>
            </div>
          </div>

          <a href="#priorities" className="hero__scroll" aria-label="See my priorities">
            <ChevronDown size={32} strokeWidth={2.5} />
          </a>
        </section>

        <section
          id="priorities"
          className="priorities--home"
          aria-label="Priorities for Our Schools"
        >
          <div className="priorities__inner">
            <p className="t-eyebrow priorities__eyebrow">Priorities for Our Schools</p>
            <h2 className="priorities__heading t-section">A "Back to Basics" Approach</h2>
            <p className="priorities__intro">
              As your trustee, I will put student achievement and community harmony first. Four
              promises:
            </p>

            <div className="priorities__grid">
              {HOME_PRIORITIES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <article key={p.title} className="priority-card">
                    <span className="priority-card__number">{i + 1}</span>
                    <div className="priority-card__icon">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="priority-card__title">{p.title}</h3>
                    <p className="priority-card__body">{p.body}</p>
                  </article>
                );
              })}
            </div>

            <div className="priorities__more">
              <Link to="/priorities" className="btn btn--ink">
                Read the full platform
              </Link>
            </div>
          </div>
        </section>

        <section className="endorsements" aria-label="Endorsements">
          <div className="endorsements__inner">
            <p className="t-eyebrow endorsements__eyebrow">Endorsements</p>
            <h2 className="endorsements__heading t-section">Endorsed By Community Leaders</h2>
            <div className="endorsements__grid">
              {ENDORSEMENTS.map((e) => (
                <article key={e.name} className="endorsement-card">
                  <div className="endorsement-card__header">
                    <img
                      className="endorsement-card__photo"
                      src={e.photo}
                      alt={`Portrait of ${e.name}`}
                      loading="lazy"
                      width={112}
                      height={112}
                    />
                    <div className="endorsement-card__text">
                      <h3 className="endorsement-card__name">{e.name}</h3>
                      <p className="endorsement-card__role">{e.role}</p>
                      <p className="endorsement-card__riding">{e.riding}</p>
                    </div>
                  </div>
                  {e.quote && (
                    <blockquote className="endorsement-card__quote">
                      {e.quote.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </blockquote>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="meet-dorit">
          <div className="container meet-dorit__inner">
            <img
              src="/images/dorit-portrait.png"
              className="meet-dorit__portrait"
              alt="Dorit Smali"
              loading="lazy"
            />
            <div>
              <SectionHeading eyebrow="Meet Dorit">A Mom, a Leader, a Neighbour.</SectionHeading>
              <p>
                Dorit Smali is a wife, a mother of two young children, and a York Region community
                builder. For more than 20 years she has helped large organizations adopt new
                technology to deliver better services at lower cost. She knows how to manage a
                complex budget, ask the right questions, and turn priorities into results.
              </p>
              <p>
                The YRDSB manages a budget of more than $1.8 billion. That money belongs to our
                community, and it should work as hard as possible for our students.
              </p>
              <blockquote className="meet-dorit__quote">
                <p>
                  Our schools, families, and children deserve strong, caring, practical leadership
                  that always puts students first.
                </p>
                <cite>Dorit</cite>
              </blockquote>
              <Link to="/meet-dorit" className="btn btn--ink">
                Read Dorit&apos;s Story
              </Link>
            </div>
          </div>
        </section>

        <section className="photo-carousel" aria-label="Dorit in the community">
          <div className="photo-carousel__inner">
            <p className="t-eyebrow photo-carousel__eyebrow">On the Campaign Trail</p>
            <h2 className="photo-carousel__heading t-section">Out in the Community</h2>
          </div>
          <PhotoCarousel photos={COMMUNITY_PHOTOS} />
        </section>

        <section id="online-voting" className="online-voting" aria-labelledby="online-voting-title">
          <div className="online-voting__inner">
            <div className="online-voting__intro">
              <div className="online-voting__badge">
                <Vote size={20} strokeWidth={2.5} aria-hidden="true" />
                <span>Action required</span>
              </div>
              <p className="t-eyebrow online-voting__eyebrow">2026 Municipal Election</p>
              <h2 id="online-voting-title" className="online-voting__heading">
                Get Ready to Vote Online
              </h2>
              <p className="online-voting__lede">
                Online voting works differently in Vaughan and King. Choose where you live to
                complete the right registration step before voting opens.
              </p>
            </div>

            <div className="online-voting__cards">
              <article className="voting-card voting-card--vaughan">
                <div className="voting-card__location">
                  <MapPin size={22} strokeWidth={2.25} aria-hidden="true" />
                  <h3>Vaughan Residents</h3>
                </div>
                <p className="voting-card__action">Register in advance to vote online.</p>
                <dl className="voting-card__details">
                  <div>
                    <dt>Vote online</dt>
                    <dd>October 9–18</dd>
                  </div>
                </dl>
                <p className="voting-card__note">
                  You must already be on Vaughan&apos;s Voters’ List. Have acceptable identification
                  and a unique email address ready.
                </p>
                <a
                  href="https://internetvoting.vaughan.ca/"
                  className="btn btn--mustard btn--lg voting-card__cta"
                  target="_blank"
                  rel="noreferrer"
                >
                  Register in Vaughan
                  <ExternalLink size={18} strokeWidth={2.25} aria-hidden="true" />
                </a>
              </article>

              <article className="voting-card voting-card--king">
                <div className="voting-card__location">
                  <MapPin size={22} strokeWidth={2.25} aria-hidden="true" />
                  <h3>King Residents</h3>
                </div>
                <p className="voting-card__action">Confirm you are on the Voters’ List.</p>
                <dl className="voting-card__details">
                  <div>
                    <dt>Your PIN</dt>
                    <dd>Arrives by mail</dd>
                  </div>
                  <div>
                    <dt>Vote online</dt>
                    <dd>October 13–23</dd>
                  </div>
                </dl>
                <p className="voting-card__note">
                  Your Voter Information Letter will include the unique PIN you need to vote online.
                  Check or update your voter registration now.
                </p>
                <a
                  href="https://www.king.ca/voterinformation"
                  className="btn btn--turquoise btn--lg voting-card__cta"
                  target="_blank"
                  rel="noreferrer"
                >
                  Register in King
                  <ExternalLink size={18} strokeWidth={2.25} aria-hidden="true" />
                </a>
              </article>
            </div>

            <p className="online-voting__footnote">
              Election Day is Monday, October 26, 2026. Online voting is available during each
              municipality&apos;s advance voting period only.
            </p>
          </div>
        </section>

        <section id="lawn-sign" className="lawn-sign-section">
          <div className="container lawn-sign-section__inner">
            <SectionHeading align="center" eyebrow="Show Your Support">
              Request a Lawn Sign
            </SectionHeading>
            <p className="lawn-sign-section__lede">
              Signs go up soon. Tell us where to put yours. We deliver it, and we pick it up after
              Election Day.
            </p>
            <LawnSignForm id="home-lawn-sign" source="home" />
            <p className="lawn-sign-section__note">
              Not sure if your home is in Ward 1? <Link to="/ward-1">Check the map.</Link>
            </p>
          </div>
        </section>

        <section className="other-ways">
          <div className="container">
            <h2 className="section-heading section-heading--sm">Other Ways to Help</h2>
            <div className="other-ways__grid">
              <div className="other-ways__item">
                <h3>Volunteer</h3>
                <p>Have a few hours? Knock on doors, make calls, or help at an event.</p>
                <Link to="/get-involved" className="btn btn--turquoise btn--sm">
                  Volunteer
                </Link>
              </div>
              <div className="other-ways__item">
                <h3>Donate</h3>
                <p>Contributions pay for signs, flyers, and reaching more families in Ward 1.</p>
                <Link to="/donate" className="btn btn--mustard btn--sm">
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
