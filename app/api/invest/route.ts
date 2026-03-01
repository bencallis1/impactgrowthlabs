import { NextRequest, NextResponse } from "next/server";
import { investorInquirySchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = investorInquirySchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL ?? "hello@impactgrowthlabs.com";

    if (apiKey && apiKey !== "your_resend_api_key") {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Impact Growth Labs <noreply@impactgrowthlabs.com>",
        to,
        subject: `New Investor Inquiry: ${data.fullName}${data.firmName ? ` (${data.firmName})` : ""}`,
        text: [
          `Name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Firm: ${data.firmName ?? "—"}`,
          `Check Size: ${data.checkSizeRange}`,
          `Focus Areas: ${data.focusAreas.join(", ")}`,
          `Accredited: ${data.accreditedInvestor ? "Yes" : "No"}`,
          `Message: ${data.message}`,
        ].join("\n\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invest form error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 400 }
    );
  }
}
