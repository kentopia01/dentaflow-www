import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  clinicName: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  country: z.string().optional(),
  outlets: z.string().optional(),
  currentTool: z.string().optional(),
});

// ── Google Sheets (service account JWT) ──────────────────────────────────────

async function appendToSheet(data: z.infer<typeof waitlistSchema>) {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!;
  const sa = JSON.parse(raw);

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: sa.client_email, sub: sa.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now, exp: now + 3600,
    scope: "https://www.googleapis.com/auth/spreadsheets",
  };

  const encode = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const sigInput = `${encode({ alg: "RS256", typ: "JWT" })}.${encode(payload)}`;

  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, "");
  const key = await crypto.subtle.importKey(
    "pkcs8", Buffer.from(pemBody, "base64"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, Buffer.from(sigInput));
  const jwt = `${sigInput}.${Buffer.from(sig).toString("base64url")}`;

  const { access_token } = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  }).then(r => r.json()) as { access_token: string };

  const sheetId = process.env.WAITLIST_SHEET_ID!;
  const row = [
    new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" }),
    data.clinicName, data.name, data.email,
    data.country ?? "—", data.outlets ?? "—", data.currentTool ?? "—",
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:G:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [row] }),
    }
  );
}

// ── Welcome email to applicant (Gmail OAuth) ─────────────────────────────────

async function sendWelcomeEmail(data: z.infer<typeof waitlistSchema>) {
  const clientId = process.env.GMAIL_CLIENT_ID!;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET!;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN!;
  const from = "nora@01-digital.com";

  const { access_token } = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId, client_secret: clientSecret,
      refresh_token: refreshToken, grant_type: "refresh_token",
    }),
  }).then(r => r.json()) as { access_token: string };

  const firstName = data.name.split(" ")[0];
  const landingUrl = "https://dentaflow-www.vercel.app";

  const html = `
<div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111827;">
  <div style="padding:32px 0 24px;">
    <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:32px;">
      <div style="width:32px;height:32px;background:#059669;border-radius:8px;display:flex;align-items:center;justify-content:center;">
        <span style="color:#fff;font-weight:700;font-size:14px;">D</span>
      </div>
      <span style="font-size:16px;font-weight:600;color:#111827;">DentaFlow</span>
    </div>

    <h1 style="font-size:24px;font-weight:700;margin:0 0 12px;line-height:1.3;">
      You're on the list, ${firstName}.
    </h1>
    <p style="font-size:15px;color:#6b7280;margin:0 0 24px;line-height:1.6;">
      Thanks for signing up for DentaFlow early access. We're onboarding Singapore dental clinics in batches and will reach out as soon as your slot opens — usually within 2 weeks.
    </p>

    <div style="background:#f9fafb;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
      <p style="font-size:13px;font-weight:600;color:#374151;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em;">What happens next</p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:20px;height:20px;background:#059669;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
            <span style="color:#fff;font-size:11px;font-weight:700;">1</span>
          </div>
          <p style="font-size:14px;color:#374151;margin:0;line-height:1.5;">We review your application and confirm your clinic details</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:20px;height:20px;background:#059669;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
            <span style="color:#fff;font-size:11px;font-weight:700;">2</span>
          </div>
          <p style="font-size:14px;color:#374151;margin:0;line-height:1.5;">You get a personal setup call — we'll have your clinic live in under 10 minutes</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:20px;height:20px;background:#059669;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
            <span style="color:#fff;font-size:11px;font-weight:700;">3</span>
          </div>
          <p style="font-size:14px;color:#374151;margin:0;line-height:1.5;">Patients can book online, reminders send automatically, recalls queue themselves</p>
        </div>
      </div>
    </div>

    <a href="${landingUrl}" style="display:inline-block;background:#059669;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:32px;">
      Learn more about DentaFlow →
    </a>

    <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 24px;">
    <p style="font-size:13px;color:#9ca3af;margin:0;line-height:1.6;">
      You signed up as <strong>${data.clinicName}</strong>. If you have any questions in the meantime, just reply to this email.
    </p>
  </div>
</div>`;

  const message = [
    `From: DentaFlow <${from}>`,
    `To: ${data.name} <${data.email}>`,
    `Subject: You're on the DentaFlow waitlist`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
  ].join("\r\n");

  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(from)}/messages/send`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw: Buffer.from(message).toString("base64url") }),
    }
  );

  if (!res.ok) throw new Error(`Gmail: ${await res.text()}`);
}

// ── Telegram notification ─────────────────────────────────────────────────────

async function notifyTelegram(data: z.infer<typeof waitlistSchema>) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID!;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${process.env.WAITLIST_SHEET_ID}`;

  const text = [
    `🦷 *New DentaFlow Waitlist Signup*`,
    ``,
    `*Clinic:* ${data.clinicName}`,
    `*Contact:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Country:* ${data.country ?? "—"}`,
    `*Outlets:* ${data.outlets ?? "—"}`,
    `*Books via:* ${data.currentTool ?? "—"}`,
    ``,
    `[View waitlist →](${sheetUrl})`,
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = waitlistSchema.parse(body);

    const [sheetsResult, telegramResult, emailResult] = await Promise.allSettled([
      appendToSheet(data),
      notifyTelegram(data),
      sendWelcomeEmail(data),
    ]);

    if (sheetsResult.status === "rejected") console.error("[waitlist] Sheets:", sheetsResult.reason);
    if (telegramResult.status === "rejected") console.error("[waitlist] Telegram:", telegramResult.reason);
    if (emailResult.status === "rejected") console.error("[waitlist] Welcome email:", emailResult.reason);

    console.log("[waitlist]", { clinic: data.clinicName, sheets: sheetsResult.status, telegram: telegramResult.status, email: emailResult.status });
    return NextResponse.json({ ok: true });

  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
