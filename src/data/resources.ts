// Curated useful links for families. Plain TS (no imports) so node tests can import it.
// Re-check every URL quarterly (tests/trustee-site.test.mjs only checks the format).

export interface ResourceGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    title: "YRDSB Governance",
    links: [
      { label: "Board of Trustees", href: "https://www2.yrdsb.ca/about-us/board-trustees" },
      {
        label: "Trustee Directory",
        href: "https://www2.yrdsb.ca/about-us/board-trustees/board-trustees-directory",
      },
      {
        label: "Trustee Roles and Responsibilities",
        href: "https://www2.yrdsb.ca/about-us/board-trustees/roles-and-responsibilities",
      },
      {
        label: "Committee Meeting Dates",
        href: "https://www2.yrdsb.ca/about-us/board-trustees/committee-meeting-dates",
      },
      {
        label: "Public Participation and Delegations",
        href: "https://www2.yrdsb.ca/about-us/board-trustees/public-participation",
      },
      { label: "Policies and Procedures", href: "https://www2.yrdsb.ca/about-us/policies-procedures" },
      {
        label: "Bylaws and Trustee Code of Conduct",
        href: "https://www2.yrdsb.ca/about-us/policies-procedures/yrdsb-bylaws-and-special-rules-order",
      },
      {
        label: "Integrity Commissioner",
        href: "https://www2.yrdsb.ca/about-us/board-trustees/integrity-commissioner",
      },
      { label: "YRDSB News", href: "https://www2.yrdsb.ca/newsroom" },
    ],
  },
  {
    title: "Schools and Programs",
    links: [
      { label: "School Boundaries", href: "https://www2.yrdsb.ca/schools-programs/school-boundaries" },
      { label: "School Profiles", href: "https://www2.yrdsb.ca/school-profiles" },
      {
        label: "School Registration",
        href: "https://www2.yrdsb.ca/schools-programs/school-registration",
      },
      { label: "School Councils", href: "https://www2.yrdsb.ca/schools-programs/school-councils-0" },
      {
        label: "Graduation Requirements",
        href: "https://www2.yrdsb.ca/schools-programs/secondary-school/experience-secondary-school/graduation-requirements",
      },
    ],
  },
  {
    title: "Student Support",
    links: [
      { label: "Mental Health", href: "https://www2.yrdsb.ca/student-support/mental-health" },
      { label: "Special Education", href: "https://www2.yrdsb.ca/student-support/special-education" },
      {
        label: "Guidance and Career Education",
        href: "https://www2.yrdsb.ca/student-support/guidance-and-career-education",
      },
      {
        label: "Newcomer Families",
        href: "https://www2.yrdsb.ca/about-us/departments/inclusive-school-and-community-services/general-information-newcomers",
      },
      { label: "Student Tools and Resources", href: "https://www2.yrdsb.ca/student-tools-and-resources" },
      { label: "Student Transportation (School Bus City)", href: "http://net.schoolbuscity.com/" },
    ],
  },
  {
    title: "Ontario",
    links: [
      { label: "Ontario Curriculum", href: "https://www.dcp.edu.gov.on.ca/en/" },
      { label: "Education Act", href: "https://www.ontario.ca/laws/statute/90e02" },
      { label: "EQAO School Results", href: "https://www.eqao.com/the-assessments/find-my-school/" },
      { label: "Ministry of Education News", href: "https://news.ontario.ca/edu/en" },
    ],
  },
  {
    title: "Local",
    links: [
      { label: "Township of King", href: "https://www.king.ca/" },
      { label: "City of Vaughan", href: "https://www.vaughan.ca/" },
      { label: "York Region", href: "https://www.york.ca/" },
      { label: "King Township Public Library", href: "https://www.kinglibrary.ca/" },
      { label: "Vaughan Public Libraries", href: "https://www.vaughanpl.info/" },
    ],
  },
];
