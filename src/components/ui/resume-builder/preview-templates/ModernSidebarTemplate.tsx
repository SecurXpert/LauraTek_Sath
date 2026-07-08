import React from "react";
import { Edit, Briefcase, GraduationCap, Code, Award } from "lucide-react";
import { ResumeFormData } from "../../Resume";

interface ModernSidebarTemplateProps {
  data: ResumeFormData;
  step: string;
  handlePreviewPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ModernSidebarTemplate({
  data,
  step,
  handlePreviewPhotoUpload,
}: ModernSidebarTemplateProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-[297mm] w-full md:w-[210mm] mx-auto shadow-2xl break-words">
      {/* Sidebar */}
      <div className="w-full md:w-5/12 bg-gradient-to-b from-indigo-950 via-indigo-900 to-blue-950 text-white p-8 md:p-10">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4 group">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-indigo-400">
              {data.profile_photo_url ? (
                <img
                  src={data.profile_photo_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-700 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {data.first_name?.[0]}{data.last_name?.[0]}
                  </span>
                </div>
              )}
            </div>
            {step === "dashboard" && (
              <>
                <label htmlFor="preview-photo-upload-sidebar" className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition shadow-lg border-2 border-white">
                  <Edit size={16} className="text-white" />
                </label>
                <input 
                  id="preview-photo-upload-sidebar" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePreviewPhotoUpload} 
                />
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold text-center">{data.first_name} {data.last_name}</h2>
          <p className="text-indigo-300 text-center">{data.job_title}</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="uppercase text-sm font-semibold tracking-wider mb-3 text-indigo-300">
              Contact
            </h3>
            <p className="text-sm mb-1">{data.email || "—"}</p>
            <p className="text-sm mb-1">{data.phone_number || "—"}</p>
            <p className="text-sm">
              {data.city ? `${data.city}, ` : ""}
              {data.permanent_address[0]?.country || "India"}
            </p>
            {data.linkedin_url && (
              <p className="text-sm mt-1 break-all">LinkedIn: {data.linkedin_url}</p>
            )}
            {data.github_url && (
              <p className="text-sm mt-1 break-all">GitHub: {data.github_url}</p>
            )}
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="uppercase text-sm font-semibold tracking-wider mb-3 text-indigo-300">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-sm bg-white/10 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div>
              <h3 className="uppercase text-sm font-semibold tracking-wider mb-3 text-indigo-300">
                Languages
              </h3>
              <ul className="text-sm space-y-1.5">
                {data.languages.map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </div>
          )}

          {data.hobbies.length > 0 && (
            <div>
              <h3 className="uppercase text-sm font-semibold tracking-wider mb-3 text-indigo-300">
                Hobbies
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((h, i) => (
                  <span key={i} className="text-sm bg-white/10 px-3 py-1 rounded-full">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="w-full md:w-7/12 bg-white p-8 md:p-12">
        {data.professional_summary && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.professional_summary}
            </p>
          </div>
        )}

        {data.work_experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
              <Briefcase size={22} /> Experience
            </h2>
            {data.work_experience.map((exp, i) => (
              <div key={i} className="mb-10">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.designation}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                  </span>
                </div>
                <p className="text-indigo-700 font-medium mb-1">{exp.company_name}</p>
                <p className="text-gray-500 text-sm mb-1">
                  {exp.location} • {exp.employment_type}
                </p>
                {exp.technologies_used.length > 0 && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Tech:</span> {exp.technologies_used.join(" • ")}
                  </p>
                )}
                {exp.responsibilities.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-700 mb-3">
                    {exp.responsibilities.map((line, li) => (
                      <li key={li}>{line}</li>
                    ))}
                  </ul>
                )}
                {exp.achievements.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Key Achievements:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                      {exp.achievements.map((ach, ai) => (
                        <li key={ai}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {data.education_details.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
              <GraduationCap size={22} /> Education
            </h2>
            {data.education_details.map((edu, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-indigo-700">{edu.institution}</p>
                <p className="text-gray-600">{edu.field_of_study}</p>
                {edu.grade && <p className="text-gray-600 text-sm">Grade: {edu.grade}</p>}
                <p className="text-gray-500 text-sm mt-1">
                  {edu.start_year} — {edu.end_year}
                </p>
              </div>
            ))}
          </div>
        )}

        {data.project_details.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
              <Code size={22} /> Projects
            </h2>
            {data.project_details.map((proj, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-xl font-semibold">{proj.name}</h3>
                <p className="text-gray-700 mt-1 whitespace-pre-line">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Tech:</span> {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {(data.certifications.length > 0 || data.awards.length > 0) && (
          <div>
            {data.certifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
                  <Award size={22} /> Certifications
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {data.certifications.map((cert, i) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.awards.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
                  <Award size={22} /> Awards & Honors
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {data.awards.map((award, i) => (
                    <li key={i}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
