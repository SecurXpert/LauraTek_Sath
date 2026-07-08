import React from "react";
import { Edit } from "lucide-react";
import { ResumeFormData } from "../../Resume";

interface CleanProfessionalTemplateProps {
  data: ResumeFormData;
  step: string;
  withPhoto: boolean | null;
  handlePreviewPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CleanProfessionalTemplate({
  data,
  step,
  withPhoto,
  handlePreviewPhotoUpload,
}: CleanProfessionalTemplateProps) {
  return (
    <div className="min-h-[297mm] w-full md:w-[210mm] mx-auto shadow-2xl bg-white break-words">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-8 md:p-10 flex items-center gap-8">
        {withPhoto && (
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 group">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-indigo-200 bg-white">
              {data.profile_photo_url ? (
                <img src={data.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-indigo-400">
                    {data.first_name?.[0]}{data.last_name?.[0]}
                  </span>
                </div>
              )}
            </div>
            {step === "dashboard" && (
              <>
                <label htmlFor="preview-photo-upload-default" className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition shadow-lg border-2 border-white">
                  <Edit size={16} className="text-white" />
                </label>
                <input 
                  id="preview-photo-upload-default" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePreviewPhotoUpload} 
                />
              </>
            )}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {data.first_name} {data.last_name}
          </h1>
          <p className="text-xl text-indigo-200">{data.job_title}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-indigo-100">
            {data.email && <span>{data.email}</span>}
            {data.phone_number && <span>{data.phone_number}</span>}
            {data.city && <span>{data.city}, {data.permanent_address[0]?.country || "India"}</span>}
            {data.linkedin_url && <span>LinkedIn: {data.linkedin_url}</span>}
            {data.github_url && <span>GitHub: {data.github_url}</span>}
          </div>
        </div>
      </div>

      {/* Skills Bar */}
      {data.skills.length > 0 && (
        <div className="bg-gray-100 px-8 md:px-10 py-4 border-b">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="p-8 md:p-10">
        {/* Professional Summary */}
        {data.professional_summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-900 mb-3 border-b-2 border-indigo-900 pb-1">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.professional_summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {data.work_experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-900 pb-1">Experience</h2>
                {data.work_experience.map((exp, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="font-semibold text-gray-800">{exp.designation}</h3>
                    <p className="text-indigo-700 text-sm">{exp.company_name}</p>
                    <p className="text-gray-500 text-xs">{exp.start_date} — {exp.is_current ? "Present" : exp.end_date}</p>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc pl-4 mt-2 text-sm text-gray-700">
                        {exp.responsibilities.map((line, li) => <li key={li}>{line}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {data.education_details.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-900 pb-1">Education</h2>
                {data.education_details.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-indigo-700 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.start_year} — {edu.end_year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {data.project_details.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-900 pb-1">Projects</h2>
                {data.project_details.map((proj, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold">{proj.name}</h3>
                    <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {data.certifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-900 pb-1">Certifications</h2>
                <ul className="list-disc pl-4 text-sm text-gray-700">
                  {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
                </ul>
              </div>
            )}

            {data.awards.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-900 pb-1">Awards</h2>
                <ul className="list-disc pl-4 text-sm text-gray-700">
                  {data.awards.map((award, i) => <li key={i}>{award}</li>)}
                </ul>
              </div>
            )}

            {(data.languages.length > 0 || data.hobbies.length > 0) && (
              <div>
                {data.languages.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-indigo-900 mb-2 border-b-2 border-indigo-900 pb-1">Languages</h2>
                    <p className="text-sm text-gray-700">{data.languages.join(", ")}</p>
                  </div>
                )}
                {data.hobbies.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-indigo-900 mb-2 border-b-2 border-indigo-900 pb-1">Hobbies</h2>
                    <p className="text-sm text-gray-700">{data.hobbies.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
