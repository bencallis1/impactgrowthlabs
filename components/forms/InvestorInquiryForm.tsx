"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import {
  investorInquirySchema,
  type InvestorInquiryData,
} from "@/lib/validations";

const checkSizeOptions = [
  { value: "under-100k", label: "Under $100K" },
  { value: "100k-500k", label: "$100K – $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m-5m", label: "$1M – $5M" },
  { value: "5m-plus", label: "$5M+" },
];

const focusAreaOptions = [
  "Climate & Energy",
  "Health & Wellness",
  "Education",
  "Circular Economy",
  "Financial Inclusion",
  "Food & Agriculture",
  "Gender Lens",
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0F1A14] placeholder-gray-400 focus:border-[#52B788] focus:outline-none focus:ring-2 focus:ring-[#52B788]/20 transition-all";

const labelClass = "block text-sm font-medium text-[#1A3A2E] mb-1.5";
const errorClass = "mt-1 text-xs text-red-500";

export function InvestorInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InvestorInquiryData>({
    resolver: zodResolver(investorInquirySchema),
    defaultValues: { focusAreas: [], accreditedInvestor: false },
  });

  const onSubmit = async (data: InvestorInquiryData) => {
    const res = await fetch("/api/invest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7FAF8]">
          <CheckCircle className="text-[#52B788]" size={36} />
        </div>
        <h3 className="font-serif text-2xl text-[#1A3A2E] mb-3">
          Inquiry received!
        </h3>
        <p className="text-[#0F1A14]/60 max-w-md">
          Thank you for your interest in partnering with Impact Growth Labs. A
          member of our team will reach out within 3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            {...register("fullName")}
            placeholder="Alex Johnson"
            className={inputClass}
          />
          {errors.fullName && (
            <p className={errorClass}>{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="alex@fund.com"
            className={inputClass}
          />
          {errors.email && (
            <p className={errorClass}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Firm / Organization</label>
          <input
            {...register("firmName")}
            placeholder="Horizon Capital (optional)"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Typical Check Size *</label>
          <select {...register("checkSizeRange")} className={inputClass}>
            <option value="">Select range</option>
            {checkSizeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.checkSizeRange && (
            <p className={errorClass}>{errors.checkSizeRange.message}</p>
          )}
        </div>
      </div>

      {/* Focus areas */}
      <div>
        <label className={labelClass}>Focus Areas * (select all that apply)</label>
        <Controller
          name="focusAreas"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {focusAreaOptions.map((area) => {
                const selected = field.value.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      const next = selected
                        ? field.value.filter((v) => v !== area)
                        : [...field.value, area];
                      field.onChange(next);
                    }}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                      selected
                        ? "border-[#1A3A2E] bg-[#1A3A2E] text-white"
                        : "border-gray-200 text-[#0F1A14]/60 hover:border-[#52B788]"
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.focusAreas && (
          <p className={errorClass}>{errors.focusAreas.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about your investment thesis, what you're looking for, and how you'd like to collaborate."
          className={inputClass}
        />
        {errors.message && (
          <p className={errorClass}>{errors.message.message}</p>
        )}
      </div>

      {/* Accredited investor */}
      <div className="rounded-xl border border-gray-200 bg-[#F7FAF8] p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("accreditedInvestor")}
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1A3A2E] accent-[#1A3A2E]"
          />
          <span className="text-sm text-[#0F1A14]/70">
            I confirm that I am an accredited investor as defined by applicable
            securities regulations in my jurisdiction. *
          </span>
        </label>
        {errors.accreditedInvestor && (
          <p className={errorClass}>{errors.accreditedInvestor.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1A3A2E] px-8 py-4 text-base font-medium text-white hover:bg-[#2D6A4F] transition-colors disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : null}
        {isSubmitting ? "Submitting..." : "Send Inquiry"}
      </button>
    </form>
  );
}
