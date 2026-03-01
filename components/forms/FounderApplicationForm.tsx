"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import {
  founderApplicationSchema,
  type FounderApplicationData,
} from "@/lib/validations";

const stages = [
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B+" },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0F1A14] placeholder-gray-400 focus:border-[#52B788] focus:outline-none focus:ring-2 focus:ring-[#52B788]/20 transition-all";

const labelClass = "block text-sm font-medium text-[#1A3A2E] mb-1.5";

const errorClass = "mt-1 text-xs text-red-500";

export function FounderApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FounderApplicationData>({
    resolver: zodResolver(founderApplicationSchema),
  });

  const onSubmit = async (data: FounderApplicationData) => {
    const res = await fetch("/api/apply", {
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
          Application received!
        </h3>
        <p className="text-[#0F1A14]/60 max-w-md">
          Thank you for applying. Our team reviews every application carefully
          and will be in touch within 5 business days.
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
            placeholder="Jane Smith"
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
            placeholder="jane@company.com"
            className={inputClass}
          />
          {errors.email && (
            <p className={errorClass}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Company Name *</label>
          <input
            {...register("companyName")}
            placeholder="Acme Impact Co."
            className={inputClass}
          />
          {errors.companyName && (
            <p className={errorClass}>{errors.companyName.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Funding Stage *</label>
          <select {...register("stage")} className={inputClass}>
            <option value="">Select stage</option>
            {stages.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {errors.stage && (
            <p className={errorClass}>{errors.stage.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Problem Space *</label>
        <textarea
          {...register("problemSpace")}
          rows={3}
          placeholder="What problem are you solving, and why does it matter?"
          className={inputClass}
        />
        {errors.problemSpace && (
          <p className={errorClass}>{errors.problemSpace.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>Traction / Revenue *</label>
          <input
            {...register("traction")}
            placeholder="e.g. $10K MRR, 500 users"
            className={inputClass}
          />
          {errors.traction && (
            <p className={errorClass}>{errors.traction.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Team Size *</label>
          <input
            {...register("teamSize")}
            placeholder="e.g. 3 FT + 2 advisors"
            className={inputClass}
          />
          {errors.teamSize && (
            <p className={errorClass}>{errors.teamSize.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Funding Ask *</label>
          <input
            {...register("fundingAsk")}
            placeholder="e.g. $500K pre-seed"
            className={inputClass}
          />
          {errors.fundingAsk && (
            <p className={errorClass}>{errors.fundingAsk.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>How did you hear about us?</label>
        <input
          {...register("hearAboutUs")}
          placeholder="Referral, LinkedIn, event, etc."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Anything else you&apos;d like to share? *</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about your mission, traction, or why you think we're the right partner."
          className={inputClass}
        />
        {errors.message && (
          <p className={errorClass}>{errors.message.message}</p>
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
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
