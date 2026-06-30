import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import logo from "@/assets/techlogo.png";
import mainImage from "@/assets/userside.png";
import guestApi from "@/api/guestApi";

const technicalSkills = ["Java", "Python", "React", "Node.js", "SQL", "HTML/CSS", "Cloud+Devops", "UI/UX"];
const nonTechnicalSkills = ["Communication", "Management", "Marketing", "Sales", "Design"];
const qualifications = ["High School", "Diploma", "B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "M.Tech", "M.Sc", "MCA", "MBA", "Ph.D", "Other"];
const educationalStatuses = ["Current Year", "Passed Out"];

export default function RegistrationDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void; }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", country: "", state: "", city: "",
    educational_status: "", qualification: "", passedout_year: "",
    interest: "", password: "", confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [category, setCategory] = useState<"technical" | "nonTechnical" | "">("");

  const fullPhone = `+91${phone}`;
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [open, otpVerified]);

  useEffect(() => {
    if (!open) {
      setPhone("");
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setOtpLoading(false);
      setForm({
        name: "", email: "", country: "", state: "", city: "",
        educational_status: "", qualification: "", passedout_year: "",
        interest: "", password: "", confirmPassword: ""
      });
      setCategory("");
      setError("");
      setSuccess("");
      setLoading(false);
      setTimeout(() => {
        (document.activeElement as HTMLElement)?.blur();
      }, 0);
    }
  }, [open]);

  const sendOtp = async () => {
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setOtpLoading(true);
    setError("");
    setSuccess("");

    try {
      await guestApi.sendOtp({ phone: fullPhone, purpose: "register" });
      setOtpSent(true);
      setSuccess("OTP sent successfully to +91 " + phone);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Failed to send OTP";
      setError(msg.includes("recently") ? "Too many attempts. Try again later." : msg);
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    setError("");
    setSuccess("");

    try {
      await guestApi.verifyOtp({ phone: fullPhone, otp_code: otp, purpose: "register" });
      setOtpVerified(true);
      setSuccess("Phone number verified successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid or expired OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const maskPhone = (num: string) => {
    if (num.length < 4) return `+91-${num}`;
    return `+91-${num.slice(0, 2)}****${num.slice(-4)}`;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 3 || form.name.trim().length > 30) {
      setError("Full name must be between 3 and 30 characters");
      return;
    }
    if (form.country.trim().length < 2 || form.country.trim().length > 30) {
      setError("Country must be between 2 and 30 characters");
      return;
    }
    if (form.state.trim().length < 3 || form.state.trim().length > 30) {
      setError("State must be between 3 and 30 characters");
      return;
    }
    if (form.city.trim().length < 3 || form.city.trim().length > 30) {
      setError("City must be between 3 and 30 characters");
      return;
    }
    if (form.email.length > 50 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (form.password.length < 8 || form.password.length > 30) {
      setError("Password must be between 8 and 30 characters");
      return;
    }
    if (!/(?=.*[a-z])/.test(form.password) || 
        !/(?=.*[A-Z])/.test(form.password) || 
        !/(?=.*\d)/.test(form.password) || 
        !/(?=.*[^a-zA-Z\d\s])/.test(form.password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: fullPhone,
      country: form.country.trim(),
      state: form.state.trim(),
      city: form.city.trim(),
      educational_status: form.educational_status,
      qualification: form.qualification,
      passedout_year: form.passedout_year,
      interest: form.interest,
      password: form.password,
    };

    try {
      await guestApi.register(payload);
      setSuccess("Account created successfully! Welcome to Lauratek");
      setTimeout(() => setOpen(false), 2500);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!p-0 !m-0 !left-0 !top-0 !translate-x-0 !translate-y-0 !max-w-none !w-screen !h-screen !max-h-screen !rounded-none sm:!rounded-none !border-none !shadow-none overflow-hidden bg-white [&>button]:hidden">
        <div className="flex w-full h-full">
          {/* LEFT SIDE - Image on top + Purple gradient welcome section below */}
          <div className="w-1/2 hidden md:flex flex-col">
            <div className="h-[55%] w-full overflow-hidden">
              <img src={mainImage} alt="Students learning" className="w-full h-full object-cover" />
            </div>
            <div className="h-[45%] w-full bg-gradient-to-br from-blue-600 via-purple-600 to-purple-500 flex items-center justify-center p-8">
              <div className="border-l-4 border-white pl-6 py-2">
                <h2 className="text-white text-3xl font-semibold mb-3">Welcome To <span className="font-normal">Lauratek</span></h2>
                <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                  A powerful platform designed to streamline learning, assessments, and student success with a modern, centralized experience.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="w-full md:w-1/2 bg-white flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-6 pb-4">
              <img src={logo} alt="LAURATEK" className="h-8" />
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all">
                Back
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex items-center justify-center px-10 pb-8">
              <div className="w-full max-w-sm">
                {!otpVerified ? (
                  <div className="space-y-5">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Verify your Mobile Number</h1>
                      <p className="text-gray-500 text-sm">We need to verify your phone for security</p>
                    </div>

                    <div className="space-y-4">
                      {/* Phone Input - always visible, disabled after OTP sent */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <span className="px-4 py-2.5 bg-gray-50 text-sm font-semibold text-gray-900 border-r border-gray-300">+91</span>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => !otpSent && setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="Enter your Mobile number"
                          disabled={otpSent}
                          className="flex-1 h-11 text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>

                      {/* Send OTP Button - hidden after OTP sent */}
                      {!otpSent && (
                        <>
                          {error && <p className="text-red-500 text-xs">{error}</p>}
                          <Button onClick={sendOtp} disabled={otpLoading || phone.length !== 10} className="w-full h-11 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                            {otpLoading ? "Sending..." : "Send OTP"}
                          </Button>
                        </>
                      )}

                      {/* OTP Verification Card - shown after OTP sent */}
                      {otpSent && (
                        <div className="border border-purple-400 rounded-lg p-4 bg-white">
                          <p className="text-xs text-gray-600 mb-3">
                            <span className="font-semibold text-gray-900">Mobile Verification</span>
                            <span className="text-gray-500"> (An OTP has been sent to the {maskPhone(phone)})</span>
                          </p>

                          <div className="space-y-3">
                            <Input
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              className="h-10 text-sm text-center tracking-[0.2em] border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                            />

                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Time left <span className="text-purple-600 font-medium">3.00 min</span></span>
                              <button type="button" onClick={sendOtp} disabled={otpLoading} className="text-purple-600 hover:text-purple-700 font-medium disabled:text-gray-400 disabled:no-underline">
                                Resend OTP
                              </button>
                            </div>

                            {error && <p className="text-red-500 text-xs">{error}</p>}
                            {success && <p className="text-green-500 text-xs">{success}</p>}

                            <Button onClick={verifyOtp} disabled={otpLoading || otp.length !== 6} className="w-full h-10 text-xs font-medium border border-purple-400 bg-white text-purple-600 hover:bg-purple-50 rounded-md transition-all">
                              {otpLoading ? "Verifying..." : "Verify OTP"}
                            </Button>
                          </div>
                        </div>
                      )}

                      <p className="text-center text-xs text-gray-600 pt-2">
                        Already have an account? <button type="button" onClick={() => setOpen(false)} className="font-semibold text-blue-600 hover:underline">Login</button>
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Registration Form */
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-center text-sm font-medium">
                      Verified: {fullPhone}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Full Name <span className="text-red-500">*</span></Label>
                        <Input required value={form.name} maxLength={30} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Enter your full name" className="h-10 text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs">Email Address <span className="text-red-500">*</span></Label>
                        <Input required type="email" value={form.email} maxLength={50} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="Enter your email" className="h-10 text-sm" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Country <span className="text-red-500">*</span></Label>
                      <Input required value={form.country} maxLength={30} onChange={(e) => setForm(p => ({ ...p, country: e.target.value }))} placeholder="Enter your country" className="h-10 text-sm" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">State <span className="text-red-500">*</span></Label>
                        <Input required value={form.state} maxLength={30} onChange={(e) => setForm(p => ({ ...p, state: e.target.value }))} placeholder="Enter your state" className="h-10 text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs">City <span className="text-red-500">*</span></Label>
                        <Input required value={form.city} maxLength={30} onChange={(e) => setForm(p => ({ ...p, city: e.target.value }))} placeholder="Enter your city" className="h-10 text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Educational Status</Label>
                        <Select onValueChange={v => setForm(p => ({ ...p, educational_status: v }))}>
                          <SelectTrigger className="h-10 text-sm"><SelectValue placeholder="Select status" /></SelectTrigger>
                          <SelectContent>{educationalStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Qualification</Label>
                        <Select onValueChange={v => setForm(p => ({ ...p, qualification: v }))}>
                          <SelectTrigger className="h-10 text-sm"><SelectValue placeholder="Select qualification" /></SelectTrigger>
                          <SelectContent>{qualifications.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Passed Out Year</Label>
                      <Input value={form.passedout_year} onChange={e => setForm(p => ({ ...p, passedout_year: e.target.value.replace(/\D/g, "").slice(0, 4) }))} placeholder="Enter year" maxLength={4} className="h-10 text-sm" />
                    </div>

                    <div>
                      <Label className="text-xs">Category</Label>
                      <Select onValueChange={(v: "technical" | "nonTechnical") => setCategory(v)}>
                        <SelectTrigger className="h-10 text-sm"><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="nonTechnical">Non-Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {category && (
                      <div>
                        <Label className="text-xs">Primary Skill / Interest</Label>
                        <Select onValueChange={v => setForm(p => ({ ...p, interest: v }))}>
                          <SelectTrigger className="h-10 text-sm"><SelectValue placeholder="Choose interest" /></SelectTrigger>
                          <SelectContent>
                            {(category === "technical" ? technicalSkills : nonTechnicalSkills).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Password <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Input required maxLength={30} type={showPassword ? "text" : "password"} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" className="h-10 text-sm pr-10" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Confirm Password <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Input required maxLength={30} type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••" className="h-10 text-sm pr-10" />
                          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {success && <p className="text-green-500 text-xs">{success}</p>}

                    <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all">
                      {loading ? "Creating..." : "Complete Registration"}
                    </Button>

                    <p className="text-center text-xs text-gray-600">
                      Already have an account? <button type="button" onClick={() => setOpen(false)} className="font-semibold text-blue-600 hover:underline">Login</button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
