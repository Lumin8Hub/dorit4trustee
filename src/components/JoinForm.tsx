import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface JoinFormProps {
  id?: string;
}

export function JoinForm({ id = "join-form" }: JoinFormProps) {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: POST to mailing-list backend (NationBuilder, Mailchimp, etc.)
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Welcome to Team Dorit!", {
        description: "We'll be in touch with campaign updates soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 800);
  }

  return (
    <form id={id} className="join-form" onSubmit={handleSubmit}>
      <h3 className="join-form__title t-eyebrow">Join the Campaign</h3>

      <label className="visually-hidden" htmlFor={`${id}-email`}>
        Email address
      </label>
      <input
        id={`${id}-email`}
        type="email"
        placeholder="Your Email Address"
        className="join-form__input"
        required
      />

      <div className="join-form__row">
        <div>
          <label className="visually-hidden" htmlFor={`${id}-postal`}>
            Postal code
          </label>
          <input
            id={`${id}-postal`}
            type="text"
            placeholder="Your Postal Code"
            className="join-form__input"
            required
          />
        </div>
        <div>
          <label className="visually-hidden" htmlFor={`${id}-phone`}>
            Phone number
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            placeholder="Your Phone Number"
            className="join-form__input"
          />
        </div>
      </div>

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
