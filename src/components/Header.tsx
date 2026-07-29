import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Meet Dorit", to: "/meet-dorit" },
  { label: "My Priorities", to: "/priorities" },
  { label: "Ward 1", to: "/ward-1" },
  { label: "Community", to: "/community" },
  { label: "Get Involved", to: "/get-involved" },
] as const;

interface HeaderProps {
  variant?: "overlay" | "solid";
}

export function Header({ variant = "overlay" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${variant === "solid" ? "site-header--solid" : ""}`}>
      <div className="site-header__inner">
        <Logo />

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="site-nav__link"
                  activeProps={{ className: "site-nav__link site-nav__link--active" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="site-nav__ctas">
            <Link to="/get-involved" className="btn btn--turquoise">
              Volunteer
            </Link>
            <Link to="/donate" className="btn btn--mustard">
              Donate
            </Link>
          </div>
        </nav>

        <button
          className="site-header__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__ctas">
          <Link
            to="/get-involved"
            className="btn btn--turquoise btn--lg"
            onClick={() => setMenuOpen(false)}
          >
            Volunteer
          </Link>
          <Link
            to="/donate"
            className="btn btn--mustard btn--lg"
            onClick={() => setMenuOpen(false)}
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}
