export type Endorsement = {
  name: string;
  role: string;
  riding: string;
  photo: string;
  website?: string;
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
    photo: "/images/endorsers/roman-baber-v2.jpg",
    quote: [
      "Dorit Smali will make a great School Board Trustee! She is involved in her community, passionate about education and determined to get back to basics, instead of pushing political ideology in the classroom. I look forward to her success as YRDSB Trustee!",
    ],
  },
  {
    name: "Dr Weidong Pei",
    role: "Toronto District School Board Trustee",
    riding: "Ward 4 - York Centre & Willowdale",
    photo: "/images/endorsers/weidong-pei.png",
    website: "https://www.weidongpei.ca/",
    quote: [
      "I’m proud to endorse Dorit Smali for Public School Trustee.",
      "Dorit is a caring, hardworking, and passionate advocate who understands both education and the policies that shape our schools. For many years, she has advocated for children, families, and stronger schools, and she understands the challenges facing students, parents, and educators.",
      "What stands out about Dorit is her commitment to listening, understanding the issues, and working toward practical solutions. She is motivated by a genuine desire to help children succeed, support parents, and ensure teachers have the resources and support they need.",
      "I believe in Dorit and know she will bring passion, dedication, and a strong understanding of education to the role of YRDSB Trustee.",
    ],
  },
];
