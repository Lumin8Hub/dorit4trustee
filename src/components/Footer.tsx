import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "How to Vote", to: "/vote" },
  { label: "Meet Dorit", to: "/meet-dorit" },
  { label: "My Priorities", to: "/priorities" },
  { label: "Map", to: "/ward-1" },
  { label: "Community", to: "/community" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact", to: "/contact" },
  { label: "Donate", to: "/donate" },
] as const;

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/Dorit4Trustee" },
  { label: "Instagram", href: "https://www.instagram.com/dorit4trustee/" },
  { label: "Nextdoor", href: "https://ca.nextdoor.com/page/dorit-smali-for-trustee-vaughan-on/" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo />
          <p className="site-footer__url">dorit4trustee.com</p>
          <ul className="site-footer__social" aria-label="Follow the campaign">
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
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__legal">
          <p>Authorized by the Official Agent for the Dorit Smali Campaign.</p>
          <p>&copy; 2026 Dorit Smali for YRDSB Trustee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
