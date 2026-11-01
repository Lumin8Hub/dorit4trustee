// Site-wide facts for the trustee website. Plain TS (no imports) so node tests can import it.
// Update this file, not the components, when contact details or committee roles change.

export const SITE = {
  name: "Dorit Smali",
  role: "YRDSB Trustee",
  area: "King Township and Vaughan Ward 1",
  /** Ward name as YRDSB writes it on its trustee directory. */
  areaOfficial: "King and Vaughan Ward 1",
  areaShort: "King & Vaughan Ward 1",
  origin: "https://dorit4trustee.com",
  /**
   * Official board email. Dorit's direction (Nov 1, 2026): anything board-related goes to her
   * YRDSB address, never through personal channels. Until it is issued, the site lists NO email
   * address or phone number and inbound messages come through the contact form only.
   * Set this once YRDSB issues it; the Contact page then shows it for board matters.
   */
  yrdsbEmail: null as string | null,
  termStart: "November 15, 2026",
  termEnd: "November 14, 2030",
  /** Board operating budget, as cited by Trustee Robert Kolosowski (Finance Chair). */
  boardBudget: "$1.7 billion",
  disclaimer:
    "This is the personal website of Dorit Smali, YRDSB Trustee for King and Vaughan Ward 1. It is not an official York Region District School Board website.",
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/Dorit4Trustee" },
  { label: "Instagram", href: "https://www.instagram.com/dorit4trustee/" },
];

/** Board news lives on YRDSB's own newsroom; this site doesn't republish it. */
export const BOARD_NEWS_URL = "https://www2.yrdsb.ca/newsroom/news";

/** Certified result. Source: Township of King Certificate of Election Results, Oct 28, 2026. */
export const ELECTION_RESULT = {
  votes: 5430,
  totalTrusteeVotes: 13392,
  certifiedOn: "October 28, 2026",
  certificateUrl:
    "https://www.king.ca/sites/default/files/2026-10/Certificate%20of%20Election%20Results%202026%20Municipal%20and%20School%20Board%20Election.pdf",
};

export function sharePercent(): string {
  return ((ELECTION_RESULT.votes / ELECTION_RESULT.totalTrusteeVotes) * 100).toFixed(1);
}
