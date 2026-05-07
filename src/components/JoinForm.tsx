import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

interface JoinFormProps {
  id?: string;
  source?: string;
}

export function JoinForm({ id = "join-form", source = "unknown" }: JoinFormProps) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = {
      firstName: (form.elements.namedItem(`${id}-first`) as HTMLInputElement).value,
      lastName: (form.elements.namedItem(`${id}-last`) as HTMLInputElement).value,
      email: (form.elements.namedItem(`${id}-email`) as HTMLInputElement).value,
      phone: (form.elements.namedItem(`${id}-phone`) as HTMLInputElement).value,
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

      toast.success("Thanks for joining Team Dorit!", {
        description: "If you don't hear from us soon, email info@dorit4trustee.com.",
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
    <form id={id} className="join-form" onSubmit={handleSubmit}>
      <h3 className="join-form__title t-eyebrow">Join the Campaign</h3>

      <div className="join-form__row">
        <div>
          <label className="visually-hidden" htmlFor={`${id}-first`}>
            First name
          </label>
          <input
            id={`${id}-first`}
            name={`${id}-first`}
            type="text"
            placeholder="First Name"
            className="join-form__input"
            required
          />
        </div>
        <div>
          <label className="visually-hidden" htmlFor={`${id}-last`}>
            Last name
          </label>
          <input
            id={`${id}-last`}
            name={`${id}-last`}
            type="text"
            placeholder="Last Name"
            className="join-form__input"
            required
          />
        </div>
      </div>

      <label className="visually-hidden" htmlFor={`${id}-email`}>
        Email address
      </label>
      <input
        id={`${id}-email`}
        name={`${id}-email`}
        type="email"
        placeholder="Your Email Address"
        className="join-form__input"
        required
      />

      <label className="visually-hidden" htmlFor={`${id}-phone`}>
        Phone number
      </label>
      <input
        id={`${id}-phone`}
        name={`${id}-phone`}
        type="tel"
        placeholder="Your Phone Number"
        className="join-form__input"
      />

      <button type="submit" className="btn btn--mustard btn--lg btn--full" disabled={submitting}>
        {submitting ? "Joining…" : "Join Team Dorit"}
      </button>

      <p className="join-form__disclaimer">
        By providing your phone number you consent to receive periodic campaign updates from Dorit
        Smali for Trustee. Text HELP for help, STOP to end. Msg &amp; data rates may apply.{" "}
        <Link to="/privacy">dorit4trustee.com/privacy</Link>
      </p>
    </form>
  );
}
