import { Award, BookOpen, Heart, ShieldCheck, Users, type LucideIcon } from "lucide-react";

export interface PriorityBullet {
  label: string;
  text: string;
}

/** Tracker status. Nothing is "delivered" without a board decision on record. */
export type CommitmentStatus = "this-term" | "in-progress" | "board-approved" | "delivered";

export const STATUS_LABELS: Record<CommitmentStatus, string> = {
  "this-term": "Priority for this term",
  "in-progress": "In progress",
  "board-approved": "Approved by the board",
  delivered: "Delivered",
};

export interface CommitmentLogEntry {
  /** Human-readable date, e.g. "2026" or "November 2026". */
  date: string;
  text: string;
  source?: { label: string; href: string };
}

export interface Priority {
  /** Anchor id, kept stable so old /priorities#id links still land (e.g. /commitments#safe-schools). */
  id: string;
  icon: LucideIcon;
  title: string;
  /** What Dorit committed to. Used on cards and in the tracker. */
  summary: string;
  status: CommitmentStatus;
  /** Where it stands today. One or two sentences. */
  progress: string;
  log: CommitmentLogEntry[];
  /** The next decision or milestone to watch. */
  next: string;
  /** Optional detail bullets for /commitments. */
  bullets?: PriorityBullet[];
}

export const COMMITMENTS_UPDATED = "October 30, 2026";

const ROBERT_SITE = { label: "Trustee Robert Kolosowski", href: "https://www.robertfortrustee.ca/" };

export const PRIORITIES: Priority[] = [
  {
    id: "merit",
    icon: Award,
    title: "Excellence Through Merit",
    summary:
      "Every child deserves a great teacher. I will push for hiring on merit, so the most qualified and capable educators lead our classrooms.",
    status: "this-term",
    progress:
      "The 2026–2030 term begins on November 15. I will review the board's hiring policies and procedures and report what I find.",
    log: [],
    next: "A review of current YRDSB hiring policies once committee appointments are made.",
  },
  {
    id: "unity",
    icon: Users,
    title: "Unity and Equality for All",
    summary:
      "Schools should bring us together, not pull us apart. I will oppose discrimination, division, and segregation in every form. Every student is an individual, and every family deserves respect.",
    status: "this-term",
    progress:
      "I will bring this lens to every policy the board reviews, and speak up when a proposal divides students instead of bringing them together.",
    log: [],
    next: "Policy reviews scheduled by the board in the 2026–2027 school year.",
  },
  {
    id: "classroom",
    icon: BookOpen,
    title: "Keep Politics Out of the Classroom",
    summary:
      "The classroom is for academics, skills, and critical thinking. I will keep politics out of schools, so the curriculum stays on core subjects and students stay focused on their education.",
    status: "this-term",
    progress:
      "The board now requires advance notice to parents and age-appropriate content for external guest speakers. I will support applying that policy consistently in our schools.",
    log: [
      {
        date: "2022–2026 term",
        text: "The board adopted a policy requiring advance parental notification and age-appropriate content for external guest speakers.",
        source: ROBERT_SITE,
      },
    ],
    next: "How the guest-speaker policy is applied in King and Vaughan Ward 1 schools.",
  },
  {
    id: "special-education",
    icon: Heart,
    title: "Real Support for Special Education",
    summary:
      "Every student with special education needs deserves the resources to reach their potential. I will push for more funding and targeted support: specialist staff, smaller groups, Individual Education Plans (IEPs) backed by real people, and shorter waits for assessments.",
    status: "this-term",
    progress:
      "Special education staffing is set through the annual budget. I will press for specialist staff and shorter assessment waits in the next budget process.",
    bullets: [
      {
        label: "More specialist staff",
        text: "Smaller, focused learning groups for students who need intensive support.",
      },
      {
        label: "IEPs backed by real people",
        text: "An Individual Education Plan is only a promise until the staff and specialists are in place to deliver it.",
      },
      {
        label: "Shorter waits for assessments",
        text: "Early, expert help, before a student falls behind.",
      },
    ],
    log: [],
    next: "The 2027–2028 budget process and the Special Education Advisory Committee.",
  },
  {
    id: "safe-schools",
    icon: ShieldCheck,
    title: "Restore School Resource Officers",
    summary:
      "In 2021, YRDSB ended its partnership with York Regional Police. I committed to bringing officers back, so students learn about online safety, road and e‑bike safety, drugs, and human trafficking from officers they know and trust. Student safety comes before politics.",
    status: "board-approved",
    progress:
      "In 2026, trustees approved a motion to restore the partnership with York Regional Police, so officers can once again deliver safety presentations in schools. My job now is to make sure it reaches every school in our ward.",
    log: [
      { date: "2021", text: "YRDSB ended its partnership with York Regional Police." },
      {
        date: "2026",
        text: "Trustees approved Trustee Robert Kolosowski's motion to restore the partnership with York Regional Police.",
        source: ROBERT_SITE,
      },
    ],
    next: "Officer safety presentations reaching King and Vaughan Ward 1 schools.",
  },
];
