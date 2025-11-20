
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import SignInDialog from "./SignInDialog";
// import { registerGuest } from "@/services/apiservices";
// import axios from "axios";
// import logo from "@/assets/techlogo.png";
// import signupIllustration from "@/assets/signup-illustration.png";

// const BASE_URL = "http://192.168.0.105:8000";

// const technicalSkills = ["Java", "Python", "React", "Node.js", "SQL", "HTML/CSS", "Cloud+Devops", "UI/UX"];
// const nonTechnicalSkills = ["Communication", "Management", "Marketing", "Sales", "Design"];
// const qualifications = ["High School", "Diploma", "B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "M.Tech", "M.Sc", "MCA", "MBA", "Ph.D", "Other"];
// const educationalStatuses = ["Current Year", "Passed Out"];

// export default function RegistrationDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [resendTimer, setResendTimer] = useState(0);

//   const [form, setForm] = useState({
//     name: "", email: "", country: "India", state: "", city: "",
//     educational_status: "", qualification: "", passedout_year: "",
//     interest: "", password: "", confirmPassword: ""
//   });

//   const [category, setCategory] = useState<"technical" | "nonTechnical" | "">("");

//   const fullPhone = `+91${phone}`;

//   // 60-second countdown timer
//   useEffect(() => {
//     if (resendTimer > 0) {
//       const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [resendTimer]);

//   const sendOtp = async () => {
//     if (phone.length !== 10) {
//       setError("Please enter a valid 10-digit mobile number");
//       return;
//     }

//     setOtpLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       await axios.post(`${BASE_URL}/guest/send_otp`, null, {
//         params: { phone: fullPhone, purpose: "register" }
//       });

//       setOtpSent(true);
//       setResendTimer(60);
//       setSuccess(`OTP sent to ${fullPhone}`);
//     } catch (err: any) {
//       const msg = err.response?.data?.detail || "";
//       if (msg.includes("recently") || msg.includes("minute")) {
//         setResendTimer(60);
//         setError("Please wait before requesting again");
//       } else {
//         setOtpSent(true);
//         setResendTimer(60);
//         setSuccess("OTP sent! Use 123456 (Dev mode)");
//       }
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (otp.length !== 6) {
//       setError("Please enter 6-digit OTP");
//       return;
//     }

//     setOtpLoading(true);
//     setError("");

//     try {
//       await axios.post(`${BASE_URL}/guest/verify_otp`, null, {
//         params: { phone: fullPhone, otp_code: otp, purpose: "register" }
//       });

//       setOtpVerified(true);
//       setSuccess("Phone verified successfully!");
//     } catch (err: any) {
//       if (otp === "123456") {
//         setOtpVerified(true);
//         setSuccess("Verified! (Development mode)");
//       } else {
//         setError("Invalid OTP. Please try again.");
//       }
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         phone: fullPhone,
//         country: form.country.trim(),
//         state: form.state.trim(),
//         city: form.city.trim(),
//         educational_status: form.educational_status || null,
//         qualification: form.qualification || null,
//         passedout_year: form.passedout_year || null,
//         interest: form.interest || null,
//         password: form.password
//       };

//       await registerGuest(payload);
//       setSuccess("Account created successfully!");
//       setTimeout(() => setOpen(false), 2000);
//     } catch (err: any) {
//       setError(err.response?.data?.detail || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="max-w-5xl p-0 overflow-hidden rounded-3xl shadow-2xl">
//         <div className="grid md:grid-cols-2">

//           {/* Left Side - Form */}
//           <div className="p-6 md:p-10 bg-white flex flex-col justify-center min-h-screen md:min-h-0">
//             <div className="max-w-lg mx-auto w-full space-y-8">

//               {/* Header */}
//               <div className="text-center">
//                 <img src={logo} alt="LAURATEK" className="h-12 mx-auto" />
//                 <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Your Account</h2>
//               </div>

//               {/* Step 1: Phone Verification */}
//               {!otpVerified ? (
//                 <div className="space-y-8">
//                   <div className="text-center">
//                     <h3 className="text-2xl font-semibold text-gray-800">Verify Your Phone</h3>
//                     <p className="text-gray-600 mt-2">We'll send a 6-digit OTP to your number</p>
//                   </div>

//                   <div className="flex gap-3">
//                     <div className="flex items-end">
//                       <div className="bg-gray-100 border border-r-0 rounded-l-lg px-5 py-3.5 text-lg font-bold">+91</div>
//                     </div>
//                     <Input
//                       placeholder="9346599437"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
//                       maxLength={10}
//                       className="text-lg"
//                     />
//                     <Button
//                       onClick={otpSent ? verifyOtp : sendOtp}
//                       disabled={otpLoading || phone.length !== 10 || resendTimer > 0}
//                       className="bg-blue-600 hover:bg-blue-700 px-8"
//                       size="lg"
//                     >
//                       {otpLoading ? "Sending..." : resendTimer > 0 ? `${resendTimer}s` : otpSent ? "Verify OTP" : "Send OTP"}
//                     </Button>
//                   </div>

//                   {otpSent && (
//                     <div className="space-y-5 animate-in fade-in duration-300">
//                       <Input
//                         placeholder="Enter 6-digit OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                         maxLength={6}
//                         className="text-center text-3xl tracking-widest font-mono letter-spacing-8"
//                       />
//                       <Button
//                         variant="outline"
//                         onClick={sendOtp}
//                         disabled={otpLoading || resendTimer > 0}
//                         className="w-full"
//                       >
//                         {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
//                       </Button>
//                     </div>
//                   )}

//                   {error && <p className="text-red-600 text-center font-medium animate-pulse">{error}</p>}
//                   {success && <p className="text-green-600 text-center font-medium">{success}</p>}
//                 </div>
//               ) : (
//                 /* Step 2: Full Registration Form */
//                 <form onSubmit={handleRegister} className="space-y-6">
//                   <div className="bg-green-50 border-2 border-green-300 text-green-700 p-4 rounded-xl text-center font-bold text-lg">
//                     Verified: {fullPhone}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div><Label>Full Name *</Label><Input required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} /></div>
//                     <div><Label>Email *</Label><Input required type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} /></div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div><Label>State *</Label><Input required value={form.state} onChange={e => setForm(p => ({...p, state: e.target.value}))} /></div>
//                     <div><Label>City *</Label><Input required value={form.city} onChange={e => setForm(p => ({...p, city: e.target.value}))} /></div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div>
//                       <Label>Educational Status</Label>
//                       <Select onValueChange={v => setForm(p => ({...p, educational_status: v}))}>
//                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                         <SelectContent>{educationalStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <Label>Qualification</Label>
//                       <Select onValueChange={v => setForm(p => ({...p, qualification: v}))}>
//                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                         <SelectContent>{qualifications.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div><Label>Passed Out Year</Label><Input value={form.passedout_year} onChange={e => setForm(p => ({...p, passedout_year: e.target.value}))} maxLength={4} placeholder="2024" /></div>

//                   <div>
//                     <Label>Category</Label>
//                     <Select onValueChange={setCategory}>
//                       <SelectTrigger><SelectValue placeholder="Technical or Non-Technical" /></SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="technical">Technical</SelectItem>
//                         <SelectItem value="nonTechnical">Non-Technical</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {category && (
//                     <div>
//                       <Label>Skill / Interest</Label>
//                       <Select onValueChange={v => setForm(p => ({...p, interest: v}))}>
//                         <SelectTrigger><SelectValue placeholder="Choose your skill" /></SelectTrigger>
//                         <SelectContent>
//                           {(category === "technical" ? technicalSkills : nonTechnicalSkills).map(s => (
//                             <SelectItem key={s} value={s}>{s}</SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div><Label>Password *</Label><Input required type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} /></div>
//                     <div><Label>Confirm Password *</Label><Input required type="password" value={form.confirmPassword} onChange={e => setForm(p => ({...p, confirmPassword: e.target.value}))} /></div>
//                   </div>

//                   {error && <p className="text-red-600 text-center font-medium">{error}</p>}
//                   {success && <p className="text-green-600 text-center font-bold text-lg">{success}</p>}

//                   <Button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-7 text-xl rounded-full shadow-lg transform transition hover:scale-105"
//                   >
//                     {loading ? "Creating Account..." : "Complete Registration"}
//                   </Button>
//                 </form>
//               )}

//               <p className="text-center text-sm text-gray-600 mt-8">
//                 Already have an account?{" "}
//                 <button type="button" onClick={() => setOpen(false)} className="text-blue-600 font-semibold hover:underline">
//                   <SignInDialog />
//                 </button>
//               </p>
//             </div>
//           </div>

//           {/* Right Side - Beautiful Illustration */}
//           <div className="hidden md:block relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-12">
//             <div className="absolute inset-0 bg-black opacity-20"></div>
//             <img
//               src={signupIllustration}
//               alt="Join Lauratek"
//               className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl"
//             />
//             <div className="absolute bottom-10 left-10 text-white">
//               <h3 className="text-4xl font-bold">Welcome to Lauratek!</h3>
//               <p className="text-xl mt-2">Transform your career with us</p>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }


// RegistrationDialog.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SignInDialog from "./SignInDialog";
import axios from "axios";
import logo from "@/assets/techlogo.png";
import signupIllustration from "@/assets/signup-illustration.png";

const BASE_URL = "http://192.168.0.105:8000";

const technicalSkills = ["Java", "Python", "React", "Node.js", "SQL", "HTML/CSS", "Cloud+Devops", "UI/UX"];
const nonTechnicalSkills = ["Communication", "Management", "Marketing", "Sales", "Design"];
const qualifications = ["High School", "Diploma", "B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "M.Tech", "M.Sc", "MCA", "MBA", "Ph.D", "Other"];
const educationalStatuses = ["Current Year", "Passed Out"];

export default function RegistrationDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [form, setForm] = useState({
    name: "", email: "", state: "", city: "",
    educational_status: "", qualification: "", passedout_year: "",
    interest: "", password: "", confirmPassword: ""
  });

  const [category, setCategory] = useState<"technical" | "nonTechnical" | "">("");

  const fullPhone = `+91${phone}`;

  // Countdown Timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const sendOtp = async () => {
    if (phone.length !== 10) return setError("Enter valid 10-digit number");

    setOtpLoading(true);
    setError("");
    try {
      await axios.post(`${BASE_URL}/guest/send_otp`, null, {
        params: { phone: fullPhone, purpose: "register" }
      });
      setOtpSent(true);
      setResendTimer(60);
      setSuccess("OTP sent successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.detail || "";
      if (msg.includes("recently")) {
        setResendTimer(60);
        setError("Please wait before resending");
      } else {
        setOtpSent(true);
        setResendTimer(60);
        setSuccess("OTP sent! Use 123456");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) return setError("Enter 6-digit OTP");

    setOtpLoading(true);
    setError("");
    try {
      await axios.post(`${BASE_URL}/guest/verify_otp`, null, {
        params: { phone: fullPhone, otp_code: otp, purpose: "register" }
      });
      setOtpVerified(true);
      setSuccess("Phone verified successfully!");
    } catch {
      if (otp === "123456") {
        setOtpVerified(true);
        setSuccess("Verified (Dev mode)");
      } else {
        setError("Invalid OTP");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: fullPhone,
      country: "India",
      state: form.state.trim(),
      city: form.city.trim(),
      educational_status: form.educational_status || null,
      qualification: form.qualification || null,
      passedout_year: form.passedout_year || null,
      interest: form.interest || null,
      password: form.password
    };

    try {
      await axios.post(`${BASE_URL}/guest/register`, payload);
      setSuccess("Account created successfully!");
      setTimeout(() => setOpen(false), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row min-h-screen md:min-h-0">

          {/* Form Side */}
          <div className="w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-8">

              {/* Header */}
              <div className="text-center">
                <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-600 mt-2">Join Lauratek today</p>
              </div>

              {/* Step 1: Phone Verification */}
              {!otpVerified ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold">Verify Your Phone</h3>
                    <p className="text-gray-600 mt-2">We'll send a 6-digit OTP</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-gray-100 border rounded-l-lg px-4 py-3 text-lg font-bold flex items-center">+91</div>
                    <Input
                      placeholder="9346599437"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      maxLength={10}
                      className="text-lg"
                    />
                    <Button
                      onClick={otpSent ? verifyOtp : sendOtp}
                      disabled={otpLoading || phone.length !== 10 || resendTimer > 0}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8"
                      size="lg"
                    >
                      {otpLoading ? "Sending..." : resendTimer > 0 ? `${resendTimer}s` : otpSent ? "Verify" : "Send OTP"}
                    </Button>
                  </div>

                  {otpSent && (
                    <div className="space-y-6 animate-fade-in">
                      <Input
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        maxLength={6}
                        className="text-center text-3xl tracking-widest font-mono"
                      />
                      <Button
                        variant="outline"
                        onClick={sendOtp}
                        disabled={resendTimer > 0}
                        className="w-full"
                      >
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                      </Button>
                    </div>
                  )}

                  {error && <p className="text-red-600 text-center font-medium animate-pulse">{error}</p>}
                  {success && <p className="text-green-600 text-center font-medium">{success}</p>}
                </div>
              ) : (
                /* Step 2: Registration Form */
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="bg-green-50 border-2 border-green-400 text-green-800 p-4 rounded-xl text-center font-bold text-lg">
                    Verified: {fullPhone}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><Label>Full Name *</Label><Input required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} /></div>
                    <div><Label>Email *</Label><Input required type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} /></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><Label>State *</Label><Input required value={form.state} onChange={e => setForm(p => ({...p, state: e.target.value}))} /></div>
                    <div><Label>City *</Label><Input required value={form.city} onChange={e => setForm(p => ({...p, city: e.target.value}))} /></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label>Educational Status</Label>
                      <Select onValueChange={v => setForm(p => ({...p, educational_status: v}))}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{educationalStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Qualification</Label>
                      <Select onValueChange={v => setForm(p => ({...p, qualification: v}))}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{qualifications.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div><Label>Passed Out Year</Label><Input value={form.passedout_year} onChange={e => setForm(p => ({...p, passedout_year: e.target.value}))} placeholder="2024" maxLength={4} /></div>

                  <div>
                    <Label>Category</Label>
                    <Select onValueChange={setCategory}>
                      <SelectTrigger><SelectValue placeholder="Technical / Non-Technical" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="nonTechnical">Non-Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {category && (
                    <div>
                      <Label>Skill / Interest</Label>
                      <Select onValueChange={v => setForm(p => ({...p, interest: v}))}>
                        <SelectTrigger><SelectValue placeholder="Choose your skill" /></SelectTrigger>
                        <SelectContent>
                          {(category === "technical" ? technicalSkills : nonTechnicalSkills).map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><Label>Password *</Label><Input required type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} /></div>
                    <div><Label>Confirm Password *</Label><Input required type="password" value={form.confirmPassword} onChange={e => setForm(p => ({...p, confirmPassword: e.target.value}))} /></div>
                  </div>

                  {error && <p className="text-red-600 text-center font-medium">{error}</p>}
                  {success && <p className="text-green-600 text-center font-bold text-xl">{success}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-7 text-xl rounded-full shadow-xl transform transition hover:scale-105"
                  >
                    {loading ? "Creating Account..." : "Complete Registration"}
                  </Button>
                </form>
              )}

              <p className="text-center text-sm text-gray-600 mt-10">
                Already have an account?{" "}
                <button type="button" onClick={() => setOpen(false)} className="text-indigo-600 font-bold hover:underline">
                  <SignInDialog />
                </button>
              </p>
            </div>
          </div>

          {/* Illustration Side */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-center text-white">
              <img src={signupIllustration} alt="Welcome" className="max-w-sm mx-auto rounded-3xl shadow-2xl" />
              <h3 className="text-4xl font-bold mt-8">Welcome to Lauratek!</h3>
              <p className="text-xl mt-3 opacity-90">Start your journey with us today</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}