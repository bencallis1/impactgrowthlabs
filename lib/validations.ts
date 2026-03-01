import { z } from "zod";

export const founderApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  companyName: z.string().min(1, "Company name is required"),
  stage: z.enum(["pre-seed", "seed", "series-a", "series-b"] as const, {
    error: "Please select a funding stage",
  }),
  problemSpace: z.string().min(20, "Please describe your problem space (min 20 chars)"),
  traction: z.string().min(10, "Please describe your traction or revenue"),
  teamSize: z.string().min(1, "Team size is required"),
  fundingAsk: z.string().min(1, "Please describe your funding ask"),
  hearAboutUs: z.string().optional(),
  message: z.string().min(20, "Please tell us more (min 20 chars)"),
});

export const investorInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  firmName: z.string().optional(),
  checkSizeRange: z.enum(
    ["under-100k", "100k-500k", "500k-1m", "1m-5m", "5m-plus"] as const,
    { error: "Please select a check size range" }
  ),
  focusAreas: z.array(z.string()).min(1, "Please select at least one focus area"),
  accreditedInvestor: z.boolean().refine((v) => v === true, {
    message: "You must confirm accredited investor status",
  }),
  message: z.string().min(20, "Please tell us more (min 20 chars)"),
});

export type FounderApplicationData = z.infer<typeof founderApplicationSchema>;
export type InvestorInquiryData = z.infer<typeof investorInquirySchema>;
