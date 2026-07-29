import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JoinForm } from "@/components/JoinForm";
import { ZeffyEmbed } from "@/components/ZeffyEmbed";
import { EtransferBlock } from "@/components/EtransferBlock";

const RULES = [
  {
    term: "1. $1,200 is the maximum",
    desc: "That's the most any one individual can contribute to this campaign, counting money, goods, and services combined.",
  },
  {
    term: "2. $5,000 across the whole board",
    desc: "The most you can give in total to all candidates running for the York Region District School Board in this election.",
  },
  {
    term: "3. Ontario residents only",
    desc: "You must normally reside in Ontario to contribute.",
  },
  {
    term: "4. Individuals only",
    desc: "Corporations, businesses, trade unions, clubs, ratepayers' associations, federal and provincial parties and their candidates, and any government, municipality or school board cannot contribute.",
  },
  {
    term: "5. One name per contribution",
    desc: "If you give from a joint account or shared credit card, the contribution has to be recorded under one individual's name. Tell us which one.",
  },
  {
    term: "6. Over $100 becomes public",
    desc: "If your contributions total more than $100, your name and address will appear on the campaign's financial statement filed with the municipal clerk.",
  },
  {
    term: "7. No tax credit, no rebate",
    desc: "Contributions to municipal and school board campaigns in Ontario are not tax-deductible. York Region does not run a contribution rebate program, so there is nothing to claim back.",
  },
];

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Support the campaign for King-Vaughan Ward 1 schools. Give securely by credit card or Interac e-Transfer. Contributions are subject to Ontario's Municipal Elections Act limits.",
      },
      { property: "og:title", content: "Donate — Dorit Smali for YRDSB Trustee 2026" },
      {
        property: "og:description",
        content: "Every contribution helps us reach more King-Vaughan families before October 26.",
      },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="t-eyebrow">Donate</p>
            <h1 className="section-heading">
              Support the Campaign
              <span className="accent-bar" aria-hidden="true" />
            </h1>
            <p className="page-hero__lede">
              Every contribution goes straight into reaching King-Vaughan families — signs, flyers,
              and the door-to-door work that wins a trustee race. Give securely by credit card, or
              send an Interac e-Transfer. Both take about two minutes.
            </p>
          </div>
        </section>

        <section className="donate">
          <div className="container">
            <div className="donate-grid">
              <div className="donate-grid__main">
                <div className="donate-card">
                  <h2>Give by Credit Card</h2>
                  <ZeffyEmbed />
                  <p className="donate-card__note">
                    Processed securely by Zeffy. You'll get an emailed confirmation, and the
                    campaign will issue you a contribution receipt as required by the Municipal
                    Elections Act. A contribution receipt is not a tax receipt.
                  </p>
                </div>

                <div className="donate-card">
                  <h2>Give by Interac e-Transfer</h2>
                  <p className="donate-card__intro">
                    Prefer to send an e-transfer? Enter your details and we'll show you where to
                    send it. We need your name and address on file to issue your contribution
                    receipt.
                  </p>
                  <EtransferBlock />
                </div>
              </div>

              <aside className="donate-grid__side">
                <div className="donate-rules">
                  <h2>Before You Give</h2>
                  <p className="donate-rules__lede">
                    School board campaigns in Ontario run on small contributions from individual
                    residents. A few rules apply — here's what they are.
                  </p>

                  <ul className="donate-rules__list">
                    {RULES.map((rule) => (
                      <li key={rule.term} className="donate-rules__item">
                        <span className="donate-rules__term">{rule.term}</span>
                        <span className="donate-rules__desc">{rule.desc}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="donate-rules__fine">
                    Contributions can only be accepted during the campaign period, which runs from
                    the day the clerk received Dorit's nomination to December 31, 2026. Questions?
                    Email <a href="mailto:info@dorit4trustee.com">info@dorit4trustee.com</a> and the
                    official agent will get back to you.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="join" className="mobile-join" style={{ display: "block" }}>
          <JoinForm id="donate-join" source="donate" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
