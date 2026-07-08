import React from "react";
import { ResumeFormData } from "../../Resume";

interface PersonalDetailsSectionProps {
  data: ResumeFormData;
  update: (field: keyof ResumeFormData, value: any) => void;
  errors: Record<string, string>;
  withPhoto: boolean | null;
  handleFormFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFileName: string;
  handleRemovePhoto: () => void;
}

export default function PersonalDetailsSection({
  data,
  update,
  errors,
  withPhoto,
  handleFormFileChange,
  imageFileName,
  handleRemovePhoto,
}: PersonalDetailsSectionProps) {
  return (
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
                      Remove Photo
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
  );
}
