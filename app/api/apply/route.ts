import { NextRequest, NextResponse } from "next/server";
import { founderApplicationSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = founderApplicationSchema.parse(body);

    // Send via Resend if configured
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL ?? "hello@impactgrowthlabs.com";

    if (apiKey && apiKey !== "your_resend_api_key") {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Impact Growth Labs <noreply@impactgrowthlabs.com>",
        to,
        subject: `New Founder Application: ${data.companyName}`,
        text: [
          `Name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Company: ${data.companyName}`,
          `Stage: ${data.stage}`,
          `Problem Space: ${data.problemSpace}`,
          `Traction: ${data.traction}`,
          `Team Size: ${data.teamSize}`,
          `Funding Ask: ${data.fundingAsk}`,
          `How they heard: ${data.hearAboutUs ?? "—"}`,
          `Message: ${data.message}`,
        ].join("\n\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply form error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 400 }
    );
  }
}
