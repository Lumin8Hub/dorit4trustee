// Board updates and explainers. Plain TS (no imports) so node tests can import it.
// Newest first. To publish a post, add an entry at the top of UPDATES.

export type UpdateCategory = "Board Notes" | "Explainer" | "In the Ward";

export interface Update {
  slug: string;
  /** ISO date, e.g. "2026-10-30". */
  date: string;
  category: UpdateCategory;
  title: string;
  summary: string;
  /** Paragraphs. Use "## " at the start of a string for a subheading. */
  body: string[];
  sources?: { label: string; href: string }[];
}

export const UPDATES: Update[] = [
  {
    slug: "thank-you-and-whats-next",
    date: "2026-10-30",
    category: "In the Ward",
    title: "Thank You, and What Happens Next",
    summary:
      "The results are certified. Here is what happens between now and my first board meeting, and how to reach me.",
    body: [
      "Thank you. On October 26, families across King Township and Vaughan Ward 1 elected me as your York Region District School Board trustee. The results were certified on October 28, with 5,430 votes cast for me.",
      "## When the term starts",
      "The 2026–2030 board term begins on November 15, 2026. The new board, with 12 elected trustees and an appointed Indigenous trustee, holds its first meeting after that date. That is where trustees choose a Chair and Vice-Chair and are appointed to committees.",
      "## What a trustee does",
      "Trustees set board policy, approve the annual budget, set the Multi-Year Strategic Plan, and hire and review the Chief Executive Officer. Staff run schools day to day. My job is to bring your priorities to the board table, ask the right questions, and vote on your behalf.",
      "## How I'll report back",
      "This website is where I'll report on what the board decides and how I vote. The Commitments page tracks the five promises I made during the campaign, and I'll update it after board meetings.",
      "## How to reach me",
      "Email info@dorit4trustee.com. Once YRDSB issues my board email address, I'll post it on the Contact page. For a concern about your child's class or school, start with the teacher or principal. If it isn't resolved, I want to hear from you.",
    ],
    sources: [
      {
        label: "Certificate of Election Results, Township of King (Oct 28, 2026)",
        href: "https://www.king.ca/sites/default/files/2026-10/Certificate%20of%20Election%20Results%202026%20Municipal%20and%20School%20Board%20Election.pdf",
      },
      {
        label: "YRDSB: Board of Trustees",
        href: "https://www2.yrdsb.ca/about-us/board-trustees",
      },
      {
        label: "YRDSB: 2026 Municipal Election",
        href: "https://www2.yrdsb.ca/about-us/board-trustees/municipal-election",
      },
    ],
  },
];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
