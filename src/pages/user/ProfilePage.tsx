import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil, History, User, Lock, Clock, Shield, MapPin } from "lucide-react";
import Sidebar from '@/components/sidebar';
import Profileheader from "@/components/ui/Profileheader";
import ProfileSkeleton from "../profile-components/ProfileSkeleton";
import ProfileHeroBanner from "../profile-components/ProfileHeroBanner";
import PersonalInfoCard from "../profile-components/PersonalInfoCard";
import SocialProfilesCard from "../profile-components/SocialProfilesCard";
import QuickStatsCard from "../profile-components/QuickStatsCard";
import PasswordSecuritySettings from "../profile-components/PasswordSecuritySettings";
import { useProfileData } from "./useProfileData";

type Tab = "Profile Information" | "Password & Security" | "Session History";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "Profile Information", label: "Profile Information", icon: User },
  { id: "Session History", label: "Session History", icon: History },
  { id: "Password & Security", label: "Password & Security", icon: Lock },
];

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
    initials,
    sessionHistory,
    loadingHistory
  } = useProfileData();

  const extractFamily = (str: string) => {
    const match = str?.match(/family='([^']+)'/);
    return match ? match[1] : 'Unknown';
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-[#f7fafd] to-blue-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={setActive} active={active} />

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
            <div className="overflow-hidden w-full mt-6">
              <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 px-4 sm:px-6">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                        isActive
                          ? "bg-[#635BFF] text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 bg-white"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {/* ────────────────────────────── Profile Information ────────────────────────────── */}
                {activeTab === "Profile Information" && (
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

                {/* ─────────────────────── Session History Tab ─────────────────────── */}
                {activeTab === "Session History" && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                      <History className="w-5 h-5 text-gray-700" />
                      <h3 className="text-lg font-semibold text-gray-900">Session History</h3>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                      {loadingHistory ? (
                        <div className="p-8 text-center text-gray-500">Loading history...</div>
                      ) : sessionHistory && sessionHistory.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No session history found.</div>
                      ) : (
                        sessionHistory?.map((session: any) => {
                          const osName = extractFamily(session.os);
                          const browserName = extractFamily(session.browser);
                          
                          const date = new Date(session.login_time);
                          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                          const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                          return (
                            <div key={session.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center text-[#635BFF] shrink-0">
                                  <Shield className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <h4 className="font-semibold text-gray-900 text-sm">{osName} • {browserName}</h4>
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{session.ip || "Unknown Location"}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col sm:items-end justify-center pl-14 sm:pl-0">
                                <div className="font-semibold text-gray-900 text-sm">{dateStr}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{timeStr}</div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
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
