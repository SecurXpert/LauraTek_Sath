import React from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Education, ResumeFormData } from "../../Resume";

interface EducationSectionProps {
  data: ResumeFormData;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  addEducation: () => void;
  removeFromArray: (field: keyof ResumeFormData, index: number) => void;
  errors: Record<string, string>;
}

export default function EducationSection({
  data,
  updateEducation,
  addEducation,
  removeFromArray,
  errors,
}: EducationSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap size={20} /> Education
        </h2>
        <button
          onClick={addEducation}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {errors.education_details_main && <p className="text-red-500 text-xs mb-3">{errors.education_details_main}</p>}
      {data.education_details.map((edu, i) => (
        <div key={i} className="mb-6 pb-5 border-b last:border-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Education {i + 1}</span>
            <button
              onClick={() => removeFromArray("education_details", i)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <textarea
            placeholder="Degree"
            value={edu.degree}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            onChange={(e) => updateEducation(i, "degree", e.target.value.replace(/[\r\n]+/g, ""))}
            maxLength={50}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg mb-1 resize-none ${errors[`edu_degree_${i}`] ? "border-black" : "border-black"}`}
          />
          {errors[`edu_degree_${i}`] && <p className="text-red-500 text-xs mb-2">{errors[`edu_degree_${i}`]}</p>}
          <textarea
            placeholder="Institution / University"
            value={edu.institution}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            onChange={(e) => updateEducation(i, "institution", e.target.value.replace(/[\r\n]+/g, ""))}
            maxLength={50}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg mb-1 resize-none ${errors[`edu_institution_${i}`] ? "border-black" : "border-black"}`}
          />
          {errors[`edu_institution_${i}`] && <p className="text-red-500 text-xs mb-2">{errors[`edu_institution_${i}`]}</p>}
          <textarea
            placeholder="Field of Study"
            value={edu.field_of_study}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            onChange={(e) => updateEducation(i, "field_of_study", e.target.value.replace(/[\r\n]+/g, ""))}
            maxLength={50}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg mb-1 resize-none ${errors[`edu_field_of_study_${i}`] ? "border-black" : "border-black"}`}
          />
          {errors[`edu_field_of_study_${i}`] && <p className="text-red-500 text-xs mb-2">{errors[`edu_field_of_study_${i}`]}</p>}
          <input
            placeholder="Grade / CGPA"
            value={edu.grade}
            onChange={(e) => updateEducation(i, "grade", e.target.value)}
            maxLength={6}
            className={`w-full px-3 py-2 border rounded-lg mb-1 ${errors[`edu_grade_${i}`] ? "border-black" : "border-black"}`}
          />
          {errors[`edu_grade_${i}`] && <p className="text-red-500 text-xs mb-2">{errors[`edu_grade_${i}`]}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                placeholder="Start Year"
                value={edu.start_year}
                onChange={(e) => updateEducation(i, "start_year", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${errors[`edu_start_year_${i}`] ? "border-black" : "border-black"}`}
              />
              {errors[`edu_start_year_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`edu_start_year_${i}`]}</p>}
            </div>
            <div>
              <input
                placeholder="End Year"
                value={edu.end_year}
                onChange={(e) => updateEducation(i, "end_year", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${errors[`edu_end_year_${i}`] ? "border-black" : "border-black"}`}
              />
              {errors[`edu_end_year_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`edu_end_year_${i}`]}</p>}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
