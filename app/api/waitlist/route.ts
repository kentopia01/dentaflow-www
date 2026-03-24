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

    const [sheetsResult, telegramResult] = await Promise.allSettled([
      appendToSheet(data),
      notifyTelegram(data),
    ]);

    if (sheetsResult.status === "rejected") console.error("[waitlist] Sheets:", sheetsResult.reason);
    if (telegramResult.status === "rejected") console.error("[waitlist] Telegram:", telegramResult.reason);

    console.log("[waitlist]", { clinic: data.clinicName, sheets: sheetsResult.status, telegram: telegramResult.status });
    return NextResponse.json({ ok: true });

  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
