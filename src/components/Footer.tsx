import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Meet Dorit", to: "/meet-dorit" },
  { label: "My Priorities", to: "/priorities" },
  { label: "Ward 1", to: "/ward-1" },
  { label: "Community", to: "/community" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact", to: "/contact" },
  { label: "Donate", to: "/donate" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo />
          <p className="site-footer__url">dorit4trustee.com</p>
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
