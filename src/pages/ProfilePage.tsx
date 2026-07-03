import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import Sidebar from "../components/sidebar";
import Profileheader from "@/components/ui/Profileheader";
import ProfileSkeleton from "./profile-components/ProfileSkeleton";
import ProfileHeroBanner from "./profile-components/ProfileHeroBanner";
import PersonalInfoCard from "./profile-components/PersonalInfoCard";
import SocialProfilesCard from "./profile-components/SocialProfilesCard";
import QuickStatsCard from "./profile-components/QuickStatsCard";
import PasswordSecuritySettings from "./profile-components/PasswordSecuritySettings";
import { useProfileData } from "./useProfileData";

type Tab = "My Account" | "Password & Security";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Profile");

  const {
    activeTab, setActiveTab,
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    phone, setPhone,
    dob, setDob,
    gender, setGender,
    address, setAddress,
    aboutMe, setAboutMe,
    linkedin, setLinkedin,
    github, setGithub,
    resumeUrl, setResumeUrl,
    resumeFile, setResumeFile,
    loadingProfile,
    profileError,
    updatingProfile,
    updateSuccess,
    isEditMode, setIsEditMode,
    fileInputRef,
    oldPassword, setOldPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    changingPassword,
    passwordMessage,
    passwordError,
    showOldPassword, setShowOldPassword,
    showNewPassword, setShowNewPassword,
    showConfirmPassword, setShowConfirmPassword,
    courseCount,
    certificateCount,
    completionPercentage,
    handleFileChange,
    handleUpdateProfile,
    handleChangePassword,
    displayImage,
    fullName,
    initials
  } = useProfileData();

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-[#f7fafd] to-blue-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Profileheader />

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto relative">
          <div className="max-w-[1400px] mx-auto font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
              <div>
                <h1 className="font-inter font-bold text-[20px] sm:text-[23.7px] leading-[28px] sm:leading-[31.6px] tracking-normal text-[#101828]">Profile</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage your personal information and preferences</p>
              </div>
              <Button
                onClick={() => setIsEditMode(!isEditMode)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#2563EB] via-[#4A5AEC] to-[#7C3AED] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-medium"
              >
                <Pencil size={18} strokeWidth={2} />
                {isEditMode ? "Cancel Edit" : "Edit Profile"}
              </Button>
            </div>

            {/* Hero Banner */}
            <ProfileHeroBanner
              displayImage={displayImage}
              initials={initials}
              fullName={fullName}
              aboutMe={aboutMe}
              address={address}
              completionPercentage={completionPercentage}
              isEditMode={isEditMode}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
            />

            {/* Tabs */}
            <div className="overflow-hidden w-full">
              <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap gap-6 sm:gap-8 border-b border-gray-200 px-4 sm:px-6 pt-4">
                {(["My Account", "Password & Security"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {/* ────────────────────────────── My Account ────────────────────────────── */}
                {activeTab === "My Account" && (
                  loadingProfile ? (
                    <ProfileSkeleton />
                  ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Personal Information */}
                      <PersonalInfoCard
                        isEditMode={isEditMode}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        address={address}
                        setAddress={setAddress}
                        dob={dob}
                        setDob={setDob}
                        gender={gender}
                        setGender={setGender}
                        aboutMe={aboutMe}
                        setAboutMe={setAboutMe}
                        fullName={fullName}
                      />

                      {/* Social Profiles */}
                      <SocialProfilesCard
                        isEditMode={isEditMode}
                        linkedin={linkedin}
                        setLinkedin={setLinkedin}
                        github={github}
                        setGithub={setGithub}
                        resumeUrl={resumeUrl}
                        setResumeUrl={setResumeUrl}
                        resumeFile={resumeFile}
                        setResumeFile={setResumeFile}
                      />

                      {/* Edit Mode Actions */}
                      {isEditMode && (
                        <>
                          <Separator />
                          <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => setIsEditMode(false)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpdateProfile}
                              disabled={updatingProfile}
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                            >
                              {updatingProfile ? "Saving..." : "Save Changes"}
                            </Button>
                          </div>
                        </>
                      )}

                      {/* Status Messages */}
                      <div className="text-sm">
                        {profileError && <span className="text-red-600">{profileError}</span>}
                        {updateSuccess && <span className="text-green-600">Profile updated successfully!</span>}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Quick Stats */}
                      <QuickStatsCard
                        courseCount={courseCount}
                        certificateCount={certificateCount}
                      />
                    </div>
                  </div>
                  )
                )}

                {/* ─────────────────────── Password & Security Tab ─────────────────────── */}
                {activeTab === "Password & Security" && (
                  <PasswordSecuritySettings
                    oldPassword={oldPassword}
                    setOldPassword={setOldPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    showOldPassword={showOldPassword}
                    setShowOldPassword={setShowOldPassword}
                    showNewPassword={showNewPassword}
                    setShowNewPassword={setShowNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    changingPassword={changingPassword}
                    handleChangePassword={handleChangePassword}
                    passwordMessage={passwordMessage}
                    passwordError={passwordError}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
