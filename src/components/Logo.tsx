import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Dorit Smali, YRDSB Trustee, home">
      <span className="logo__name">
        <span className="logo__first">Dorit</span>
        <br />
        <span className="logo__last">Smali</span>
      </span>
      <span className="logo__tag">
        YRDSB Trustee
        <span className="logo__tag-sep"> · </span>
        <span className="logo__tag-area">King &amp; Vaughan Ward 1</span>
      </span>
    </Link>
  );
}
