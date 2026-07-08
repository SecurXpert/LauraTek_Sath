import React from "react";
import { Plus, Trash2, Award, Globe, Heart } from "lucide-react";
import { ResumeFormData } from "../../Resume";

interface AdditionalInfoSectionProps {
  data: ResumeFormData;
  updateArray: (field: keyof ResumeFormData, index: number, value: string, subField?: string) => void;
  addCertification: () => void;
  addAward: () => void;
  addLanguage: () => void;
  addHobby: () => void;
  removeFromArray: (field: keyof ResumeFormData, index: number) => void;
  errors: Record<string, string>;
}

export default function AdditionalInfoSection({
  data,
  updateArray,
  addCertification,
  addAward,
  addLanguage,
  addHobby,
  removeFromArray,
  errors,
}: AdditionalInfoSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Award size={18} /> Certifications
          </h3>
          <button
            onClick={addCertification}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>
        {errors.certifications_main && <p className="text-red-500 text-xs mb-2">{errors.certifications_main}</p>}
        <div className="space-y-3">
          {data.certifications.map((cert, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-2">
                <textarea
                  value={cert}
                  onChange={(e) => updateArray("certifications", i, e.target.value)}
                  maxLength={150}
                  rows={2}
                  className={`flex-1 px-3 py-2 border rounded-lg text-sm resize-none ${errors[`certifications_${i}`] ? "border-black" : "border-black"}`}
                />
                <button
                  onClick={() => removeFromArray("certifications", i)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {errors[`certifications_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`certifications_${i}`]}</p>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Award size={18} /> Awards
          </h3>
          <button
            onClick={addAward}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>
        {errors.awards_main && <p className="text-red-500 text-xs mb-2">{errors.awards_main}</p>}
        <div className="space-y-3">
          {data.awards.map((award, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-2">
                <textarea
                  value={award}
                  onChange={(e) => updateArray("awards", i, e.target.value)}
                  maxLength={150}
                  rows={2}
                  className={`flex-1 px-3 py-2 border rounded-lg text-sm resize-none ${errors[`awards_${i}`] ? "border-black" : "border-black"}`}
                />
                <button
                  onClick={() => removeFromArray("awards", i)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {errors[`awards_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`awards_${i}`]}</p>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Globe size={18} /> Languages
          </h3>
          <button
            onClick={addLanguage}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>
        {errors.languages_main && <p className="text-red-500 text-xs mb-2">{errors.languages_main}</p>}
        <div className="space-y-3">
          {data.languages.map((lang, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-2">
                <textarea
                  value={lang}
                  onChange={(e) => updateArray("languages", i, e.target.value)}
                  maxLength={50}
                  rows={2}
                  className={`flex-1 px-3 py-2 border rounded-lg text-sm resize-none ${errors[`languages_${i}`] ? "border-black" : "border-black"}`}
                />
                <button
                  onClick={() => removeFromArray("languages", i)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {errors[`languages_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`languages_${i}`]}</p>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Heart size={18} /> Hobbies
          </h3>
          <button
            onClick={addHobby}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>
        {errors.hobbies_main && <p className="text-red-500 text-xs mb-2">{errors.hobbies_main}</p>}
        <div className="space-y-3">
          {data.hobbies.map((hobby, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-2">
                <textarea
                  value={hobby}
                  onChange={(e) => updateArray("hobbies", i, e.target.value)}
                  maxLength={100}
                  rows={2}
                  className={`flex-1 px-3 py-2 border rounded-lg text-sm resize-none ${errors[`hobbies_${i}`] ? "border-black" : "border-black"}`}
                />
                <button
                  onClick={() => removeFromArray("hobbies", i)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {errors[`hobbies_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`hobbies_${i}`]}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
