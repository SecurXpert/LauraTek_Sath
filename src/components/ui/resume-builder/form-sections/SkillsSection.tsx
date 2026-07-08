import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { ResumeFormData } from "../../Resume";

interface SkillsSectionProps {
  data: ResumeFormData;
  updateArray: (field: keyof ResumeFormData, index: number, value: string, subField?: string) => void;
  addSkill: () => void;
  removeFromArray: (field: keyof ResumeFormData, index: number) => void;
  errors: Record<string, string>;
}

export default function SkillsSection({
  data,
  updateArray,
  addSkill,
  removeFromArray,
  errors,
}: SkillsSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <button
          onClick={addSkill}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {errors.skills_main && <p className="text-red-500 text-xs mb-3">{errors.skills_main}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.skills.map((skill, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-center gap-2">
              <textarea
                value={skill}
                onChange={(e) => updateArray("skills", i, e.target.value)}
                rows={2}
                className={`flex-1 min-w-0 px-3 py-2 border rounded-lg resize-none ${errors[`skills_${i}`] ? "border-black" : "border-black"}`}
                placeholder="React, Node.js, AWS..."
              />
              <button
                onClick={() => removeFromArray("skills", i)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            {errors[`skills_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`skills_${i}`]}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
