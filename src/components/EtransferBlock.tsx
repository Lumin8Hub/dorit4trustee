import { useState, type FormEvent } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

/*
 * NOTE FOR THE CAMPAIGN:
 * Municipal/school-board campaign contributions in Ontario are subject to contribution
 * rules and receipting requirements. Confirm with the official agent whether a
 * contributor eligibility declaration or contribution-limit acknowledgement must also
 * be captured here before launch. This form collects identity + address only.
 */

const ETRANSFER_EMAIL = "info@dorit4trustee.com";
const FORM_ENDPOINT = import.meta.env.VITE_DONATE_ENDPOINT as string | undefined;

type View = "form" | "instructions";

export function EtransferBlock() {
  const [view, setView] = useState<View>("form");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleEtransferSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = {
      fullName: (form.elements.namedItem("donate-name") as HTMLInputElement).value,
      email: (form.elements.namedItem("donate-email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("donate-phone") as HTMLInputElement).value,
      address: (form.elements.namedItem("donate-address") as HTMLTextAreaElement).value,
      source: "donate-etransfer",
    };

    try {
      if (!FORM_ENDPOINT) throw new Error("Form endpoint not configured");

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });

      setView("instructions");
    } catch {
      toast.error("Something went wrong.", {
        description: "Please try again or email us directly at info@dorit4trustee.com.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ETRANSFER_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy. Please copy the email address manually.");
    }
  }

  if (view === "instructions") {
    return (
      <>
        <div className="donate-instructions__email-row">
          <span className="donate-instructions__email">{ETRANSFER_EMAIL}</span>
          <button
            type="button"
            className="donate-instructions__copy"
            onClick={handleCopy}
            aria-label="Copy email address"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <ol className="donate-instructions__steps">
          <li>Open your bank's Interac e-Transfer page.</li>
          <li>
            Send your contribution to <strong>{ETRANSFER_EMAIL}</strong>.
          </li>
          <li>
            In the message field, include the <strong>same full name</strong> you entered here so we
            can match your contribution.
          </li>
          <li>We'll confirm receipt by email.</li>
        </ol>
      </>
    );
  }

  return (
    <form onSubmit={handleEtransferSubmit} className="donate-form">
      <label className="visually-hidden" htmlFor="donate-name">
        Full name
      </label>
      <input
        id="donate-name"
        name="donate-name"
        type="text"
        placeholder="Full Name"
        className="join-form__input"
        required
      />

      <label className="visually-hidden" htmlFor="donate-email">
        Email address
      </label>
      <input
        id="donate-email"
        name="donate-email"
        type="email"
        placeholder="Email Address"
        className="join-form__input"
        required
      />

      <label className="visually-hidden" htmlFor="donate-phone">
        Phone number
      </label>
      <input
        id="donate-phone"
        name="donate-phone"
        type="tel"
        placeholder="Phone Number"
        className="join-form__input"
        required
      />

      <label className="visually-hidden" htmlFor="donate-address">
        Full residential address
      </label>
      <textarea
        id="donate-address"
        name="donate-address"
        placeholder="Full Residential Address"
        className="join-form__input donate-form__address"
        rows={3}
        required
      />

      <button type="submit" className="btn btn--mustard btn--lg btn--full" disabled={submitting}>
        {submitting ? "Submitting…" : "Continue to E-Transfer Instructions"}
      </button>
    </form>
  );
}
