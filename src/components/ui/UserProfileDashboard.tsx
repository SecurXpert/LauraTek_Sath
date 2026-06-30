import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Pencil, Shield, Bell, LockKeyhole } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Header from "../Header";

type Tab = "My Account" | "Password & Security" | "Notifications";
 
const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("My Account");
 
  // ────────────────────────────────────────────────
  //   My Account states (unchanged)
  // ────────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const [aboutMe, setAboutMe] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const role = "student";
 
  // Guest-specific fields
  const [educationalStatus, setEducationalStatus] = useState("");
  const [qualification, setQualification] = useState("");
  const [passedoutYear, setPassedoutYear] = useState("");
  const [interest, setInterest] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
 
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 
  // ────────────────────────────────────────────────
  //   Password & Security states
  // ────────────────────────────────────────────────
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
 
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
 
  const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL;
 
  // ────────────────────────────────────────────────
  //   Fetch student profile (My Account tab)
  // ────────────────────────────────────────────────
  const fetchProfile = async () => {
    setLoadingProfile(true);
    setProfileError(null);
 
    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) throw new Error("No token");
 
      let res = await fetch(`${BASE_URL}/student/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      let isGuest = false;
      if (!res.ok) {
        res = await fetch(`${BASE_URL}/guest/my-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        isGuest = true;
      }

      if (res.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        setProfileError("Unauthorized. Please login again.");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch profile");

      if (isGuest) {
        localStorage.setItem("userRole", "guest");
        localStorage.setItem("role", "guest");
        window.location.reload();
        return;
      }
 
      const data = await res.json();
 
      if (data?.name && typeof data.name === "string") {
        const parts = data.name.trim().split(/\s+/);
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }
 
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setDob(data.dob || "");
      setGender(data.gender || "");
      setAddress(data.address || null);
      setAboutMe(data.about_me || null);
      setProfilePicture(data.profile_picture || null);
      setLinkedin(data.linkedin || "");
      setGithub(data.github || "");
      

      setEducationalStatus(data.educational_status || "");
      setQualification(data.qualification || "");
      setPassedoutYear(data.passedout_year || "");
      setInterest(data.interest || "");
      setStateName(data.state || "");
      setCity(data.city || "");
      setCountry(data.country || "");
 
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (err: any) {
      setProfileError("Failed to load profile.");
    } finally {
      setLoadingProfile(false);
    }
  };
 
  // ────────────────────────────────────────────────
  //   Fetch account settings (2FA + notifications)
  // ────────────────────────────────────────────────
  const fetchAccountSettings = async () => {
    setLoadingSettings(true);
    setSettingsMessage(null);
 
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
 
      const res = await fetch(`${BASE_URL}/account/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      if (!res.ok) throw new Error("Failed to load settings");
 
      const data = await res.json();
      setTwoFactorEnabled(data.two_factor_enabled ?? false);
      setEmailNotifications(data.email_notifications ?? true);
      setSmsNotifications(data.sms_notifications ?? true);
    } catch (err) {
      setSettingsMessage("Could not load security settings.");
    } finally {
      setLoadingSettings(false);
    }
  };
 
  useEffect(() => {
    fetchProfile();
  }, []);
 
  // Load settings when switching to Password & Security tab
  useEffect(() => {
    if (activeTab === "Password & Security") {
      fetchAccountSettings();
    }
  }, [activeTab]);
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  };
 
  const handleUpdateProfile = async () => {
    // ... (your existing profile update logic – unchanged)
    setUpdatingProfile(true);
    setUpdateSuccess(false);
    setProfileError(null);
 
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
 
      formData.append("name", `${firstName.trim()} ${lastName.trim()}`.trim());
      formData.append("email", email);
      if (phone) formData.append("phone", phone);
      if (address) formData.append("address", address);
      if (aboutMe) formData.append("about_me", aboutMe);
      if (dob) formData.append("dob", dob);
      if (gender) formData.append("gender", gender);
      if (linkedin) formData.append("linkedin", linkedin);
      if (github) formData.append("github", github);
      if (selectedFile) formData.append("profile_picture", selectedFile);
 
      const res = await fetch(`${BASE_URL}/student/update`, {
        method: "PUT",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
 
      if (res.status === 401) {
        localStorage.removeItem("access_token");
        setProfileError("Session expired.");
        return;
      }
      if (!res.ok) throw new Error("Update failed");
 
      await fetchProfile();
      setUpdateSuccess(true);
      setIsEditMode(false);
      setTimeout(() => setUpdateSuccess(false), 4000);
    } catch (err: any) {
      setProfileError(err.message || "Failed to update.");
    } finally {
      setUpdatingProfile(false);
    }
  };
 
  const handleSaveSettings = async () => {
    setSavingSettings(true);
    setSettingsMessage(null);
 
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Not authenticated");
 
      const body = {
        two_factor_enabled: twoFactorEnabled,
        email_notifications: emailNotifications,
        sms_notifications: smsNotifications,
      };
 
      const res = await fetch(`${BASE_URL}/account/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
 
      if (!res.ok) throw new Error("Failed to save settings");
 
      setSettingsMessage("Settings saved successfully");
      setTimeout(() => setSettingsMessage(null), 4000);
    } catch (err) {
      setSettingsMessage("Failed to save settings");
    } finally {
      setSavingSettings(false);
    }
  };
 
  const handleChangePassword = async () => {
    setChangingPassword(true);
    setPasswordMessage(null);
    setPasswordError(null);
 
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match");
      setChangingPassword(false);
      return;
    }
 
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      setChangingPassword(false);
      return;
    }
 
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Not authenticated");
 
      const res = await fetch(`${BASE_URL}/account/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
 
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to change password");
      }
 
      setPasswordMessage("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordMessage(null), 5000);
    } catch (err: any) {
      setPasswordError(err.message || "Error changing password");
    } finally {
      setChangingPassword(false);
    }
  };
 
  const displayImage = previewUrl || profilePicture;
 
  return (
    <>
      <Header />
 
      <div className="relative max-w-[1400px] mx-auto p-4 md:p-6 font-sans">
        {/* Gradient Banner */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl h-36 md:h-44">
          <h1 className="text-xl md:text-2xl font-bold">Profile Edit</h1>
          <p className="text-sm opacity-90 mt-1">Get a chance to change your profile.</p>
        </div>
 
        <div className="relative z-10 mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left – Profile Card (unchanged) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative mx-auto w-fit">
                <div
                  className={role.toLowerCase() !== "guest" && isEditMode ? "cursor-pointer" : ""}
                  onClick={() => role.toLowerCase() !== "guest" && isEditMode && fileInputRef.current?.click()}
                >
                  <Avatar className="w-24 h-24 ring-4 ring-blue-100">
                    {displayImage ? (
                      <AvatarImage src={displayImage} alt="Profile" />
                    ) : (
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {(firstName?.[0] || "") + (lastName?.[0] || "") || "NA"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
 
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
 
                {/* {role.toLowerCase() !== "guest" && (
                  <div
                    className="absolute -top-1 -right-1 bg-gray-200 text-gray-600 text-xs rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-300"
                    onClick={() => setIsEditMode(!isEditMode)}
                    title={isEditMode ? "Cancel edit" : "Edit profile"}
                  >
                    <Pencil className="w-4 h-4" />
                  </div>
                )} */}
              </div>
 
              <div className="text-center mt-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {`${firstName || ""} ${lastName || ""}`.trim() || "No Name"}
                </h2>
                <p className="text-sm text-gray-600">{role || "student"}</p>
                {!isEditMode && (
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {aboutMe || "No bio yet"}
                  </p>
                )}
              </div>
            </div>
          </div>
 
          {/* Right – Tabs Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex gap-8 border-b border-gray-200 mb-6">
                {["My Account"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as Tab)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
 
              {/* ────────────────────────────── My Account ────────────────────────────── */}
              {activeTab === "My Account" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ... your existing My Account fields – unchanged ... */}
                    <div className="space-y-5">
                      <h3 className="font-semibold text-lg text-gray-900">My Profile</h3>
                      <div>
                        <Label>First Name</Label>
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={!isEditMode} className="mt-1" />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditMode} className="mt-1" />
                      </div>
                      {role.toLowerCase() === "guest" ? (
                        <div>
                          <Label>Educational Status</Label>
                          <Input value={educationalStatus} onChange={(e) => setEducationalStatus(e.target.value)} disabled={!isEditMode} className="mt-1" />
                        </div>
                      ) : (
                        <div>
                          <Label>Date of Birth</Label>
                          <Input value={dob} onChange={(e) => setDob(e.target.value)} placeholder="YYYY-MM-DD" disabled={!isEditMode} className="mt-1" />
                        </div>
                      )}
                      <div>
                        <Label>Role</Label>
                        <Input value={role} onChange={(e) => setRole(e.target.value)} disabled={!isEditMode} className="mt-1" />
                      </div>
                    </div>
 
                    <div className="space-y-5">
                      <h3 className="font-semibold text-lg text-gray-900">Personal</h3>
                      <div>
                        <Label>Last Name</Label>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={!isEditMode} className="mt-1" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditMode} className="mt-1" />
                      </div>
                      
                      {role.toLowerCase() === "guest" ? (
                        <>
                          <div>
                            <Label>Qualification</Label>
                            <Input value={qualification} onChange={(e) => setQualification(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                          <div>
                            <Label>Passed Out Year</Label>
                            <Input value={passedoutYear} onChange={(e) => setPassedoutYear(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label>Gender</Label>
                            <div className="flex gap-4 mt-2 flex-wrap">
                              {["Male", "Female", "Other (Not to Say)"].map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={opt}
                                    checked={gender === opt}
                                    onChange={(e) => setGender(e.target.value)}
                                    disabled={!isEditMode}
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <span className="text-sm text-gray-700">{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label>Address</Label>
                            <Input value={address || ""} onChange={(e) => setAddress(e.target.value || null)} disabled={!isEditMode} className="mt-1" />
                          </div>
     
                          {isEditMode && (
                            <div>
                              <Label>About Me</Label>
                              <textarea
                                value={aboutMe || ""}
                                onChange={(e) => setAboutMe(e.target.value || null)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-100"
                                rows={3}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
 
                    <div className="space-y-5">
                      <h3 className="font-semibold text-lg text-gray-900">{role.toLowerCase() === "guest" ? "Location & Interest" : "Professional Info"}</h3>
                      
                      {role.toLowerCase() === "guest" ? (
                        <>
                          <div>
                            <Label>Country</Label>
                            <Input value={country} onChange={(e) => setCountry(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                          <div>
                            <Label>State</Label>
                            <Input value={stateName} onChange={(e) => setStateName(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                          <div>
                            <Label>City</Label>
                            <Input value={city} onChange={(e) => setCity(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                          <div>
                            <Label>Interest</Label>
                            <Input value={interest} onChange={(e) => setInterest(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label>LinkedIn</Label>
                            <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                          <div>
                            <Label>GitHub</Label>
                            <Input value={github} onChange={(e) => setGithub(e.target.value)} disabled={!isEditMode} className="mt-1" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
 
                  <Separator className="my-8" />
                  {/* {role.toLowerCase() !== "guest" && (
                    <div className="flex justify-end gap-4">
                      {isEditMode && (
                        <Button variant="outline" onClick={() => setIsEditMode(false)}>
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={handleUpdateProfile}
                        disabled={!isEditMode || updatingProfile}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2 rounded-full"
                      >
                        {updatingProfile ? "Updating..." : isEditMode ? "Save Changes" : "Update Profile"}
                      </Button>
                    </div>
                  )} */}
 
                  <div className="mt-6 text-sm">
                    {loadingProfile && <span className="text-gray-500">Loading profile…</span>}
                    {profileError && <span className="text-red-600">{profileError}</span>}
                    {updateSuccess && <span className="text-green-600">Profile updated successfully!</span>}
                  </div>
                </>
              )}
 
              {/* ─────────────────────── Password & Security Tab ─────────────────────── */}
              {/*
              {activeTab === "Password & Security" && (
                <div className="space-y-10">
                  {/* Security Settings (like GET + PUT /account/settings) *\/}
                  {/*
                  <div className="bg-gray-50 p-6 rounded-xl border">
                    <div className="flex items-center gap-3 mb-5">
                      <Shield className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold">Security & Notifications</h3>
                    </div>
 
                    {loadingSettings ? (
                      <p className="text-gray-500">Loading settings...</p>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Two-Factor Authentication</Label>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <Switch
                            checked={twoFactorEnabled}
                            onCheckedChange={setTwoFactorEnabled}
                          />
                        </div>
 
                        <Separator />
 
                        <div className="space-y-4">
                          <h4 className="font-medium">Notification Preferences</h4>
                          <div className="flex items-center justify-between">
                            <Label>Email Notifications</Label>
                            <Switch
                              checked={emailNotifications}
                              onCheckedChange={setEmailNotifications}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>SMS Notifications</Label>
                            <Switch
                              checked={smsNotifications}
                              onCheckedChange={setSmsNotifications}
                            />
                          </div>
                        </div>
 
                        <div className="flex justify-end mt-6">
                          <Button
                            onClick={handleSaveSettings}
                            disabled={savingSettings}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {savingSettings ? "Saving..." : "Save Settings"}
                          </Button>
                        </div>
 
                        {settingsMessage && (
                          <p className={`text-sm mt-2 ${settingsMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                            {settingsMessage}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  *\/}
 
                  {/* Change Password Section *\/}
                  <div className="bg-gray-50 p-6 rounded-xl border">
                    <div className="flex items-center gap-3 mb-5">
                      <LockKeyhole className="w-6 h-6 text-red-600" />
                      <h3 className="text-lg font-semibold">Change Password</h3>
                    </div>
 
                    <div className="grid gap-5 max-w-md">
                      <div>
                        <Label>Current Password</Label>
                        <Input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="••••••••"
                          className="mt-1.5"
                        />
                      </div>
 
                      <div>
                        <Label>New Password</Label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 8 characters"
                          className="mt-1.5"
                        />
                      </div>
 
                      <div>
                        <Label>Confirm New Password</Label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-type new password"
                          className="mt-1.5"
                        />
                      </div>
 
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={handleChangePassword}
                          disabled={changingPassword || !oldPassword || !newPassword}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {changingPassword ? "Changing..." : "Update Password"}
                        </Button>
                      </div>
 
                      {passwordMessage && (
                        <p className="text-green-600 text-sm">{passwordMessage}</p>
                      )}
                      {passwordError && (
                        <p className="text-red-600 text-sm">{passwordError}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              */}
 
              {/* ────────────────────────────── Notifications ────────────────────────────── */}
              {/*
              {activeTab === "Notifications" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-amber-600" />
                    <h3 className="text-lg font-semibold">Notification Settings</h3>
                  </div>
                  <p className="text-gray-600">
                    Fine-tune how and when you receive notifications. (Coming soon – currently managed in Security tab)
                  </p>
                  {/* You can later move or duplicate toggles here if needed *\/}
                </div>
              )}
              */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default UserProfileDashboard;
 
