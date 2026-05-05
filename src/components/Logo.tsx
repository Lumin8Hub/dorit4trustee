import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Dorit Smali for YRDSB Trustee, home">
      <span className="logo__name">
        Dorit
        <br />
        Smali
      </span>
      <span className="logo__tag">for YRDSB Trustee</span>
    </Link>
  );
}
