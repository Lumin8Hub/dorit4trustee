import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Dorit Smali for YRDSB Trustee, home">
      <span className="logo__name">
        <span className="logo__first">Dorit</span>
        <br />
        <span className="logo__last">Smali</span>
      </span>
      <span className="logo__tag">Public School Trustee · King-Vaughan Ward 1</span>
    </Link>
  );
}
