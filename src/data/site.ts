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
  /** Personal-site inbox. */
  email: "info@dorit4trustee.com",
  /** Official board contact. Fill in once YRDSB issues them (term begins Nov 15, 2026). */
  yrdsbEmail: null as string | null,
  yrdsbPhone: null as string | null,
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
  { label: "Nextdoor", href: "https://ca.nextdoor.com/page/dorit-smali-for-trustee-vaughan-on/" },
];

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
