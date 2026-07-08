import React from "react";
import { ResumeFormData } from "../../Resume";

interface ProfessionalSummarySectionProps {
  data: ResumeFormData;
  update: (field: keyof ResumeFormData, value: any) => void;
  errors: Record<string, string>;
}

export default function ProfessionalSummarySection({
  data,
  update,
  errors,
}: ProfessionalSummarySectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-5">Professional Summary</h2>
      <textarea
        value={data.professional_summary}
        onChange={(e) => update("professional_summary", e.target.value)}
        rows={5}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.professional_summary ? "border-black" : "border-black"}`}
        placeholder="Results-driven developer with..."
      />
      {errors.professional_summary && <p className="text-red-500 text-xs mt-1">{errors.professional_summary}</p>}
    </section>
  );
}
