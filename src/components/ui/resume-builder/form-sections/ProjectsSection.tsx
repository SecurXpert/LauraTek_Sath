import React from "react";
import { Plus, Trash2, Code } from "lucide-react";
import { Project, ResumeFormData } from "../../Resume";

interface ProjectsSectionProps {
  data: ResumeFormData;
  updateProject: (index: number, field: keyof Project, value: string) => void;
  addProject: () => void;
  removeFromArray: (field: keyof ResumeFormData, index: number) => void;
  errors: Record<string, string>;
}

export default function ProjectsSection({
  data,
  updateProject,
  addProject,
  removeFromArray,
  errors,
}: ProjectsSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Code size={20} /> Projects
        </h2>
        <button
          onClick={addProject}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {errors.project_details_main && <p className="text-red-500 text-xs mb-3">{errors.project_details_main}</p>}
      {data.project_details.map((proj, i) => (
        <div key={i} className="mb-6 pb-5 border-b last:border-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Project {i + 1}</span>
            <button
              onClick={() => removeFromArray("project_details", i)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <textarea
            placeholder="Project Name"
            value={proj.name}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            onChange={(e) => updateProject(i, "name", e.target.value.replace(/[\r\n]+/g, ""))}
            maxLength={50}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg mb-1 resize-none ${errors[`proj_name_${i}`] ? "border-black" : "border-black"}`}
          />
          {errors[`proj_name_${i}`] && <p className="text-red-500 text-xs mb-2">{errors[`proj_name_${i}`]}</p>}
          <textarea
            placeholder="Description"
            value={proj.description}
            onChange={(e) => updateProject(i, "description", e.target.value)}
            rows={3}
            maxLength={150}
            className={`w-full px-3 py-2 border rounded-lg mb-1 text-sm ${errors[`proj_description_${i}`] ? "border-black" : "border-black"}`}
          />
          {errors[`proj_description_${i}`] && <p className="text-red-500 text-xs mb-2">{errors[`proj_description_${i}`]}</p>}
          <textarea
            placeholder="Technologies (comma separated)"
            value={proj.technologies}
            onChange={(e) => updateProject(i, "technologies", e.target.value)}
            maxLength={100}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg resize-none ${errors[`proj_technologies_${i}`] ? "border-black" : "border-black"}`}
          />
          {errors[`proj_technologies_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`proj_technologies_${i}`]}</p>}
        </div>
      ))}
    </section>
  );
}
