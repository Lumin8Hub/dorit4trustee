export type Endorsement = {
  name: string;
  role: string;
  riding: string;
  photo: string;
  quote?: string[];
};

export const ENDORSEMENTS: Endorsement[] = [
  {
    name: "Stephen Lecce",
    role: "Member of Provincial Parliament",
    riding: "King—Vaughan",
    photo: "/images/endorsers/stephen-lecce.jpg",
  },
  {
    name: "Anna Roberts",
    role: "Member of Parliament",
    riding: "King—Vaughan",
    photo: "/images/endorsers/anna-roberts.jpg",
  },
  {
    name: "Costas Menegakis",
    role: "Member of Parliament",
    riding: "Aurora-Oak Ridges",
    photo: "/images/endorsers/costas-menegakis.jpg",
  },
  {
    name: "Melissa Lantsman",
    role: "Deputy Leader of His Majesty's Loyal Opposition",
    riding: "Member of Parliament for Thornhill",
    photo: "/images/endorsers/melissa-lantsman.jpg",
    quote: [
      "The strength of our community is tied directly to the strength of our schools. That's why I am proud to endorse Dorit Smali for YRDSB Trustee.",
      "As a mother, business leader, and dedicated advocate, Dorit brings the experience, integrity, and common sense our school board needs. She is focused on the issues that truly matter to families: putting funding into the classroom, supporting special education, and ensuring political transparency.",
      "Dorit understands that a trustee must be accountable to parents, not the institution. She will keep the focus entirely on educational excellence, and I encourage our community to support her campaign.",
    ],
  },
  {
    name: "Roman Baber",
    role: "Member of Parliament",
    riding: "York Centre",
    photo: "/images/endorsers/roman-baber.jpg",
    quote: [
      "Dorit Smali will make a great School Board Trustee! She is involved in her community, passionate about education and determined to get back to basics, instead of pushing political ideology in the classroom. I look forward to her success as YRDSB Trustee!",
    ],
  },
];
