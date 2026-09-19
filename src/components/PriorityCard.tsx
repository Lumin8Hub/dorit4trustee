import { Link } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import type { Priority } from "@/data/priorities";

interface PriorityCardProps {
  priority: Priority;
  number: number;
  /** "summary" (home page) or "detail" (/priorities). Falls back to summary when no detail exists. */
  variant?: "summary" | "detail";
}

export function PriorityCard({ priority, number, variant = "summary" }: PriorityCardProps) {
  const Icon = priority.icon;
  const detail = variant === "detail" ? priority.detail : undefined;

  return (
    <article id={priority.id} className="promise-card">
      <span className="promise-card__number" aria-hidden="true">
        {number}
      </span>
      <span className="promise-card__icon">
        <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="promise-card__title">
        <span className="sr-only">Priority {number}: </span>
        {priority.title}
      </h3>
      <p className="promise-card__body">{detail ? detail.intro : priority.summary}</p>
      {detail && (
        <ul className="promise-card__bullets">
          {detail.bullets.map((b) => (
            <li key={b.label}>
              <strong>{b.label}:</strong> {b.text}
            </li>
          ))}
        </ul>
      )}
      {detail?.close && <p className="promise-card__close">{detail.close}</p>}
    </article>
  );
}

interface LawnSignCardProps {
  /** The lawn sign route, or an in-page anchor when the form is already on the page. */
  href: "/lawn-sign" | `#${string}`;
  /** Where the click came from, for the form's `source` reporting. */
  source?: string;
}

/** Sixth card in the 3x2 grid. Turns agreement with the platform into a lawn sign request. */
export function LawnSignCard({ href, source = "priorities-grid" }: LawnSignCardProps) {
  const label = "Request a Lawn Sign";
  const className = "btn btn--mustard promise-card__cta";

  return (
    <aside className="promise-card promise-card--cta" aria-labelledby="lawn-sign-card-title">
      <span className="promise-card__icon promise-card__icon--cta">
        <Megaphone size={24} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="promise-card__eyebrow t-script">Agree with these five?</p>
      <h3 id="lawn-sign-card-title" className="promise-card__title">
        Put a Sign on Your Lawn
      </h3>
      <p className="promise-card__body">
        A sign tells your neighbours you are voting for Dorit. It takes 30 seconds to request one.
        We deliver it and pick it up after Election Day.
      </p>
      {href === "/lawn-sign" ? (
        <Link to={href} className={className} data-source={source}>
          {label}
        </Link>
      ) : (
        <a href={href} className={className} data-source={source}>
          {label}
        </a>
      )}
    </aside>
  );
}
