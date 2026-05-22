import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, CreditCard, Mail, ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { subscribeDonateModal, closeDonateModal } from "@/lib/donateModal";

/*
 * NOTE FOR THE CAMPAIGN:
 * Municipal/school-board campaign contributions in Ontario are subject to contribution
 * rules and receipting requirements. Confirm with the official agent whether a
 * contributor eligibility declaration or contribution-limit acknowledgement must also
 * be captured here before launch. This form collects identity + address only.
 */

const ZEFFY_URL =
  "https://www.zeffy.com/en-CA/donation-form/donate-to-dorit-smali-for-yrdsb-trustee-campaign";
const ETRANSFER_EMAIL = "info@dorit4trustee.com";
const FORM_ENDPOINT = import.meta.env.VITE_DONATE_ENDPOINT as string | undefined;

type View = "choose" | "etransfer-form" | "etransfer-instructions";

export function DonateModal() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("choose");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => subscribeDonateModal(setOpen), []);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      setView("choose");
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDonateModal();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  function handleCreditCard() {
    window.open(ZEFFY_URL, "_blank", "noopener,noreferrer");
    closeDonateModal();
  }

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

      setView("etransfer-instructions");
    } catch {
      toast.error("Something went wrong.", {
        description: "Please try again or email us directly at info@dorit4trustee.com.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(ETRANSFER_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="donate-overlay" onClick={() => closeDonateModal()}>
      <div
        ref={dialogRef}
        className="donate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="donate-modal__close"
          onClick={() => closeDonateModal()}
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {view === "choose" && (
          <>
            <h2 id="donate-modal-title" className="donate-modal__title">
              Support the Campaign
            </h2>
            <p className="donate-modal__subtitle">Choose how you'd like to donate:</p>

            <div className="donate-options">
              <button
                type="button"
                className="donate-option donate-option--credit"
                onClick={handleCreditCard}
              >
                <span className="donate-option__icon donate-option__icon--mustard">
                  <CreditCard size={24} />
                </span>
                <span className="donate-option__text">
                  <span className="donate-option__label">Donate by Credit Card</span>
                  <span className="donate-option__sub">Secure payment via Zeffy</span>
                </span>
              </button>

              <button
                type="button"
                className="donate-option donate-option--etransfer"
                onClick={() => setView("etransfer-form")}
              >
                <span className="donate-option__icon donate-option__icon--turquoise">
                  <Mail size={24} />
                </span>
                <span className="donate-option__text">
                  <span className="donate-option__label">Donate by E-Transfer</span>
                  <span className="donate-option__sub">Interac e-Transfer instructions</span>
                </span>
              </button>
            </div>
          </>
        )}

        {view === "etransfer-form" && (
          <>
            <button type="button" className="donate-back" onClick={() => setView("choose")}>
              <ArrowLeft size={16} /> Back
            </button>
            <h2 id="donate-modal-title" className="donate-modal__title">
              E-Transfer Donation
            </h2>
            <p className="donate-modal__subtitle">
              Please provide your contact details to proceed with your e-transfer donation.
            </p>

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

              <button
                type="submit"
                className="btn btn--mustard btn--lg btn--full"
                disabled={submitting}
              >
                {submitting ? "Submitting\u2026" : "Continue to E-Transfer Instructions"}
              </button>
            </form>
          </>
        )}

        {view === "etransfer-instructions" && (
          <>
            <h2 id="donate-modal-title" className="donate-modal__title">
              E-Transfer Instructions
            </h2>
            <p className="donate-modal__subtitle">
              Thanks! Here's how to complete your e-transfer.
            </p>

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
                In the message field, include the <strong>same full name</strong> you entered here
                so we can match your contribution.
              </li>
              <li>We'll confirm receipt by email.</li>
            </ol>

            <button
              type="button"
              className="btn btn--mustard btn--lg btn--full"
              onClick={() => closeDonateModal()}
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}
