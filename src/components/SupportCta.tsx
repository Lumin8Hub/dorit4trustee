import { Link } from "@tanstack/react-router";

export function SupportCta() {
  return (
    <section className="support-cta" aria-labelledby="support-cta-title">
      <div className="container support-cta__inner">
        <h2 id="support-cta-title" className="section-heading section-heading--sm">
          Help Dorit Win on October 26
        </h2>
        <div className="support-cta__buttons">
          <Link to="/donate" className="btn btn--mustard btn--lg">
            Donate
          </Link>
          <Link to="/lawn-sign" className="btn btn--turquoise btn--lg">
            Request a Lawn Sign
          </Link>
        </div>
      </div>
    </section>
  );
}
