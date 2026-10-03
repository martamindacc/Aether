"use server"

/**
 * Sends a contact-form message by email from the server, so every submission
 * reaches the practice regardless of the visitor's device or mail setup.
 *
 * Delivery goes through Resend's REST API. Configure in the hosting
 * environment (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY      required; from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    inbox that receives messages (default: the practice Gmail)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Aether Practice <hello@aetherpractice.com>"
 *                       (default: Resend's onboarding sender, which only delivers to
 *                       the Resend account owner's address — fine for testing)
 */

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; reason: "invalid" | "unavailable" }

const MAX_LENGTH = { name: 200, email: 320, message: 5000 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c)
}

export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (typeof formData.get("company") === "string" && (formData.get("company") as string).trim() !== "") {
    return { status: "sent" }
  }

  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  const language = formData.get("language") === "no" ? "no" : "en"

  if (
    !name || !email || !message ||
    name.length > MAX_LENGTH.name || email.length > MAX_LENGTH.email || message.length > MAX_LENGTH.message ||
    !EMAIL_PATTERN.test(email)
  ) {
    return { status: "error", reason: "invalid" }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message from", email, "was not delivered")
    return { status: "error", reason: "unavailable" }
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "martamindacc@gmail.com"
  const from = process.env.CONTACT_FROM_EMAIL ?? "Aether Practice <onboarding@resend.dev>"

  const text = `Name: ${name}\nEmail: ${email}\nLanguage: ${language}\n\n${message}`
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}<br/><strong>Email:</strong> ${escapeHtml(email)}<br/><strong>Language:</strong> ${language}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website contact from ${name}`,
        text,
        html,
      }),
    })
    if (!response.ok) {
      console.error("[contact] Resend responded", response.status, await response.text())
      return { status: "error", reason: "unavailable" }
    }
    return { status: "sent" }
  } catch (error) {
    console.error("[contact] Sending failed", error)
    return { status: "error", reason: "unavailable" }
  }
}
