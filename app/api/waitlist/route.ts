import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  clinicName: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  outlets: z.string().optional(),
  currentTool: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = waitlistSchema.parse(body);

    // Forward to a Google Sheets webhook or Notion API if configured
    // For now: log to Vercel function logs + optional webhook
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🦷 New DentaFlow waitlist signup!\n*Clinic:* ${data.clinicName}\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Outlets:* ${data.outlets ?? "—"}\n*Currently uses:* ${data.currentTool ?? "—"}`,
          ...data,
        }),
      }).catch(() => {}); // don't fail if webhook fails
    }

    console.log("[waitlist]", JSON.stringify(data));

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
