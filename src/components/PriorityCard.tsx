import { STATUS_LABELS, type CommitmentStatus, type Priority } from "@/data/priorities";

export function StatusPill({ status }: { status: CommitmentStatus }) {
  return <span className={`status-pill status-pill--${status}`}>{STATUS_LABELS[status]}</span>;
}

interface PriorityCardProps {
  priority: Priority;
  number: number;
}

/** Home-page card: number, title, commitment and current status. */
export function PriorityCard({ priority, number }: PriorityCardProps) {
  const Icon = priority.icon;

  return (
    <article className="promise-card">
      <span className="promise-card__number" aria-hidden="true">
        {number}
      </span>
      <span className="promise-card__icon">
        <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="promise-card__title">
        <span className="sr-only">Commitment {number}: </span>
        {priority.title}
      </h3>
      <p className="promise-card__body">{priority.summary}</p>
      <p className="promise-card__status">
        <StatusPill status={priority.status} />
      </p>
    </article>
  );
}
