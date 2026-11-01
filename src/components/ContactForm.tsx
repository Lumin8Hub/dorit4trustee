import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { SCHOOLS } from "@/data/schools";
import { PRIORITIES } from "@/data/priorities";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

const TOPICS = [
  "Invite Dorit to an event",
  "I'd like to help or volunteer",
  "A question about my child's school",
  ...PRIORITIES.map((p) => p.title),
  "Board budget or policy",
  "Other",
];

export function ContactForm({ id = "contact-form" }: { id?: string }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const field = (name: string) =>
      (form.elements.namedItem(`${id}-${name}`) as HTMLInputElement | null)?.value ?? "";

    // Honeypot: real people never see or fill this field.
    if (field("website")) return;

    const data = {
      formType: "contact",
      name: field("name"),
      email: field("email"),
      community: field("community"),
      school: field("school"),
      topic: field("topic"),
      message: field("message"),
      source: "contact",
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
      toast.success("Thank you. Your message was sent.", {
        description: "Dorit reads every message and will get back to you.",
      });
      form.reset();
    } catch {
      toast.error("Your message could not be sent.", {
        description: "Please try again in a few minutes.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id={id} className="contact-form" onSubmit={handleSubmit}>
      <h2 className="contact-form__title t-eyebrow">Send Dorit a Message</h2>

      <label htmlFor={`${id}-name`}>Name</label>
      <input id={`${id}-name`} name={`${id}-name`} autoComplete="name" required />

      <label htmlFor={`${id}-email`}>Email</label>
      <input id={`${id}-email`} name={`${id}-email`} type="email" autoComplete="email" required />

      <div className="contact-form__row">
        <div>
          <label htmlFor={`${id}-community`}>Where do you live?</label>
          <select id={`${id}-community`} name={`${id}-community`} defaultValue="">
            <option value="">Choose one</option>
            <option>King Township</option>
            <option>Vaughan Ward 1</option>
            <option>Elsewhere</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-school`}>School (optional)</label>
          <select id={`${id}-school`} name={`${id}-school`} defaultValue="">
            <option value="">Not school-specific</option>
            {SCHOOLS.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <label htmlFor={`${id}-topic`}>Topic</label>
      <select id={`${id}-topic`} name={`${id}-topic`} defaultValue="" required>
        <option value="" disabled>
          Choose a topic
        </option>
        {TOPICS.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <label htmlFor={`${id}-message`}>Message</label>
      <textarea id={`${id}-message`} name={`${id}-message`} rows={6} required />

      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name={`${id}-website`} tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn--mustard btn--lg btn--full" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </button>

      <p className="contact-form__note">
        Dorit reads every message. Your details are used only to reply to you. See the{" "}
        <Link to="/privacy">privacy policy</Link>.
      </p>
    </form>
  );
}
