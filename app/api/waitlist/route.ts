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

// ── Google Service Account Auth (for Sheets) ─────────────────────────────────

async function getServiceAccountToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY!;
  const privateKeyPem = rawKey.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    sub: email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/spreadsheets",
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");
  const header = { alg: "RS256", typ: "JWT" };
  const signingInput = `${encode(header)}.${encode(payload)}`;

  const pemBody = privateKeyPem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(pemBody, "base64"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  );

  const jwt = `${signingInput}.${Buffer.from(sig).toString("base64url")}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json() as { access_token: string };
  return data.access_token;
}

// ── Gmail OAuth Token (Nora's account) ───────────────────────────────────────

async function getGmailAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID!,
      client_secret: process.env.GMAIL_CLIENT_SECRET!,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json() as { access_token: string; error?: string };
  if (data.error) throw new Error(`Gmail OAuth error: ${data.error}`);
  return data.access_token;
}

// ── Sheets ────────────────────────────────────────────────────────────────────

async function appendToSheet(token: string, data: z.infer<typeof waitlistSchema>) {
  const sheetId = process.env.WAITLIST_SHEET_ID!;
  const timestamp = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });

  const row = [
    timestamp,
    data.clinicName,
    data.name,
    data.email,
    data.country ?? "—",
    data.outlets ?? "—",
    data.currentTool ?? "—",
    "dentaflow-www",
  ];

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:H:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    }
  );

  if (!res.ok) throw new Error(`Sheets error: ${await res.text()}`);
}

// ── Email notification via Gmail (Nora) ──────────────────────────────────────

async function sendNotificationEmail(token: string, data: z.infer<typeof waitlistSchema>) {
  const to = process.env.WAITLIST_NOTIFY_EMAIL ?? "nora@01-digital.com";
  const from = process.env.GMAIL_FROM ?? "nora@01-digital.com";
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${process.env.WAITLIST_SHEET_ID}`;

  const subject = `New DentaFlow waitlist signup — ${data.clinicName}`;

  const html = `
<div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;">
  <div style="background:#059669;padding:20px 24px;border-radius:8px 8px 0 0;">
    <h2 style="color:#fff;margin:0;font-size:18px;">New Waitlist Signup</h2>
    <p style="color:#d1fae5;margin:4px 0 0;font-size:13px;">DentaFlow Early Access</p>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-size:13px;width:130px;">Clinic</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;color:#111827;">${data.clinicName}</td>
      </tr>
      <tr style="border-top:1px solid #f3f4f6;">
        <td style="padding:8px 0;color:#6b7280;font-size:13px;">Contact</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;">${data.name}</td>
      </tr>
      <tr style="border-top:1px solid #f3f4f6;">
        <td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;">
          <a href="mailto:${data.email}" style="color:#059669;">${data.email}</a>
        </td>
      </tr>
      <tr style="border-top:1px solid #f3f4f6;">
        <td style="padding:8px 0;color:#6b7280;font-size:13px;">Country</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;">${data.country ?? "—"}</td>
      </tr>
      <tr style="border-top:1px solid #f3f4f6;">
        <td style="padding:8px 0;color:#6b7280;font-size:13px;">Outlets</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;">${data.outlets ?? "—"}</td>
      </tr>
      <tr style="border-top:1px solid #f3f4f6;">
        <td style="padding:8px 0;color:#6b7280;font-size:13px;">Books via</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;">${data.currentTool ?? "—"}</td>
      </tr>
    </table>

    <div style="margin-top:20px;padding:12px 16px;background:#f0fdf4;border-radius:6px;border:1px solid #bbf7d0;">
      <a href="${sheetUrl}" style="color:#059669;font-size:13px;font-weight:600;text-decoration:none;">
        View full waitlist in Google Sheets →
      </a>
    </div>
  </div>
  <p style="font-size:11px;color:#9ca3af;margin-top:12px;text-align:center;">
    Sent automatically · DentaFlow · dentaflow-www.vercel.app
  </p>
</div>`;

  const message = [
    `From: DentaFlow <${from}>`,
    `To: ${to}`,
    `Reply-To: ${data.name} <${data.email}>`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
  ].join("\r\n");

  const raw = Buffer.from(message).toString("base64url");

  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(from)}/messages/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    // Non-blocking — log but don't fail the signup
    console.error("[waitlist] Gmail send failed:", err);
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = waitlistSchema.parse(body);

    // Run Sheets + Gmail in parallel, non-blocking
    const [sheetsResult, gmailResult] = await Promise.allSettled([
      getServiceAccountToken().then((t) => appendToSheet(t, data)),
      getGmailAccessToken().then((t) => sendNotificationEmail(t, data)),
    ]);

    if (sheetsResult.status === "rejected") {
      console.error("[waitlist] Sheets failed:", sheetsResult.reason);
    }
    if (gmailResult.status === "rejected") {
      console.error("[waitlist] Gmail failed:", gmailResult.reason);
    }

    console.log("[waitlist] signup:", JSON.stringify({
      clinic: data.clinicName,
      email: data.email,
      country: data.country,
      sheets: sheetsResult.status,
      gmail: gmailResult.status,
    }));

    // Always return ok to the user
    return NextResponse.json({ ok: true });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error("[waitlist] Unexpected error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
