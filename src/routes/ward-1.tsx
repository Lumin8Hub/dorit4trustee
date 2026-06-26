import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/ward-1")({
  head: () => ({
    meta: [
      { title: "Ward 1 — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "YRDSB Trustee Area 4: King and Vaughan Ward 1. View the electoral boundary map for the area Dorit Smali is running to represent.",
      },
      { property: "og:title", content: "Ward 1 — King & Vaughan" },
      {
        property: "og:description",
        content: "See the full YRDSB electoral map for King and Vaughan Ward 1.",
      },
    ],
  }),
  component: Ward1Page,
});

function Ward1Page() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="ward-map">
          <div className="container">
            <div className="ward-map__head">
              <p className="t-eyebrow">Electoral Area</p>
              <h1 className="section-heading">
                Ward 1 — King &amp; Vaughan
                <span
                  className="accent-bar"
                  aria-hidden="true"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </h1>
              <p className="ward-map__lede">
                Dorit Smali is running to represent YRDSB Trustee Area 4, covering the Township of
                King and Vaughan Ward 1. This area includes schools such as King City S.S., Maple
                H.S., Kleinburg P.S., Nobleton P.S., and many more.
              </p>
            </div>

            <div className="ward-map__image-wrap">
              <img
                src="/images/ward_1_map.png"
                alt="York Region District School Board Trustee Electoral Area 2026–2030: King and Vaughan, Ward 1 — showing ward boundaries K1 through K6 and V1 with elementary and secondary school locations"
                className="ward-map__image"
                width={1196}
                height={1550}
                loading="lazy"
              />
            </div>

            <div className="ward-map__schools">
              <h2 className="section-heading section-heading--sm">Schools in Our Ward</h2>
              <div className="ward-map__school-grid">
                <div>
                  <h3 className="ward-map__school-type">Elementary Schools</h3>
                  <ul className="ward-map__school-list">
                    <li>Discovery P.S.</li>
                    <li>Joseph A. Gibson P.S.</li>
                    <li>Julliard P.S.</li>
                    <li>Kettleby P.S.</li>
                    <li>King City P.S.</li>
                    <li>Kleinburg P.S.</li>
                    <li>Mackenzie Glen P.S.</li>
                    <li>Maple Creek P.S.</li>
                    <li>Michael Cranny E.S.</li>
                    <li>Nobleton P.S.</li>
                    <li>Schomberg P.S.</li>
                    <li>Tanya Khan P.S.</li>
                    <li>Teston Village P.S.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="ward-map__school-type">Secondary Schools</h3>
                  <ul className="ward-map__school-list">
                    <li>King City S.S.</li>
                    <li>Maple H.S.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
