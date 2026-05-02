import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  children,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div style={align === "center" ? { textAlign: "center" } : undefined}>
      <p className="t-eyebrow">{eyebrow}</p>
      <h2 className={`section-heading ${light ? "section-heading--light" : ""}`}>
        {children}
        <span
          className="accent-bar"
          aria-hidden="true"
          style={align === "center" ? { marginLeft: "auto", marginRight: "auto" } : undefined}
        />
      </h2>
    </div>
  );
}
