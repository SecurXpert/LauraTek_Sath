import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Tab = "My Account" | "Password & Security";

export function useProfileData() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("My Account");

  // ────────────────────────────────────────────────
  //   My Account states
  // ─────────────────────────────────────────────
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
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [role, setRole] = useState("student");

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
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [courseCount, setCourseCount] = useState<number>(0);
  const [certificateCount, setCertificateCount] = useState<number>(0);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);

  const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL;

  const fetchProfile = async () => {
    setLoadingProfile(true);
    setProfileError(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token");

      const res = await fetch(`${BASE_URL}/student/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("access_token");
        setProfileError("Unauthorized. Please login again.");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch profile");

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
      setResumeUrl(data.resume || data.resume_url || "");
      setRole(data.role || "student");

      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (err: any) {
      setProfileError(err.message || "Failed to load profile.");
    } finally {
      setLoadingProfile(false);
    }
  };

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

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const coursesRes = await fetch(`${BASE_URL}/dashboard/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (coursesRes.ok) {
        const courses = await coursesRes.json();
        setCourseCount(courses.length);
      }

      const certsRes = await fetch(`${BASE_URL}/student/student/my-certificates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (certsRes.ok) {
        const certData = await certsRes.json();
        setCertificateCount(certData.certificates?.length || 0);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchProfileCompletion = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/student/profile-completion`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCompletionPercentage(Math.round(data.completion_percentage ?? 0));
      }
    } catch (err) {
      console.error("Error fetching profile completion:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchStats();
    fetchProfileCompletion();
  }, []);

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
      if (resumeFile) formData.append("resume", resumeFile);

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
      await fetchProfileCompletion();
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

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      localStorage.removeItem("access_token");
      navigate("/login");
    } catch (err: any) {
      setPasswordError(err.message || "Error changing password");
    } finally {
      setChangingPassword(false);
    }
  };

  const displayImage = previewUrl || profilePicture;
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "No Name";
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "") || "NA";

  return {
    activeTab,
    setActiveTab,
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    phone, setPhone,
    dob, setDob,
    gender, setGender,
    address, setAddress,
    aboutMe, setAboutMe,
    profilePicture, setProfilePicture,
    linkedin, setLinkedin,
    github, setGithub,
    resumeUrl, setResumeUrl,
    resumeFile, setResumeFile,
    role, setRole,
    loadingProfile,
    profileError,
    updatingProfile,
    updateSuccess,
    isEditMode, setIsEditMode,
    fileInputRef,
    selectedFile, setSelectedFile,
    previewUrl, setPreviewUrl,
    twoFactorEnabled, setTwoFactorEnabled,
    emailNotifications, setEmailNotifications,
    smsNotifications, setSmsNotifications,
    loadingSettings,
    savingSettings,
    settingsMessage,
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
    handleSaveSettings,
    handleChangePassword,
    displayImage,
    fullName,
    initials
  };
}
