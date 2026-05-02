import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Dorit Smali for YRDSB Trustee 2026, home">
      <span className="logo__name">
        Dorit
        <br />
        Smali
      </span>
      <span className="logo__tag">YRDSB Trustee 2026</span>
    </Link>
  );
}
