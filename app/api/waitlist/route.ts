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

  const html = `<!DOCTYPE html>
<html>
<head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;">
  <tr><td align="center" style="padding:32px 16px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">

      <!-- Logo -->
      <tr><td style="padding-bottom:32px;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:32px;height:32px;background:#059669;border-radius:8px;text-align:center;vertical-align:middle;">
              <span style="color:#ffffff;font-weight:700;font-size:15px;line-height:32px;">D</span>
            </td>
            <td style="padding-left:10px;font-size:16px;font-weight:600;color:#111827;vertical-align:middle;">DentaFlow</td>
          </tr>
        </table>
      </td></tr>

      <!-- Headline -->
      <tr><td style="padding-bottom:12px;">
        <h1 style="margin:0;font-size:26px;font-weight:700;color:#111827;line-height:1.3;">You're on the list, ${firstName}.</h1>
      </td></tr>

      <!-- Subtext -->
      <tr><td style="padding-bottom:28px;">
        <p style="margin:0;font-size:15px;color:#6b7280;line-height:1.7;">
          Thanks for signing up for DentaFlow early access. We're onboarding dental clinics in batches and will reach out as soon as your slot opens — usually within 3–5 business days.
        </p>
      </td></tr>

      <!-- Steps box -->
      <tr><td style="background:#f9fafb;border-radius:10px;padding:20px 24px 24px;margin-bottom:28px;">
        <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">What happens next</p>

        <!-- Step 1 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
          <tr>
            <td width="28" valign="top" style="padding-top:1px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr><td style="width:22px;height:22px;background:#059669;border-radius:50%;text-align:center;vertical-align:middle;">
                  <span style="color:#ffffff;font-size:11px;font-weight:700;line-height:22px;">1</span>
                </td></tr>
              </table>
            </td>
            <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.6;">We review your application and confirm your clinic details.</td>
          </tr>
        </table>

        <!-- Step 2 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
          <tr>
            <td width="28" valign="top" style="padding-top:1px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr><td style="width:22px;height:22px;background:#059669;border-radius:50%;text-align:center;vertical-align:middle;">
                  <span style="color:#ffffff;font-size:11px;font-weight:700;line-height:22px;">2</span>
                </td></tr>
              </table>
            </td>
            <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.6;">You get a personal setup call — we'll have your clinic live in under 10 minutes.</td>
          </tr>
        </table>

        <!-- Step 3 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="28" valign="top" style="padding-top:1px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr><td style="width:22px;height:22px;background:#059669;border-radius:50%;text-align:center;vertical-align:middle;">
                  <span style="color:#ffffff;font-size:11px;font-weight:700;line-height:22px;">3</span>
                </td></tr>
              </table>
            </td>
            <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.6;">Patients book online, reminders send automatically, recalls queue themselves.</td>
          </tr>
        </table>
      </td></tr>

      <!-- Spacer -->
      <tr><td style="height:28px;"></td></tr>

      <!-- CTA -->
      <tr><td style="padding-bottom:32px;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#059669;border-radius:8px;">
              <a href="${landingUrl}" style="display:inline-block;padding:13px 26px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Learn more about DentaFlow &rarr;</a>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Divider -->
      <tr><td style="border-top:1px solid #f3f4f6;padding-top:20px;">
        <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
          You signed up as <strong style="color:#6b7280;">${data.clinicName}</strong>. Questions? Just reply to this email.
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

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
