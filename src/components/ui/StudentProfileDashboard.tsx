// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Briefcase, Facebook, Linkedin, Twitter, Instagram, CheckCircle, Mail, Lock, Shield, Check, Bell, Clock } from "lucide-react";
// import Header from "../Header";

// type Tab = "My Account" | "Password & Security" | "Notifications";
// type PasswordStep = "initial" | "send-otp" | "enter-otp" | "new-password" | "success";

// const StudentProfileDashboard = () => {
//   const [activeTab, setActiveTab] = useState<Tab>("My Account");
//   const [passwordStep, setPasswordStep] = useState<PasswordStep>("initial");
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSendOTP = () => {
//     if (emailOrPhone) setPasswordStep("enter-otp");
//   };

//   const handleVerifyOTP = () => {
//     if (otp === "2576") setPasswordStep("new-password");
//   };

//   const handleChangePassword = () => {
//     if (newPassword && confirmPassword && newPassword === confirmPassword) {
//       setPasswordStep("success");
//     }
//   };

//   const resetPasswordFlow = () => {
//     setPasswordStep("initial");
//     setEmailOrPhone("");
//     setOtp("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   // Static Notifications - Only 1
//   const notifications = [
//     {
//       id: 1,
//       title: "Hello @OMG Employee it has been observed that many employees are not punching at the time of arrival as well as departure at the workplace. So, please do punch.",
//       time: "Sep 15 • Just now",
//       icon: Bell,
//       color: "text-blue-600",
//       badge: false, // No badge
//     },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="relative max-w-[1400px] mx-auto p-4 md:p-6 font-sans">
//         {/* ===== 1. TOP DIV: Gradient Banner ===== */}
//         <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl h-36 md:h-44">
//           <h1 className="text-xl md:text-2xl font-bold">Profile Edit</h1>
//           <p className="text-sm opacity-90 mt-1">Get a chance to change your profile.</p>
//         </div>

//         {/* ===== 2. MAIN CONTENT: Left Card + Right Form ===== */}
//         <div className="relative z-10 mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* ===== LEFT DIV: Profile Card ===== */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="relative mx-auto w-fit">
//                 <Avatar className="w-24 h-24 ring-4 ring-blue-100">
//                   <AvatarImage src="/assets/profile-avatar.jpg" alt="Mr. Beems" />
//                   <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//                     MB
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="absolute -top-1 -right-1 bg-gray-200 text-gray-600 text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
//                   @
//                 </div>
//               </div>

//               <div className="text-center mt-4">
//                 <h2 className="text-lg font-bold text-gray-900">Mr. Beems</h2>
//                 <p className="text-sm text-gray-600">Sr. Designer</p>
//                 <p className="text-xs text-gray-500 mt-2 leading-relaxed">
//                   Lorem ipsum dolor sit amet consectetur. Pulvinar Donec Quam Tortor sit sit, Nulla Feugiat Senectus in Consectetur.
//                 </p>
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <Briefcase className="w-4 h-4" /> Skills
//                 </h3>
//                 <div className="flex flex-wrap gap-2 justify-center">
//                   <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Web Design</Badge>
//                   <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Graphic Design</Badge>
//                 </div>
//               </div>

//               <p className="text-xs text-gray-500 text-center mt-6">
//                 MEMBER SINCE DECEMBER 12, 2020
//               </p>
//             </div>
//           </div>

//           {/* ===== RIGHT DIV: Form Card ===== */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//               {/* Tabs */}
//               <div className="flex gap-8 border-b border-gray-200 mb-6">
//                 {["My Account", "Password & Security", "Notifications"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => {
//                       setActiveTab(tab as Tab);
//                       if (tab !== "Password & Security") resetPasswordFlow();
//                     }}
//                     className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
//                       activeTab === tab
//                         ? "text-blue-600 border-blue-600"
//                         : "text-gray-500 border-transparent hover:text-gray-700"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               {/* ===== MY ACCOUNT TAB ===== */}
//               {activeTab === "My Account" && (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {/* COLUMN 1: My Profile */}
//                   <div className="space-y-5">
//                     <h3 className="font-semibold text-lg text-gray-900">My Profile</h3>
//                     <div>
//                       <Label className="text-sm text-gray-700">First Name</Label>
//                       <Input defaultValue="Mr. Beems" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label className="text-sm text-gray-700">Phone Number</Label>
//                       <Input defaultValue="+04 1234 5678" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label className="text-sm text-gray-700">Date of Birth</Label>
//                       <Input defaultValue="07/05/1987" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label className="text-sm text-gray-700">Role</Label>
//                       <Input defaultValue="Designer" className="mt-1" />
//                     </div>
//                   </div>

//                   {/* COLUMN 2: Job */}
//                   <div className="space-y-5">
//                     <h3 className="font-semibold text-lg text-gray-900">Job</h3>
//                     <div>
//                       <Label className="text-sm text-gray-700">Last Name</Label>
//                       <Input defaultValue="Jok" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label className="text-sm text-gray-700">Email</Label>
//                       <Input defaultValue="beems76@gmail.com" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label className="text-sm text-gray-700">Gender</Label>
//                       <div className="flex gap-4 mt-2 flex-wrap">
//                         {["Male", "Female", "Other (Not to Say)"].map((opt) => (
//                           <label key={opt} className="flex items-center gap-2 cursor-pointer">
//                             <input
//                               type="radio"
//                               name="gender"
//                               defaultChecked={opt === "Male"}
//                               className="w-4 h-4 text-blue-600 focus:ring-blue-500"
//                             />
//                             <span className="text-sm text-gray-700">{opt}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <Label className="text-sm text-gray-700">Designation</Label>
//                       <Input defaultValue="Sr.UI/UX Designer" className="mt-1" />
//                     </div>
//                   </div>

//                   {/* COLUMN 3: Social Media */}
//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-lg text-gray-900">Social Media</h3>
//                     {[
//                       { icon: Facebook, label: "Facebook Link", value: "https://www.facebook.net/beems", color: "text-blue-600" },
//                       { icon: Linkedin, label: "LinkedIn Link", value: "https://www.linkedin.net/beems", color: "text-blue-700" },
//                       { icon: Twitter, label: "Twitter Link", value: "https://www.twitter.net/beems", color: "text-sky-500" },
//                       { icon: Instagram, label: "Instagram Link", value: "https://www.instagram.net/beems", color: "text-pink-600" },
//                     ].map((item) => (
//                       <div key={item.label}>
//                         <Label className={`flex items-center gap-2 text-sm text-gray-700 ${item.color}`}>
//                           <item.icon className="w-4 h-4" /> {item.label}
//                         </Label>
//                         <Input defaultValue={item.value} className="mt-1" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* ===== PASSWORD & SECURITY TAB - 5 STEPS ===== */}
//               {activeTab === "Password & Security" && (
//                 <div className="space-y-8">
//                   {/* Step 1: Initial */}
//                   {passwordStep === "initial" && (
//                     <div className="max-w-md mx-auto text-center">
//                       <h3 className="text-lg font-bold text-gray-900 mb-4">
//                         If You Want Change Your Password Please Follow Below Steps
//                       </h3>
//                       <div className="space-y-3 text-left">
//                         {[
//                           "Step 1: Please Enter Your Register Mobile Number Or Email ID",
//                           "Step 2: Enter Your 4 Digit OTP Code",
//                           "Step 3: Enter Your New Password And Confirm Password",
//                           "Step 4: New Password Activated",
//                         ].map((step, i) => (
//                           <div key={i} className="flex items-center gap-3">
//                             <CheckCircle className="w-5 h-5 text-green-500" />
//                             <span className="text-sm text-gray-700">{step}</span>
//                           </div>
//                         ))}
//                       </div>
//                       <Button
//                         onClick={() => setPasswordStep("send-otp")}
//                         className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium"
//                       >
//                         Change Password
//                       </Button>
//                     </div>
//                   )}

//                   {/* Step 2: Send OTP */}
//                   {passwordStep === "send-otp" && (
//                     <div className="max-w-md mx-auto">
//                       <h3 className="text-lg font-bold text-center mb-6">Change Password</h3>
//                       <p className="text-sm text-gray-600 text-center mb-4">
//                         We have Sent to You One OTP To Email
//                       </p>
//                       <div className="flex justify-center mb-4">
//                         <div className="bg-gray-100 p-3 rounded-full">
//                           <Mail className="w-8 h-8 text-blue-600" />
//                         </div>
//                       </div>
//                       <Label className="text-sm text-gray-700">Email ID / Phone</Label>
//                       <Input
//                         placeholder="Enter your email or phone"
//                         value={emailOrPhone}
//                         onChange={(e) => setEmailOrPhone(e.target.value)}
//                         className="mt-1"
//                       />
//                       <Button
//                         onClick={handleSendOTP}
//                         disabled={!emailOrPhone}
//                         className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
//                       >
//                         Send OTP
//                       </Button>
//                       <button
//                         onClick={resetPasswordFlow}
//                         className="mt-2 text-xs text-blue-600 hover:underline w-full text-center"
//                       >
//                         If not get OTP Resend
//                       </button>
//                     </div>
//                   )}

//                   {/* Step 3: Enter OTP */}
//                   {passwordStep === "enter-otp" && (
//                     <div className="max-w-md mx-auto">
//                       <h3 className="text-lg font-bold text-center mb-6">Change Password</h3>
//                       <p className="text-sm text-gray-600 text-center mb-4">
//                         We have Sent to You One OTP To Email
//                       </p>
//                       <div className="flex justify-center mb-4">
//                         <div className="bg-gray-100 p-3 rounded-full">
//                           <Mail className="w-8 h-8 text-blue-600" />
//                         </div>
//                       </div>
//                       <p className="text-sm text-center text-gray-700 mb-4">
//                         5*****3@gmail.com
//                       </p>
//                       <div className="flex justify-center gap-2 mb-6">
//                         {[2, 5, 7, 6].map((digit, i) => (
//                           <div
//                             key={i}
//                             className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-medium text-gray-700"
//                           >
//                             {digit}
//                           </div>
//                         ))}
//                       </div>
//                       <Button
//                         onClick={handleVerifyOTP}
//                         className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
//                       >
//                         Confirm OTP
//                       </Button>
//                       <button
//                         onClick={resetPasswordFlow}
//                         className="mt-2 text-xs text-blue-600 hover:underline w-full text-center"
//                       >
//                         If not get OTP Resend
//                       </button>
//                     </div>
//                   )}

//                   {/* Step 4: New Password */}
//                   {passwordStep === "new-password" && (
//                     <div className="max-w-md mx-auto">
//                       <h3 className="text-lg font-bold text-center mb-6">Change Password</h3>
//                       <div className="space-y-4">
//                         <div>
//                           <Label className="text-sm text-gray-700">New Password</Label>
//                           <div className="relative">
//                             <Input
//                               type="password"
//                               value={newPassword}
//                               onChange={(e) => setNewPassword(e.target.value)}
//                               className="mt-1 pr-10"
//                               placeholder="••••••••"
//                             />
//                             <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                           </div>
//                         </div>
//                         <div>
//                           <Label className="text-sm text-gray-700">Confirm Password</Label>
//                           <div className="relative">
//                             <Input
//                               type="password"
//                               value={confirmPassword}
//                               onChange={(e) => setConfirmPassword(e.target.value)}
//                               className="mt-1 pr-10"
//                               placeholder="••••••••"
//                             />
//                             <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-6 space-y-2 text-xs text-gray-600">
//                         <p className="font-medium text-gray-800">Password Must Contain :</p>
//                         {[
//                           "Atleast 6 Characters",
//                           "Atleast One Uppercase (A-Z)",
//                           "Atleast One Lowercase (a-z)",
//                           "Atleast One Number",
//                         ].map((rule, i) => (
//                           <div key={i} className="flex items-center gap-2">
//                             <Check className="w-4 h-4 text-green-500" />
//                             <span>{rule}</span>
//                           </div>
//                         ))}
//                       </div>
//                       <Button
//                         onClick={handleChangePassword}
//                         disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
//                         className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
//                       >
//                         Change Password
//                       </Button>
//                     </div>
//                   )}

//                   {/* Step 5: Success */}
//                   {passwordStep === "success" && (
//                     <div className="max-w-md mx-auto text-center">
//                       <div className="mb-6">
//                         <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                         <h3 className="text-xl font-bold text-green-600">Your password successfully changed</h3>
//                         <p className="text-sm text-gray-600 mt-2">New Password Activated</p>
//                       </div>
//                       <div className="flex justify-center">
//                         <img src="/assets/success-illustration.png" alt="Success" className="w-32" />
//                       </div>
//                       <Button
//                         onClick={resetPasswordFlow}
//                         className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
//                       >
//                         Done
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* ===== NOTIFICATIONS TAB - Only 1 Notification ===== */}
//               {activeTab === "Notifications" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                     <Bell className="w-5 h-5 text-blue-600" />
//                     Notifications (1 New)
//                   </h3>
//                   {notifications.map((notif) => (
//                     <div
//                       key={notif.id}
//                       className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex gap-3"
//                     >
//                       <div className="flex-shrink-0">
//                         <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//                           <notif.icon className={`w-5 h-5 ${notif.color}`} />
//                         </div>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm text-gray-800 leading-relaxed">{notif.title}</p>
//                         <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
//                           <Clock className="w-3 h-3" />
//                           {notif.time}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Save Button (Only for My Account) */}
//               {activeTab === "My Account" && (
//                 <>
//                   <Separator className="my-8" />
//                   <div className="flex justify-end">
//                     <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
//                       Save Changes
//                     </Button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentProfileDashboard;



import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  Mail,
  Lock,
  Shield,
  Check,
  Bell,
  Clock,
} from "lucide-react";
import Header from "../Header";
 
type Tab = "My Account" | "Password & Security" | "Notifications";
type PasswordStep =
  | "initial"
  | "send-otp"
  | "enter-otp"
  | "new-password"
  | "success";
 
const StudentProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("My Account");
  const [passwordStep, setPasswordStep] = useState<PasswordStep>("initial");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  // Student data states (populated from /student/me)
  const [firstName, setFirstName] = useState("Mr. Beems");
  const [lastName, setLastName] = useState("Jok");
  const [email, setEmail] = useState("beems76@gmail.com");
  const [phone, setPhone] = useState("+04 1234 5678");
  const [dob, setDob] = useState("07/05/1987");
  const [role, setRole] = useState("Designer");
  const [address, setAddress] = useState<string | null>(null);
  const [aboutMe, setAboutMe] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    "/assets/profile-avatar.jpg"
  );
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
 
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
 
  const handleSendOTP = () => {
    if (emailOrPhone) setPasswordStep("enter-otp");
  };
 
  const handleVerifyOTP = () => {
    if (otp === "2576") setPasswordStep("new-password");
  };
 
  const handleChangePassword = () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setPasswordStep("success");
    }
  };
 
  const resetPasswordFlow = () => {
    setPasswordStep("initial");
    setEmailOrPhone("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };
 
  // Static Notifications - Only 1
  const notifications = [
    {
      id: 1,
      title:
        "Hello @OMG Employee it has been observed that many employees are not punching at the time of arrival as well as departure at the workplace. So, please do punch.",
      time: "Sep 15 • Just now",
      icon: Bell,
      color: "text-blue-600",
      badge: false, // No badge
    },
  ];
 
  // Build BASE_URL (same pattern used elsewhere)
  const BASE_URL =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_API_BASE_URL) ||
    "http://192.168.0.103:8000";
 
  // fetch /student/me on mount and populate fields
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      setProfileError(null);
 
      try {
        const token = localStorage.getItem("access_token");
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;
 
        const res = await fetch(`${BASE_URL}/student/me`, {
          method: "GET",
          headers,
        });
 
        if (res.status === 401) {
          // unauthorized — clear token and show message (do not redirect here)
          localStorage.removeItem("access_token");
          setProfileError("Unauthorized. Please login again.");
          setLoadingProfile(false);
          return;
        }
 
        if (!res.ok) {
          const txt = await res.text();
          setProfileError(`Failed to load profile: ${res.status} ${txt}`);
          setLoadingProfile(false);
          return;
        }
 
        const data = await res.json();
 
        // Example expected response:
        // {
        //   "name": "shailu",
        //   "email": "shailu@gmail.com",
        //   "id": 4,
        //   "role": "student",
        //   "phone": null,
        //   "address": null,
        //   "about_me": null,
        //   "profile_picture": null,
        //   "resume_url": null
        // }
 
        // Map name -> first/last (best-effort split)
        if (data?.name && typeof data.name === "string") {
          const parts = data.name.trim().split(" ");
          setFirstName(parts[0] || "");
          setLastName(parts.slice(1).join(" ") || "");
        }
 
        if (data?.email) setEmail(data.email);
        if (data?.phone) setPhone(data.phone);
        if (data?.address) setAddress(data.address);
        if (data?.about_me) setAboutMe(data.about_me);
        if (data?.profile_picture) setProfilePicture(data.profile_picture);
        if (data?.resume_url) setResumeUrl(data.resume_url);
        if (data?.role) setRole(data.role);
 
        setLoadingProfile(false);
      } catch (err: any) {
        console.error("Failed to fetch student profile:", err);
        setProfileError("Network error while loading profile.");
        setLoadingProfile(false);
      }
    };
 
    fetchProfile();
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <>
      <Header />
      <div className="relative max-w-[1400px] mx-auto p-4 md:p-6 font-sans">
        {/* ===== 1. TOP DIV: Gradient Banner ===== */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl h-36 md:h-44">
          <h1 className="text-xl md:text-2xl font-bold">Profile Edit</h1>
          <p className="text-sm opacity-90 mt-1">Get a chance to change your profile.</p>
        </div>
 
        {/* ===== 2. MAIN CONTENT: Left Card + Right Form ===== */}
        <div className="relative z-10 mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ===== LEFT DIV: Profile Card ===== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative mx-auto w-fit">
                <Avatar className="w-24 h-24 ring-4 ring-blue-100">
                  {/* Use profilePicture if available, otherwise fallback */}
                  {profilePicture ? (
                    // if the backend returns a full URL, AvatarImage will load it
                    <AvatarImage src={profilePicture} alt={firstName} />
                  ) : (
                    <AvatarImage src="/assets/profile-avatar.jpg" alt={firstName} />
                  )}
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {(firstName?.[0] || "M") + (lastName?.[0] || "B")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 bg-gray-200 text-gray-600 text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  @
                </div>
              </div>
 
              <div className="text-center mt-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {/* show full name */}
                  {`${firstName || ""}${lastName ? " " + lastName : ""}`.trim() || "No Name"}
                </h2>
                <p className="text-sm text-gray-600">{role || "Student"}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {aboutMe ||
                    "Lorem ipsum dolor sit amet consectetur. Pulvinar Donec Quam Tortor sit sit, Nulla Feugiat Senectus in Consectetur."}
                </p>
              </div>
 
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Web Design</Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Graphic Design</Badge>
                </div>
              </div>
 
              <p className="text-xs text-gray-500 text-center mt-6">
                MEMBER SINCE DECEMBER 12, 2020
              </p>
            </div>
          </div>
 
          {/* ===== RIGHT DIV: Form Card ===== */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Tabs */}
              <div className="flex gap-8 border-b border-gray-200 mb-6">
                {["My Account", "Password & Security", "Notifications"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab as Tab);
                      if (tab !== "Password & Security") resetPasswordFlow();
                    }}
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
 
              {/* ===== MY ACCOUNT TAB ===== */}
              {activeTab === "My Account" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* COLUMN 1: My Profile */}
                  <div className="space-y-5">
                    <h3 className="font-semibold text-lg text-gray-900">My Profile</h3>
                    <div>
                      <Label className="text-sm text-gray-700">First Name</Label>
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Phone Number</Label>
                      <Input value={phone || ""} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Date of Birth</Label>
                      <Input value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Role</Label>
                      <Input value={role || ""} onChange={(e) => setRole(e.target.value)} className="mt-1" />
                    </div>
                  </div>
 
                  {/* COLUMN 2: Job */}
                  <div className="space-y-5">
                    <h3 className="font-semibold text-lg text-gray-900">Job</h3>
                    <div>
                      <Label className="text-sm text-gray-700">Last Name</Label>
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Email</Label>
                      <Input value={email || ""} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Gender</Label>
                      <div className="flex gap-4 mt-2 flex-wrap">
                        {["Male", "Female", "Other (Not to Say)"].map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              defaultChecked={opt === "Male"}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Designation</Label>
                      <Input defaultValue="Sr.UI/UX Designer" className="mt-1" />
                    </div>
                  </div>
 
                  {/* COLUMN 3: Social Media */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900">Social Media</h3>
                    {[
                      { icon: Facebook, label: "Facebook Link", value: "https://www.facebook.net/beems", color: "text-blue-600" },
                      { icon: Linkedin, label: "LinkedIn Link", value: "https://www.linkedin.net/beems", color: "text-blue-700" },
                      { icon: Twitter, label: "Twitter Link", value: "https://www.twitter.net/beems", color: "text-sky-500" },
                      { icon: Instagram, label: "Instagram Link", value: "https://www.instagram.net/beems", color: "text-pink-600" },
                    ].map((item) => (
                      <div key={item.label}>
                        <Label className={`flex items-center gap-2 text-sm text-gray-700 ${item.color}`}>
                          <item.icon className="w-4 h-4" /> {item.label}
                        </Label>
                        <Input defaultValue={item.value} className="mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
 
              {/* ===== PASSWORD & SECURITY TAB - 5 STEPS ===== */}
              {activeTab === "Password & Security" && (
                <div className="space-y-8">
                  {/* Step 1: Initial */}
                  {passwordStep === "initial" && (
                    <div className="max-w-md mx-auto text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        If You Want Change Your Password Please Follow Below Steps
                      </h3>
                      <div className="space-y-3 text-left">
                        {[
                          "Step 1: Please Enter Your Register Mobile Number Or Email ID",
                          "Step 2: Enter Your 4 Digit OTP Code",
                          "Step 3: Enter Your New Password And Confirm Password",
                          "Step 4: New Password Activated",
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() => setPasswordStep("send-otp")}
                        className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium"
                      >
                        Change Password
                      </Button>
                    </div>
                  )}
 
                  {/* Step 2: Send OTP */}
                  {passwordStep === "send-otp" && (
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg font-bold text-center mb-6">Change Password</h3>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        We have Sent to You One OTP To Email
                      </p>
                      <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <Label className="text-sm text-gray-700">Email ID / Phone</Label>
                      <Input
                        placeholder="Enter your email or phone"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        className="mt-1"
                      />
                      <Button
                        onClick={handleSendOTP}
                        disabled={!emailOrPhone}
                        className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
                      >
                        Send OTP
                      </Button>
                      <button
                        onClick={resetPasswordFlow}
                        className="mt-2 text-xs text-blue-600 hover:underline w-full text-center"
                      >
                        If not get OTP Resend
                      </button>
                    </div>
                  )}
 
                  {/* Step 3: Enter OTP */}
                  {passwordStep === "enter-otp" && (
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg font-bold text-center mb-6">Change Password</h3>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        We have Sent to You One OTP To Email
                      </p>
                      <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-sm text-center text-gray-700 mb-4">
                        5*****3@gmail.com
                      </p>
                      <div className="flex justify-center gap-2 mb-6">
                        {[2, 5, 7, 6].map((digit, i) => (
                          <div
                            key={i}
                            className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-medium text-gray-700"
                          >
                            {digit}
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={handleVerifyOTP}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
                      >
                        Confirm OTP
                      </Button>
                      <button
                        onClick={resetPasswordFlow}
                        className="mt-2 text-xs text-blue-600 hover:underline w-full text-center"
                      >
                        If not get OTP Resend
                      </button>
                    </div>
                  )}
 
                  {/* Step 4: New Password */}
                  {passwordStep === "new-password" && (
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg font-bold text-center mb-6">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm text-gray-700">New Password</Label>
                          <div className="relative">
                            <Input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="mt-1 pr-10"
                              placeholder="••••••••"
                            />
                            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">Confirm Password</Label>
                          <div className="relative">
                            <Input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="mt-1 pr-10"
                              placeholder="••••••••"
                            />
                            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2 text-xs text-gray-600">
                        <p className="font-medium text-gray-800">Password Must Contain :</p>
                        {[
                          "Atleast 6 Characters",
                          "Atleast One Uppercase (A-Z)",
                          "Atleast One Lowercase (a-z)",
                          "Atleast One Number",
                        ].map((rule, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={handleChangePassword}
                        disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                        className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
                      >
                        Change Password
                      </Button>
                    </div>
                  )}
 
                  {/* Step 5: Success */}
                  {passwordStep === "success" && (
                    <div className="max-w-md mx-auto text-center">
                      <div className="mb-6">
                        <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-green-600">Your password successfully changed</h3>
                        <p className="text-sm text-gray-600 mt-2">New Password Activated</p>
                      </div>
                      <div className="flex justify-center">
                        <img src="/assets/success-illustration.png" alt="Success" className="w-32" />
                      </div>
                      <Button
                        onClick={resetPasswordFlow}
                        className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
                      >
                        Done
                      </Button>
                    </div>
                  )}
                </div>
              )}
 
              {/* ===== NOTIFICATIONS TAB - Only 1 Notification ===== */}
              {activeTab === "Notifications" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Notifications (1 New)
                  </h3>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex gap-3"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <notif.icon className={`w-5 h-5 ${notif.color}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 leading-relaxed">{notif.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
 
              {/* Save Button (Only for My Account) */}
              {activeTab === "My Account" && (
                <>
                  <Separator className="my-8" />
                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
                      Save Changes
                    </Button>
                  </div>
                </>
              )}
 
              {/* Small status/info area */}
              <div className="mt-4 text-xs text-gray-500">
                {loadingProfile ? (
                  <div>Loading profile…</div>
                ) : profileError ? (
                  <div className="text-red-500">Profile: {profileError}</div>
                ) : (
                  <div>Profile loaded</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default StudentProfileDashboard;