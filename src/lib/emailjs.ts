import emailjs from "@emailjs/browser";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ACTIVATE EMAILJS (one-time setup, ~5 minutes)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 1. Go to https://www.emailjs.com and create a free account.
 *
 * 2. Add an Email Service:
 *    Dashboard → Email Services → Add New Service → choose Gmail
 *    Connect your Gmail account (aaaryanxdrive@gmail.com)
 *    Copy the SERVICE ID (looks like: service_xxxxxxx)
 *
 * 3. Create an Email Template:
 *    Dashboard → Email Templates → Create New Template
 *
 *    Set "To Email" to:  aaaryanxdrive@gmail.com
 *    Set "From Name" to: {{from_name}}
 *    Set "Reply To" to:  {{from_email}}
 *    Set Subject to:     New message from {{from_name}}
 *
 *    Body (paste this exactly):
 *    ─────────────────────────
 *    Name:    {{from_name}}
 *    Email:   {{from_email}}
 *    Budget:  {{budget}}
 *
 *    {{message}}
 *    ─────────────────────────
 *
 *    Save → copy the TEMPLATE ID (looks like: template_xxxxxxx)
 *
 * 4. Get your Public Key:
 *    Dashboard → Account → General → Public Key (looks like: XXXXXXXXXXXXXXXXXXXX)
 *
 * 5. Create a file called .env.local in the ROOT of your project
 *    (same folder as package.json), and add:
 *
 *    NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
 *    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXXXXXXX
 *
 * 6. STOP and RESTART your dev server:
 *    Ctrl+C  →  npm run dev
 *    (Next.js only reads .env.local at startup — a running server won't pick it up)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TEMPLATE VARIABLES — these MUST match exactly (case-sensitive):
 *   {{from_name}}   ← sender's name
 *   {{from_email}}  ← sender's email
 *   {{budget}}      ← selected budget range
 *   {{message}}     ← message body
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/** True only when all three env vars are present and non-empty. */
export const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export interface ContactEmailParams {
  from_name: string;
  from_email: string;
  budget: string;
  message: string;
}

/**
 * Sends an email via EmailJS and returns the response.
 * Throws if credentials are missing or the send fails.
 */
export async function sendContactEmail(params: ContactEmailParams) {
  if (!isEmailJsConfigured) {
    throw new Error(
      "[EmailJS] Not configured — add NEXT_PUBLIC_EMAILJS_* vars to .env.local and restart the dev server."
    );
  }

  console.log("[EmailJS] Attempting send with params:", {
    serviceId: SERVICE_ID,
    templateId: TEMPLATE_ID,
    publicKey: PUBLIC_KEY ? PUBLIC_KEY.slice(0, 4) + "…" : "MISSING",
    templateParams: params,
  });

  const response = await emailjs.send(
    SERVICE_ID!,
    TEMPLATE_ID!,
    {
      from_name:  params.from_name,
      from_email: params.from_email,
      budget:     params.budget,
      message:    params.message,
    },
    PUBLIC_KEY!
  );

  console.log("[EmailJS] ✅ Send successful:", response);
  return response;
}
