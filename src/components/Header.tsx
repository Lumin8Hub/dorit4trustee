import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { BOARD_NEWS_URL } from "@/data/site";

export const NAV_LINKS = [
  { label: "About Dorit", to: "/about" },
  { label: "Commitments", to: "/commitments" },
  { label: "Our Schools", to: "/schools" },
  { label: "Community", to: "/community" },
  { label: "Contact", to: "/contact" },
] as const;

/** Board news goes straight to YRDSB's newsroom. */
const BOARD_NEWS = { label: "Board News", href: BOARD_NEWS_URL };

interface HeaderProps {
  variant?: "overlay" | "solid";
}

export function Header({ variant = "overlay" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
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
            <li>
              <a href={BOARD_NEWS.href} className="site-nav__link" target="_blank" rel="noreferrer">
                {BOARD_NEWS.label}
              </a>
            </li>
          </ul>
          <div className="site-nav__ctas">
            <Link to="/get-involved" className="btn btn--mustard">
              Join Team Dorit
            </Link>
          </div>
        </nav>

        <button
          ref={toggleRef}
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
          <li>
            <a href={BOARD_NEWS.href} target="_blank" rel="noreferrer">
              {BOARD_NEWS.label}
            </a>
          </li>
        </ul>
        <div className="mobile-menu__ctas">
          <Link
            to="/get-involved"
            className="btn btn--mustard btn--lg"
            onClick={() => setMenuOpen(false)}
          >
            Join Team Dorit
          </Link>
        </div>
      </div>
    </header>
  );
}
