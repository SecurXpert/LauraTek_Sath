import React from "react";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { WorkExperience, ResumeFormData } from "../../Resume";

interface WorkExperienceSectionProps {
  data: ResumeFormData;
  updateExperience: (index: number, field: keyof WorkExperience, value: any) => void;
  addExperience: () => void;
  removeFromArray: (field: keyof ResumeFormData, index: number) => void;
  errors: Record<string, string>;
}

export default function WorkExperienceSection({
  data,
  updateExperience,
  addExperience,
  removeFromArray,
  errors,
}: WorkExperienceSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Briefcase size={20} /> Work Experience
        </h2>
        <button
          onClick={addExperience}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {errors.work_experience_main && <p className="text-red-500 text-xs mb-3">{errors.work_experience_main}</p>}

      {data.work_experience.map((exp, i) => (
        <div key={i} className="mb-8 pb-6 border-b last:border-b-0 last:mb-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Experience {i + 1}</span>
            <button
              onClick={() => removeFromArray("work_experience", i)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <textarea
                placeholder="Company Name"
                value={exp.company_name}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                onChange={(e) => updateExperience(i, "company_name", e.target.value.replace(/[\r\n]+/g, ""))}
                maxLength={40}
                className={`px-4 py-2 border rounded-lg resize-none ${errors[`exp_company_name_${i}`] ? "border-black" : "border-black"}`}
                rows={2}
              />
              {errors[`exp_company_name_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`exp_company_name_${i}`]}</p>}
            </div>
            <div className="flex flex-col">
              <textarea
                placeholder="Designation"
                value={exp.designation}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                onChange={(e) => updateExperience(i, "designation", e.target.value.replace(/[\r\n]+/g, ""))}
                maxLength={40}
                className={`px-4 py-2 border rounded-lg resize-none ${errors[`exp_designation_${i}`] ? "border-black" : "border-black"}`}
                rows={2}
              />
              {errors[`exp_designation_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`exp_designation_${i}`]}</p>}
            </div>
            <div className="flex flex-col">
              <textarea
                placeholder="Employment Type (Full-time, Contract...)"
                value={exp.employment_type}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                onChange={(e) => updateExperience(i, "employment_type", e.target.value.replace(/[\r\n]+/g, ""))}
                maxLength={30}
                className={`px-4 py-2 border rounded-lg resize-none ${errors[`exp_employment_type_${i}`] ? "border-black" : "border-black"}`}
                rows={2}
              />
              {errors[`exp_employment_type_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`exp_employment_type_${i}`]}</p>}
            </div>
            <div className="flex flex-col">
              <textarea
                placeholder="Location"
                value={exp.location}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                onChange={(e) => updateExperience(i, "location", e.target.value.replace(/[\r\n]+/g, ""))}
                maxLength={30}
                className={`px-4 py-2 border rounded-lg resize-none ${errors[`exp_location_${i}`] ? "border-black" : "border-black"}`}
                rows={2}
              />
              {errors[`exp_location_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`exp_location_${i}`]}</p>}
            </div>
            <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 min-w-0">
                <input
                  type="month"
                  value={exp.start_date}
                  onChange={(e) => updateExperience(i, "start_date", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors[`exp_start_date_${i}`] ? "border-black" : "border-black"}`}
                />
                {errors[`exp_start_date_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`exp_start_date_${i}`]}</p>}
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="month"
                  value={exp.end_date}
                  disabled={exp.is_current}
                  onChange={(e) => updateExperience(i, "end_date", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${exp.is_current ? "opacity-70" : ""} ${errors[`exp_end_date_${i}`] ? "border-black" : "border-black"}`}
                />
                {errors[`exp_end_date_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`exp_end_date_${i}`]}</p>}
              </div>
            </div>
          </div>

          <label className="flex items-center mb-4 text-sm">
            <input
              type="checkbox"
              checked={exp.is_current}
              onChange={(e) => updateExperience(i, "is_current", e.target.checked)}
              className="mr-2"
            />
            I currently work here
          </label>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Technologies Used</label>
            <textarea
              value={exp.technologies_used.join(", ")}
              onChange={(e) =>
                updateExperience(
                  i,
                  "technologies_used",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
              rows={2}
              placeholder="React, TypeScript, Tailwind, Node.js"
              className="w-full px-3 py-2 border rounded-lg resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Responsibilities</label>
            <textarea
              value={exp.responsibilities.join("\n")}
              onChange={(e) =>
                updateExperience(
                  i,
                  "responsibilities",
                  e.target.value.split("\n")
                )
              }
              placeholder="• Built responsive UI components..."
              rows={4}
              className="w-full px-4 py-3 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Key Achievements</label>
            <textarea
              value={exp.achievements.join("\n")}
              onChange={(e) =>
                updateExperience(
                  i,
                  "achievements",
                  e.target.value.split("\n")
                )
              }
              placeholder="• Improved page load time by 40%..."
              rows={3}
              className="w-full px-4 py-3 border rounded-lg text-sm"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
