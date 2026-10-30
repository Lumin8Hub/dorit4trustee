import { createFileRoute } from "@tanstack/react-router";
import { ContactCta, PageShell } from "@/components/PageShell";
import { COMMUNITY_PHOTOS, PHOTO_CATEGORIES } from "@/data/communityPhotos";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "In the Community | Dorit Smali, YRDSB Trustee" },
      {
        name: "description",
        content:
          "Dorit Smali in our schools, working with other levels of government, and in the King and Vaughan community.",
      },
      { property: "og:title", content: "Dorit Smali in the Community" },
      {
        property: "og:description",
        content: "Showing up for families in King and Vaughan Ward 1.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <PageShell
      eyebrow="In the Community"
      title="Showing Up Where It Matters"
      lede="Long before the election, Dorit volunteered across York Region: supporting families facing food insecurity, women experiencing abuse, people experiencing homelessness, and local charities."
    >
      {PHOTO_CATEGORIES.map((cat) => {
        const photos = COMMUNITY_PHOTOS.filter((p) => p.category === cat.id);
        return (
          <section key={cat.id} className="gallery" aria-labelledby={`gallery-${cat.id}`}>
            <div className="container">
              <h2 id={`gallery-${cat.id}`} className="section-heading section-heading--sm">
                {cat.title}
              </h2>
              {photos.length === 0 ? (
                <p className="gallery__empty">
                  Coming soon: visits to our 15 schools during the 2026–2030 term.
                </p>
              ) : (
                <ul className="gallery__grid">
                  {photos.map((p) => (
                    <li key={p.src}>
                      <figure>
                        <img src={p.src} alt={p.alt} loading="lazy" />
                        <figcaption>{p.alt}</figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}
      <ContactCta heading="Invite Dorit to Your Event" />
    </PageShell>
  );
}
