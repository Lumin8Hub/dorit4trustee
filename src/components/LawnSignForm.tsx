import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

interface LawnSignFormProps {
  id: string;
  source: string;
}

export function LawnSignForm({ id, source }: LawnSignFormProps) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = form.elements.namedItem(`${id}-website`) as HTMLInputElement;

    if (honeypot.value) {
      toast.success("Thanks! Your sign request is in.", {
        description:
          "We will confirm by email within two days. Questions? Email info@dorit4trustee.com.",
      });
      form.reset();
      return;
    }

    setSubmitting(true);
    const data = {
      formType: "lawn-sign",
      firstName: (form.elements.namedItem(`${id}-first`) as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem(`${id}-last`) as HTMLInputElement).value.trim(),
      address: (form.elements.namedItem(`${id}-address`) as HTMLInputElement).value.trim(),
      town: (form.elements.namedItem(`${id}-town`) as HTMLInputElement).value.trim(),
      postalCode: (form.elements.namedItem(`${id}-postal`) as HTMLInputElement).value
        .trim()
        .toUpperCase(),
      email: (form.elements.namedItem(`${id}-email`) as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem(`${id}-phone`) as HTMLInputElement).value.trim(),
      source,
    };

    try {
      if (!FORM_ENDPOINT) {
        throw new Error("Form endpoint not configured");
      }

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });

      toast.success("Thanks! Your sign request is in.", {
        description:
          "We will confirm by email within two days. Questions? Email info@dorit4trustee.com.",
      });
      form.reset();
    } catch {
      toast.error("Something went wrong.", {
        description: "Please try again or email us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id={id} className="join-form lawn-sign-form" onSubmit={handleSubmit}>
      <div className="join-form__row">
        <div>
          <label className="lawn-sign-form__label" htmlFor={`${id}-first`}>
            First name
          </label>
          <input
            id={`${id}-first`}
            name={`${id}-first`}
            type="text"
            className="join-form__input"
            required
          />
        </div>
        <div>
          <label className="lawn-sign-form__label" htmlFor={`${id}-last`}>
            Last name
          </label>
          <input
            id={`${id}-last`}
            name={`${id}-last`}
            type="text"
            className="join-form__input"
            required
          />
        </div>
      </div>

      <label className="lawn-sign-form__label" htmlFor={`${id}-address`}>
        Street address
      </label>
      <input
        id={`${id}-address`}
        name={`${id}-address`}
        type="text"
        placeholder="123 Main Street"
        className="join-form__input"
        required
      />

      <div className="join-form__row">
        <div>
          <label className="lawn-sign-form__label" htmlFor={`${id}-town`}>
            Town or city
          </label>
          <input
            id={`${id}-town`}
            name={`${id}-town`}
            type="text"
            placeholder="King City, Kleinburg, Maple..."
            className="join-form__input"
            required
          />
        </div>
        <div>
          <label className="lawn-sign-form__label" htmlFor={`${id}-postal`}>
            Postal code
          </label>
          <input
            id={`${id}-postal`}
            name={`${id}-postal`}
            type="text"
            placeholder="L7B 1A1"
            pattern="[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d"
            autoCapitalize="characters"
            className="join-form__input"
            required
          />
        </div>
      </div>

      <label className="lawn-sign-form__label" htmlFor={`${id}-email`}>
        Email
      </label>
      <input
        id={`${id}-email`}
        name={`${id}-email`}
        type="email"
        className="join-form__input"
        required
      />

      <label className="lawn-sign-form__label" htmlFor={`${id}-phone`}>
        Phone (optional)
      </label>
      <input id={`${id}-phone`} name={`${id}-phone`} type="tel" className="join-form__input" />

      <label className="lawn-sign-form__consent">
        <input id={`${id}-consent`} name={`${id}-consent`} type="checkbox" required />
        <span>You may contact me about my sign request.</span>
      </label>

      <input
        type="text"
        name={`${id}-website`}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="lawn-sign-form__hp"
      />

      <button type="submit" className="btn btn--mustard btn--lg btn--full" disabled={submitting}>
        {submitting ? "Sending..." : "Request My Sign"}
      </button>

      <p className="join-form__disclaimer">
        By providing your phone number you consent to receive periodic campaign updates from Dorit
        Smali for Trustee. Text HELP for help, STOP to end. Msg &amp; data rates may apply.{" "}
        <Link to="/privacy">dorit4trustee.com/privacy</Link>
      </p>
    </form>
  );
}
