import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { SITE, SOCIAL_LINKS } from "@/data/site";

const FOOTER_LINKS = [
  { label: "About Dorit", to: "/about" },
  { label: "Commitments", to: "/commitments" },
  { label: "Our Schools", to: "/schools" },
  { label: "Updates", to: "/updates" },
  { label: "The Board & You", to: "/the-board" },
  { label: "Resources", to: "/resources" },
  { label: "In the Community", to: "/community" },
  { label: "Contact", to: "/contact" },
  { label: "2026 Campaign", to: "/2026-campaign" },
  { label: "Privacy", to: "/privacy" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo />
          <p className="site-footer__url">Dorit4Trustee.com</p>
          <ul className="site-footer__social" aria-label="Follow Dorit">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__legal">
          <p className="site-footer__disclaimer">{SITE.disclaimer}</p>
          <p>
            For YRDSB matters, see the{" "}
            <a href="https://www2.yrdsb.ca/about-us/board-trustees/board-trustees-directory">
              YRDSB Trustee Directory
            </a>
            .
          </p>
          <p>&copy; 2026 Dorit Smali. All rights reserved.</p>
          <button
            type="button"
            className="site-footer__privacy-control"
            onClick={() => window.dispatchEvent(new Event("dorit:analytics-preferences"))}
          >
            Analytics preferences
          </button>
        </div>
      </div>
    </footer>
  );
}
