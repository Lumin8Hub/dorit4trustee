import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactCta, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/the-board")({
  head: () => ({
    meta: [
      { title: "The Board & You | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content:
          "How the York Region District School Board works, what a trustee can and can't do, and how families can attend meetings and have their say.",
      },
      { property: "og:title", content: "The Board & You" },
      {
        property: "og:description",
        content: "How YRDSB works and how to have your say.",
      },
    ],
  }),
  component: BoardPage,
});

const YRDSB = "https://www2.yrdsb.ca/about-us/board-trustees";

function BoardPage() {
  return (
    <PageShell
      eyebrow="The Board & You"
      title="How Your School Board Works"
      lede="The York Region District School Board sets policy and the budget for every public school in York Region. Here's how it works, and how you can take part."
    >
      <section className="legal">
        <div className="legal__inner">
          <h2>Who Sits on the Board</h2>
          <p>
            YRDSB has 12 elected trustees, one for each area of York Region, plus an appointed
            Indigenous trustee. Three student trustees bring student voice to the board table.
            Trustees are elected for a four-year term. The current term runs from November 15,
            2026 to November 14, 2030.
          </p>

          <h2>What the Board Does</h2>
          <ul className="bullets">
            <li>Sets policy for the operation of all public schools in York Region</li>
            <li>Sets the annual budget</li>
            <li>Sets the Multi-Year Strategic Plan that guides the system</li>
            <li>Hires and reviews the Chief Executive Officer</li>
            <li>Advocates for quality public education and communicates with the public</li>
          </ul>
          <p>
            Staff, led by the Chief Executive Officer, run schools day to day. Source:{" "}
            <a href={`${YRDSB}/roles-and-responsibilities`}>
              YRDSB, Trustee Roles and Responsibilities
            </a>
            .
          </p>

          <h2>What a Trustee Can and Can't Do</h2>
          <p>
            I can raise issues, ask questions, bring motions and vote. I can bring your concerns to
            the right people. I can't overrule a principal, change a teacher's assignment, or decide
            an individual student's case. The board acts as a whole, not through individual
            trustees.
          </p>
          <p>
            For a concern about your child, the quickest path is usually the teacher, then the
            principal, then the school superintendent. See{" "}
            <Link to="/contact" hash="who-to-contact">
              who to contact first
            </Link>
            .
          </p>

          <h2>Attend or Watch a Meeting</h2>
          <p>
            Board and committee meetings are open to the public, except for confidential matters
            discussed in closed session. Dates and agendas are posted by YRDSB.
          </p>
          <p>
            <a href={`${YRDSB}/committee-meeting-dates`}>YRDSB committee meeting dates</a>
          </p>

          <h2>Have Your Say</h2>
          <p>
            Members of the public can ask to speak to the board as a delegation, usually by
            registering ahead of the meeting. Advisory committees also give families a voice,
            including the Special Education Advisory Committee (SEAC) and the Parent Involvement
            Committee.
          </p>
          <p>
            <a href={`${YRDSB}/public-participation`}>YRDSB public participation and delegations</a>
          </p>

          <h2>Trustee Conduct</h2>
          <p>
            Trustees follow the YRDSB Trustee Code of Conduct. Questions about trustee conduct go
            to the board's Integrity Commissioner.
          </p>
          <p>
            <a href="https://www2.yrdsb.ca/about-us/policies-procedures/yrdsb-bylaws-and-special-rules-order">
              Bylaws and Trustee Code of Conduct
            </a>{" "}
            · <a href={`${YRDSB}/integrity-commissioner`}>Integrity Commissioner</a> ·{" "}
            <a href={`${YRDSB}/board-trustees-directory`}>Trustee Directory</a>
          </p>
        </div>
      </section>
      <ContactCta />
    </PageShell>
  );
}
