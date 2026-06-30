import React from "react";
import { Plus, Trash2, MapPin, Briefcase, GraduationCap, Code, Award, Globe, Heart, Save } from "lucide-react";
import { ResumeFormData, Address, WorkExperience, Education, Project } from "./types";

interface ResumeFormProps {
  data: ResumeFormData;
  update: (field: keyof ResumeFormData, value: any) => void;
  updateAddress: (field: keyof Address, value: string) => void;
  updateArray: (field: keyof ResumeFormData, index: number, value: string, subField?: string) => void;
  updateExperience: (index: number, field: keyof WorkExperience, value: any) => void;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  updateProject: (index: number, field: keyof Project, value: string) => void;
  addSkill: () => void;
  addLanguage: () => void;
  addHobby: () => void;
  addCertification: () => void;
  addAward: () => void;
  addExperience: () => void;
  addEducation: () => void;
  addProject: () => void;
  removeFromArray: (field: keyof ResumeFormData, index: number) => void;
  errors: Record<string, string>;
  withPhoto: boolean | null;
  handleFormFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFileName: string;
  handleRemovePhoto: () => void;
  saving: boolean;
  handleSave: () => void;
}

export default function ResumeForm({
  data,
  update,
  updateAddress,
  updateArray,
  updateExperience,
  updateEducation,
  updateProject,
  addSkill,
  addLanguage,
  addHobby,
  addCertification,
  addAward,
  addExperience,
  addEducation,
  addProject,
  removeFromArray,
  errors,
  withPhoto,
  handleFormFileChange,
  imageFileName,
  handleRemovePhoto,
  saving,
  handleSave,
}: ResumeFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-6 sm:space-y-8">
          <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-5 text-indigo-600">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  value={data.first_name}
                  onChange={(e) => update("first_name", e.target.value)}
                  maxLength={30}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.first_name ? "border-black" : "border-black"}`}
                />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  value={data.last_name}
                  onChange={(e) => update("last_name", e.target.value)}
                  maxLength={30}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.last_name ? "border-black" : "border-black"}`}
                />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  value={data.job_title}
                  onChange={(e) => update("job_title", e.target.value)}
                  maxLength={30}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.job_title ? "border-black" : "border-black"}`}
                />
                {errors.job_title && <p className="text-red-500 text-xs mt-1">{errors.job_title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <textarea
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  rows={2}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 resize-none ${errors.email ? "border-black" : "border-black"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  value={data.phone_number}
                  onChange={(e) => update("phone_number", e.target.value)}
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 ${errors.phone_number ? "border-black" : "border-black"}`}
                />
                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  value={data.nationality}
                  onChange={(e) => update("nationality", e.target.value)}
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 ${errors.nationality ? "border-black" : "border-black"}`}
                />
                {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  value={data.city}
                  onChange={(e) => update("city", e.target.value)}
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 ${errors.city ? "border-black" : "border-black"}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                <input
                  value={data.pin_code}
                  onChange={(e) => update("pin_code", e.target.value)}
                  maxLength={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 ${errors.pin_code ? "border-black" : "border-black"}`}
                />
                {errors.pin_code && <p className="text-red-500 text-xs mt-1">{errors.pin_code}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  value={data.linkedin_url}
                  onChange={(e) => update("linkedin_url", e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 ${errors.linkedin_url ? "border-black" : "border-black"}`}
                />
                {errors.linkedin_url && <p className="text-red-500 text-xs mt-1">{errors.linkedin_url}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input
                  value={data.github_url}
                  onChange={(e) => update("github_url", e.target.value)}
                  placeholder="https://github.com/..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 ${errors.github_url ? "border-black" : "border-black"}`}
                />
                {errors.github_url && <p className="text-red-500 text-xs mt-1">{errors.github_url}</p>}
              </div>
              {withPhoto && (
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 border border-dashed rounded-xl">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border flex-shrink-0">
                      {data.profile_photo_url ? (
                        <img
                          src={data.profile_photo_url}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        id="profile-photo-input"
                        accept="image/*"
                        onChange={handleFormFileChange}
                        className="hidden"
                      />
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor="profile-photo-input"
                          className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-[#2B58FF] text-xs font-semibold rounded-lg cursor-pointer transition-colors inline-block border border-indigo-100"
                        >
                          Choose Image
                        </label>
                        <span className="text-xs text-gray-500 truncate max-w-[180px]">
                          {imageFileName || (data.profile_photo_url ? "Image selected" : "No image chosen")}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {data.profile_photo_url && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                          >
                            {/* Remove Photo */}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.profile_photo_url && (
                    <p className="text-red-500 text-xs mt-1">{errors.profile_photo_url}</p>
                  )}
                </div>
              )}
            </div>
          </section>

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

          <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <MapPin size={20} /> Permanent Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                <input
                  value={data.permanent_address[0]?.street || ""}
                  onChange={(e) => updateAddress("street", e.target.value)}
                  maxLength={30}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.address_street ? "border-black" : "border-black"}`}
                />
                {errors.address_street && <p className="text-red-500 text-xs mt-1">{errors.address_street}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  value={data.permanent_address[0]?.city || ""}
                  onChange={(e) => updateAddress("city", e.target.value)}
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.address_city ? "border-black" : "border-black"}`}
                />
                {errors.address_city && <p className="text-red-500 text-xs mt-1">{errors.address_city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  value={data.permanent_address[0]?.state || ""}
                  onChange={(e) => updateAddress("state", e.target.value)}
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.address_state ? "border-black" : "border-black"}`}
                />
                {errors.address_state && <p className="text-red-500 text-xs mt-1">{errors.address_state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  value={data.permanent_address[0]?.country || ""}
                  onChange={(e) => updateAddress("country", e.target.value)}
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.address_country ? "border-black" : "border-black"}`}
                />
                {errors.address_country && <p className="text-red-500 text-xs mt-1">{errors.address_country}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code / PIN</label>
                <input
                  value={data.permanent_address[0]?.postal_code || ""}
                  onChange={(e) => updateAddress("postal_code", e.target.value)}
                  maxLength={6}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.postal_code ? "border-black" : "border-black"}`}
                />
                {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6 sm:space-y-8">
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
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
      </div>
      {/* Save Resume Button in bottom-right corner */}
      <div className="flex justify-end mt-8 pb-12">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#2B58FF] to-[#8B3BFF] text-white font-bold text-[16px] rounded-full shadow-md hover:shadow-lg hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Resume"}
        </button>
      </div>
    </>
  );
}
