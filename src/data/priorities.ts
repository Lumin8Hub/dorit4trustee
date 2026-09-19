import { Award, BookOpen, Heart, ShieldCheck, Users, type LucideIcon } from "lucide-react";

export interface PriorityBullet {
  label: string;
  text: string;
}

export interface Priority {
  /** Anchor id so the team can deep-link to one pillar (e.g. /priorities#safe-schools). */
  id: string;
  icon: LucideIcon;
  title: string;
  /** Short card copy. Used on the home page and, when no `detail` is set, on /priorities. */
  summary: string;
  /** Longer version for /priorities only. `intro` replaces `summary`; bullets follow it. */
  detail?: {
    intro: string;
    bullets: PriorityBullet[];
    close?: string;
  };
}

export const PRIORITIES: Priority[] = [
  {
    id: "merit",
    icon: Award,
    title: "Excellence Through Merit",
    summary:
      "Every child deserves a great teacher. I will push for hiring on merit, so the most qualified and capable educators lead our classrooms.",
  },
  {
    id: "unity",
    icon: Users,
    title: "Unity and Equality for All",
    summary:
      "Schools should bring us together, not pull us apart. I will oppose discrimination, division, and segregation in every form. Every student is an individual, and every family deserves respect.",
  },
  {
    id: "classroom",
    icon: BookOpen,
    title: "Keep Politics Out of the Classroom",
    summary:
      "The classroom is for academics, skills, and critical thinking. I will keep politics out of schools, so the curriculum stays on core subjects and students stay focused on their education.",
  },
  {
    id: "special-education",
    icon: Heart,
    title: "Real Support for Special Education",
    summary:
      "Every student with special education needs deserves the resources to reach their potential. I will push for more funding and targeted support: specialist staff, smaller groups, Individual Education Plans (IEPs) backed by real people, and shorter waits for assessments.",
    detail: {
      intro:
        "Every student with special education needs deserves the resources to reach their potential. I will push for more funding and targeted support.",
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
    },
  },
  {
    id: "safe-schools",
    icon: ShieldCheck,
    title: "Restore School Resource Officers",
    summary:
      "In 2021, YRDSB pulled School Resource Officers out of our schools and called it a pause. Five years later, they are still gone. I will vote to bring the program back, so students learn about online safety, road and e-bike safety, drugs, and human trafficking from officers they know and trust. Student safety comes before politics.",
    detail: {
      intro:
        "School Resource Officers give students practical safety education and a trusted adult in uniform. YRDSB pulled them from our schools in 2021 and called it a pause. Five years later, they are still gone.",
      bullets: [
        {
          label: "What officers teach",
          text: "Online safety, road and e-bike safety, drugs, and human trafficking. Lessons students need and parents ask for.",
        },
        {
          label: "Where it stands",
          text: "In September 2026, trustees voted to study bringing the program back. Staff report in six months, after the election. The board you elect decides.",
        },
        {
          label: "What I will do",
          text: "Vote yes to restore School Resource Officers with York Regional Police across YRDSB schools.",
        },
      ],
      close: "Student safety comes before politics.",
    },
  },
];

/** Voter-facing recap for the "Why This Matters" block on /priorities. One line per pillar. */
export const WHY_THIS_MATTERS: PriorityBullet[] = [
  {
    label: "Great teachers",
    text: "Hiring on merit puts the best educators in front of our kids.",
  },
  {
    label: "One community",
    text: "Every student treated as an individual. Every family respected.",
  },
  { label: "Focus on learning", text: "Core subjects and critical thinking, not politics." },
  {
    label: "No child left behind",
    text: "Special education funding that shows up as real staff and shorter waits.",
  },
  { label: "Safe schools", text: "Officers students know and trust, back in our schools." },
];
