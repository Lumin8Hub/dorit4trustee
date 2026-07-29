const ZEFFY_EMBED_URL =
  "https://www.zeffy.com/embed/donation-form/donate-to-dorit-smali-for-yrdsb-trustee-campaign";
const ZEFFY_PAGE_URL =
  "https://www.zeffy.com/en-CA/donation-form/donate-to-dorit-smali-for-yrdsb-trustee-campaign";

export function ZeffyEmbed() {
  return (
    <>
      <div className="zeffy-embed">
        <iframe
          title="Donate to the Dorit Smali for YRDSB Trustee campaign"
          src={ZEFFY_EMBED_URL}
          loading="lazy"
          allow="payment"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        />
      </div>
      <a
        className="zeffy-embed__fallback"
        href={ZEFFY_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Trouble with the form above? Open the secure donation form in a new tab →
      </a>
    </>
  );
}
