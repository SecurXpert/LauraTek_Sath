import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import guestApi from "@/api/guestApi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const technicalSkills = ["Java", "Python", "React", "Node.js", "SQL", "HTML/CSS", "Cloud+Devops", "UI/UX"];
const nonTechnicalSkills = ["Communication", "Management", "Marketing", "Sales", "Design"];
const qualifications = ["High School", "Diploma", "B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "M.Tech", "M.Sc", "MCA", "MBA", "Ph.D", "Other"];
const educationalStatuses = ["Current Year", "Passed Out"];

interface SignupFormProps {
  onBackToLogin: () => void;
}

export default function SignupForm({ onBackToLogin }: SignupFormProps) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(180);
  const [maskedMobile, setMaskedMobile] = useState("");
  
  const [form, setForm] = useState({
    name: "", email: "", state: "", city: "",
    educational_status: "", qualification: "", passedout_year: "",
    interest: "", password: "", confirmPassword: ""
  });
  const [category, setCategory] = useState<"technical" | "nonTechnical" | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}.${secs.toString().padStart(2, "0")} min`;
  };

  const maskMobileNumber = (number: string) => {
    if (number.length < 4) return number;
    return `+91-${number.slice(0, 2)}****${number.slice(-4)}`;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) {
      setError("Please enter a valid mobile number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await guestApi.sendOtp({ phone: `+91${mobile}`, purpose: "register" });
      setOtpSent(true);
      setTimer(180);
      setMaskedMobile(maskMobileNumber(mobile));
      setSuccess("OTP sent successfully");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
 
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await guestApi.verifyOtp({ phone: `+91${mobile}`, otp_code: otp, purpose: "register" });
      setSuccess("Mobile verified successfully");
      setOtpVerified(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
 
  const handleResendOTP = async () => {
    setLoading(true);
    setError("");
    try {
      await guestApi.sendOtp({ phone: `+91${mobile}`, purpose: "register" });
      setTimer(180);
      setSuccess("OTP resent successfully");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 3 || form.name.trim().length > 30) {
      setError("Full name must be between 3 and 30 characters");
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
      phone: `+91${mobile}`,
      country: "India",
      state: form.state.trim(),
      city: form.city.trim(),
      educational_status: form.educational_status || null,
      qualification: form.qualification || null,
      passedout_year: form.passedout_year || null,
      interest: form.interest || null,
      password: form.password,
    };

    try {
      await guestApi.register(payload);
      setSuccess("Account created successfully! Welcome to Lauratek");
      setTimeout(() => {
        onBackToLogin();
      }, 2500);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {!otpVerified ? (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Verify your Mobile Number</h1>
            <p className="text-gray-500 text-sm">We need to verify your phone for security</p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
                  <span className="px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700 border-r border-gray-200">+91</span>
                  <Input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="Enter your Mobile number"
                    required
                    className="flex-1 h-10 text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}
              {success && <p className="text-green-500 text-xs">{success}</p>}

              <Button
                type="submit"
                disabled={loading || mobile.length < 10}
                className="w-full h-10 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>

              <p className="text-center text-xs text-gray-600 pt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          ) : (
            <div className="space-y-4">
              {/* OTP Verification Card */}
              <div className="border border-purple-200 rounded-xl p-4 bg-white">
                <p className="text-xs font-medium text-gray-800 mb-3">
                  <span className="font-semibold">Mobile Verification</span>
                  <span className="text-gray-500"> (An OTP has been sent to the {maskedMobile})</span>
                </p>

                <form onSubmit={handleVerifyOTP} className="space-y-3">
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="h-10 text-sm text-center tracking-widest border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                    autoFocus
                  />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Time left <span className="text-purple-600 font-medium">{formatTime(timer)}</span></span>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={timer > 0 || loading}
                      className="text-purple-600 hover:underline font-medium disabled:text-gray-400 disabled:no-underline"
                    >
                      Resend OTP
                    </button>
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  {success && <p className="text-green-500 text-xs">{success}</p>}

                  <Button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full h-9 text-xs font-medium border border-purple-300 bg-white text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                </form>
              </div>

              <p className="text-center text-xs text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Registration Form */
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-center text-sm font-medium">
            Verified: +91{mobile}
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
            Already have an account? <button type="button" onClick={onBackToLogin} className="font-semibold text-blue-600 hover:underline">Login</button>
          </p>
        </form>
      )}
    </div>
  );
}
