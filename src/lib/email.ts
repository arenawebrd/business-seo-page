/**
 * Email utility — supports SMTP, Gmail, and Resend.
 *
 * Usage (SSR / API route):
 *   import { sendEmail } from '../lib/email';
 *   await sendEmail({ name, email, phone, suburb, message });
 *
 * Environment variables (set in .env):
 *   EMAIL_PROVIDER  = "smtp" | "gmail" | "resend"
 *   EMAIL_TO        = recipient address
 *   EMAIL_FROM      = sender address
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS
 *   GMAIL_USER / GMAIL_PASS
 *   RESEND_API_KEY
 */

export interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  suburb?: string;
  message: string;
}

export interface EmailResult {
  ok: boolean;
  error?: string;
}

function getConfig() {
  const provider = (import.meta.env.EMAIL_PROVIDER || 'smtp') as string;
  const to = import.meta.env.EMAIL_TO || 'hello@plumbingco.com.au';
  const from = import.meta.env.EMAIL_FROM || 'noreply@plumbingco.com.au';
  return { provider, to, from };
}

function buildSubject(name: string): string {
  return `Plumbing enquiry from ${name}`;
}

function buildBody(p: EmailPayload): string {
  const lines = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.phone ? `Phone: ${p.phone}` : null,
    p.suburb ? `Suburb: ${p.suburb}` : null,
    '',
    'Message:',
    p.message,
  ].filter(Boolean);
  return lines.join('\n');
}

// ── SMTP (generic) ──
async function sendViaSmtp(payload: EmailPayload): Promise<EmailResult> {
  const { to, from } = getConfig();
  const host = import.meta.env.SMTP_HOST;
  const port = parseInt(import.meta.env.SMTP_PORT || '587', 10);
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return { ok: false, error: 'SMTP_HOST, SMTP_USER, SMTP_PASS are required' };
  }

  // Dynamically import nodemailer (install: npm i nodemailer @types/nodemailer)
  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
    await transporter.sendMail({
      from,
      to,
      subject: buildSubject(payload.name),
      text: buildBody(payload),
      replyTo: payload.email,
    });
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// ── Gmail ──
async function sendViaGmail(payload: EmailPayload): Promise<EmailResult> {
  const { to } = getConfig();
  const user = import.meta.env.GMAIL_USER;
  const pass = import.meta.env.GMAIL_PASS;

  if (!user || !pass) {
    return { ok: false, error: 'GMAIL_USER and GMAIL_PASS are required' };
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"Plumbing Co" <${user}>`,
      to,
      subject: buildSubject(payload.name),
      text: buildBody(payload),
      replyTo: payload.email,
    });
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// ── Resend ──
async function sendViaResend(payload: EmailPayload): Promise<EmailResult> {
  const { to, from } = getConfig();
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY is required' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: [to],
      subject: buildSubject(payload.name),
      text: buildBody(payload),
      reply_to: payload.email,
    });
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// ── Public API ──
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const { provider } = getConfig();

  switch (provider) {
    case 'gmail':
      return sendViaGmail(payload);
    case 'resend':
      return sendViaResend(payload);
    case 'smtp':
    default:
      return sendViaSmtp(payload);
  }
}
