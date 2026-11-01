import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

/** Ways a supporter can help. Values are what lands in the Supporters sheet. */
export const SUPPORT_INTERESTS = [
  "Invite me to events",
  "Volunteer in the next campaign",
  "Host a lawn sign next election",
  "Host a meet-and-greet",
  "Share Dorit's posts online",
] as const;

export const COMMUNITIES = ["King Township", "Vaughan Ward 1", "Elsewhere"] as const;

export const SCHOOL_SUPPORT = [
  "English public (YRDSB)",
  "Another school board",
  "Not sure",
] as const;

/**
 * Supporter sign-up. Collects enough to identify a supporter on a future voters' list
 * (name + street address + postal code) and how they want to help.
 */
export function SupporterForm({ id = "supporter-form" }: { id?: string }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const el = (name: string) =>
      form.elements.namedItem(`${id}-${name}`) as HTMLInputElement | null;
    const field = (name: string) => el(name)?.value.trim() ?? "";

    // Honeypot: real people never see or fill this field.
    if (field("website")) return;

    const interests = SUPPORT_INTERESTS.filter(
      (_, i) =>
        (form.elements.namedItem(`${id}-interest-${i}`) as HTMLInputElement | null)?.checked,
    );

    const data = {
      formType: "supporter",
      firstName: field("first-name"),
      lastName: field("last-name"),
      email: field("email"),
      phone: field("phone"),
      address: field("address"),
      community: field("community"),
      postalCode: field("postal-code").toUpperCase(),
      schoolSupport: field("school-support"),
      parent: el("parent")?.checked ? "Yes" : "",
      interests: interests.join("; "),
      consent: el("consent")?.checked ? "Yes" : "No",
      source: "get-involved",
    };

    setSubmitting(true);
    try {
      if (!FORM_ENDPOINT) throw new Error("Form endpoint not configured");
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });
      toast.success("Welcome to Team Dorit!", {
        description: "Thank you. We'll be in touch about events and ways to help.",
      });
      form.reset();
    } catch {
      toast.error("Your sign-up could not be sent.", {
        description: "Please try again in a few minutes.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id={id} className="contact-form supporter-form" onSubmit={handleSubmit}>
      <h2 className="contact-form__title t-eyebrow">Join Team Dorit</h2>

      <div className="contact-form__row">
        <div>
          <label htmlFor={`${id}-first-name`}>First name</label>
          <input
            id={`${id}-first-name`}
            name={`${id}-first-name`}
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <label htmlFor={`${id}-last-name`}>Last name</label>
          <input
            id={`${id}-last-name`}
            name={`${id}-last-name`}
            autoComplete="family-name"
            required
          />
        </div>
      </div>

      <div className="contact-form__row">
        <div>
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            id={`${id}-email`}
            name={`${id}-email`}
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`}>Mobile phone (optional)</label>
          <input id={`${id}-phone`} name={`${id}-phone`} type="tel" autoComplete="tel" />
        </div>
      </div>

      <label htmlFor={`${id}-address`}>Home street address</label>
      <input
        id={`${id}-address`}
        name={`${id}-address`}
        autoComplete="street-address"
        placeholder="e.g. 123 Main Street"
        required
      />

      <div className="contact-form__row">
        <div>
          <label htmlFor={`${id}-community`}>Where do you live?</label>
          <select id={`${id}-community`} name={`${id}-community`} defaultValue="" required>
            <option value="" disabled>
              Choose one
            </option>
            {COMMUNITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-postal-code`}>Postal code</label>
          <input
            id={`${id}-postal-code`}
            name={`${id}-postal-code`}
            autoComplete="postal-code"
            pattern="[A-Za-z]\d[A-Za-z][ \-]?\d[A-Za-z]\d"
            title="A Canadian postal code, e.g. L7B 1A1"
            maxLength={7}
            required
          />
        </div>
      </div>

      <label htmlFor={`${id}-school-support`}>Which school board do you vote for? (optional)</label>
      <select id={`${id}-school-support`} name={`${id}-school-support`} defaultValue="">
        <option value="">Choose one</option>
        {SCHOOL_SUPPORT.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <label className="contact-form__check">
        <input id={`${id}-parent`} name={`${id}-parent`} type="checkbox" />
        <span>I'm a parent or guardian of a YRDSB student</span>
      </label>

      <fieldset className="supporter-form__interests">
        <legend>How would you like to help? (optional)</legend>
        {SUPPORT_INTERESTS.map((interest, i) => (
          <label key={interest} className="contact-form__check">
            <input
              id={`${id}-interest-${i}`}
              name={`${id}-interest-${i}`}
              type="checkbox"
              value={interest}
            />
            <span>{interest}</span>
          </label>
        ))}
      </fieldset>

      <label className="contact-form__check contact-form__check--consent">
        <input id={`${id}-consent`} name={`${id}-consent`} type="checkbox" required />
        <span>
          Yes, Dorit Smali and her future election campaigns may contact me by email, phone or text
          about events, volunteering and elections. I can unsubscribe at any time.
        </span>
      </label>

      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name={`${id}-website`} tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn--mustard btn--lg btn--full" disabled={submitting}>
        {submitting ? "Sending…" : "Count Me In"}
      </button>

      <p className="contact-form__note">
        Your details stay with Dorit's team. They are never shared with YRDSB or sold. See the{" "}
        <Link to="/privacy">privacy policy</Link>.
      </p>
    </form>
  );
}
