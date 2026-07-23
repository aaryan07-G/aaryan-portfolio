"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, TriangleAlert } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/composed/FormField";
import { GlassSelect } from "@/components/composed/GlassSelect";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { personal, phoneHref } from "@/data/personal";
import { socialLinks } from "@/data/social";
import { budgetOptions, contactFormSchema } from "@/lib/validations";
import { isEmailJsConfigured, sendContactEmail } from "@/lib/emailjs";

type FormState = {
  name: string;
  email: string;
  budget: string;
  message: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  budget: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm]               = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus]           = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const updateField = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear per-field error as user corrects it
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    

    // ── Honeypot check ───────────────────────────────────────────────────────
    // Real users never fill this hidden field. Bots usually do.
    // Silently abort — no success message to avoid giving bots a signal.
   // TEMPORARILY DISABLED
// if (form.company.length > 0) {
//   console.warn("[contact] Honeypot triggered");
//   return;
// }

    // ── Client-side validation ────────────────────────────────────────────────
    const parsed = contactFormSchema.safeParse({
  name: form.name,
  email: form.email,
  budget: form.budget || undefined,
  message: form.message,
});

    if (!parsed.success) {
      const errors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      console.warn("[contact] Validation failed:", errors);
      return; // do NOT change status — keep idle so the form stays visible
    }

    setFieldErrors({});
    setStatus("submitting");

    // ── EmailJS path ──────────────────────────────────────────────────────────
    if (isEmailJsConfigured) {
      try {
        const budgetLabel =
          budgetOptions.find((o) => o.value === parsed.data.budget)?.label ?? "Not specified";

        await sendContactEmail({
          from_name:  parsed.data.name,
          from_email: parsed.data.email,
          budget:     budgetLabel,
          message:    parsed.data.message,
        });

        // Only reaches here if EmailJS confirmed success
        setStatus("success");
        setStatusMessage("Thanks — I'll get back to you shortly.");
        setForm(EMPTY_FORM);
      } catch (error) {
  console.error("EmailJS Error:", error);

  alert(
    error instanceof Error
      ? error.message
      : "Unknown EmailJS error."
  );

  setStatus("error");
  setStatusMessage(
    "Unable to send your message. Please try again or email me directly."
  );
}
    } else {
      // ── Not configured — show a clear error, never fake success ─────────────
      console.error(
        "[contact] EmailJS is NOT configured.\n" +
        "Create .env.local with:\n" +
        "  NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx\n" +
        "  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx\n" +
        "  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXXXXXXX\n" +
        "Then restart npm run dev."
      );
      setStatus("error");
      setStatusMessage(
        "The contact form is not fully set up yet. Please email me directly at " + personal.email
      );
    }
  };

  return (
    <section id="contact" className="cv-auto py-28 sm:py-36">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container-content"
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Let&apos;s work together.
          </h2>
          <p className="mt-4 text-text-secondary">
            {personal.availability.label}. Fill out the form or reach out directly.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">

          {/* ── Contact Form ─────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <GlassPanel variant="modal" elevated className="p-6 sm:p-10" aria-live="polite">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-16 text-center"
                >
                  <CheckCircle2 className="text-accent" size={40} strokeWidth={1.5} />
                  <p className="text-lg font-medium text-text-primary">{statusMessage}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-sm text-text-tertiary underline-offset-4 transition-colors hover:text-text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

                  {/* Honeypot — invisible to real users, bots usually fill it */}
                  

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => updateField("name")(e.target.value)}
                      error={fieldErrors.name}
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField("email")(e.target.value)}
                      error={fieldErrors.email}
                    />
                  </div>

                  <GlassSelect
                    id="budget"
                    label="Budget range"
                    placeholder="Select a range"
                    options={budgetOptions}
                    value={form.budget}
                    onChange={updateField("budget")}
                    optional
                  />

                  <FormField
                    as="textarea"
                    label="Project details"
                    name="message"
                    placeholder="Tell me about your project, goals, or idea."
                    required
                    value={form.message}
                    onChange={(e) => updateField("message")(e.target.value)}
                    error={fieldErrors.message}
                  />

                  {/* Error banner */}
                  {status === "error" && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400"
                    >
                      <TriangleAlert size={16} className="mt-0.5 shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {/* Dev-only: show config status so you can spot the issue immediately */}
                  {process.env.NODE_ENV === "development" && !isEmailJsConfigured && (
                    <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-xs text-amber-300">
                      <strong>⚠ EmailJS not configured</strong> — add credentials to{" "}
                      <code className="font-mono">.env.local</code> and restart the dev server.
                      Form will show a real error instead of fake success until then.
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "submitting"}
                    aria-disabled={status === "submitting"}
                    className="w-full sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                </form>
              )}
            </GlassPanel>
          </motion.div>

          {/* ── Direct Contact Sidebar ────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">

            {/* Direct links card */}
            <GlassPanel variant="card" className="p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary">Reach me directly</p>
              <div className="mt-4 flex flex-col gap-3">

                {/* Email — explicit, guaranteed-working mailto link */}
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
                  aria-label={`Send email to ${personal.email}`}
                >
                  <Mail size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
                  <span>{personal.email}</span>
                </a>

                {/* Phone */}
                <a
                  href={phoneHref}
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
                  aria-label={`Call ${personal.phone}`}
                >
                  {(() => {
                    const phoneLink = socialLinks.find((l) => l.platform === "phone");
                    if (!phoneLink) return null;
                    const Icon = phoneLink.icon;
                    return <Icon size={16} strokeWidth={1.75} className="shrink-0" />;
                  })()}
                  <span>{personal.phone}</span>
                </a>

                {/* Social links (GitHub, LinkedIn, Instagram) */}
                {socialLinks
                  .filter((l) => l.platform !== "email" && l.platform !== "phone" && l.platform !== "portfolio")
                  .map((link) => (
                    <a
                      key={link.platform}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
                      aria-label={`${link.label} — opens in a new tab`}
                    >
                      <link.icon size={16} strokeWidth={1.75} className="shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  ))}
              </div>
            </GlassPanel>

            {/* Location card */}
            <GlassPanel variant="card" className="p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary">Based in</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personal.location)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 block text-sm text-text-secondary transition-colors hover:text-text-primary"
                aria-label={`View ${personal.location} on Google Maps`}
              >
                {personal.location}
              </a>
            </GlassPanel>

            {/* Availability card */}
            <GlassPanel variant="card" className="p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary">Availability</p>
              <ul className="mt-3 space-y-1.5">
                {personal.availableFor.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-line/[0.08] pt-3 text-xs text-text-tertiary">
                Response time: {personal.responseTime}
              </p>
            </GlassPanel>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
