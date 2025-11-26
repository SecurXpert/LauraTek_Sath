import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
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
import guestApi from "@/api/guestApi";
import logo from "@/assets/techlogo.png";
import signupIllustration from "@/assets/signup-illustration.png";


const technicalSkills = ["Java", "Python", "React", "Node.js", "SQL", "HTML/CSS", "Cloud+Devops", "UI/UX"];
const nonTechnicalSkills = ["Communication", "Management", "Marketing", "Sales", "Design"];
const qualifications = ["High School", "Diploma", "B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "M.Tech", "M.Sc", "MCA", "MBA", "Ph.D", "Other"];
const educationalStatuses = ["Current Year", "Passed Out"];

export default function RegistrationDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", state: "", city: "",
    educational_status: "", qualification: "", passedout_year: "",
    interest: "", password: "", confirmPassword: ""
  });

  const [category, setCategory] = useState<"technical" | "nonTechnical" | "">("");

  const fullPhone = `+91${phone}`;
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to form when needed
  useEffect(() => {
    if (open && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [open, otpVerified]);

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setTimeout(() => setOpen(false), 2500);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden rounded-3xl shadow-2xl max-h-screen overflow-y-auto">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left: Form */}
          <div ref={formRef} className="w-full lg:w-1/2 p-6 lg:p-10 bg-white overflow-y-auto">
            <div className="max-w-md mx-auto space-y-8">

              {/* Header */}
              <div className="text-center">
                <img src={logo} alt="Lauratek" className="h-12 mx-auto mb-4" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Create Your Account</h2>
                <p className="text-gray-600 mt-2">Join thousands of learners today</p>
              </div>

              {/* STEP 1: Phone + OTP */}
              {!otpVerified ? (
                <div className="space-y-8 bg-gray-50 p-8 rounded-2xl border">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">Phone</span>
                    </div>
                    <h3 className="text-2xl font-bold">Verify Your Mobile Number</h3>
                    <p className="text-gray-600 mt-2">We need to verify your phone for security</p>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-gray-200 border rounded-l-xl px-5 py-3 text-lg font-bold flex items-center whitespace-nowrap">
                        +91
                      </div>
                      <Input
                        placeholder="Enter 10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        maxLength={10}
                        className="text-lg font-medium"
                        autoFocus
                      />
                    </div>

                    <Button
                      onClick={sendOtp}
                      disabled={otpLoading || phone.length !== 10}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg"
                    >
                      {otpLoading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                  </div>

                  {/* OTP Input (appears after send) */}
                  {otpSent && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-green-50 border border-green-300 text-green-700 p-4 rounded-lg text-center font-medium">
                        OTP sent to +91 {phone}
                      </div>

                      <Input
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        maxLength={6}
                        className="text-center text-3xl tracking-widest font-mono h-16"
                        autoFocus
                      />

                      <Button
                        onClick={verifyOtp}
                        disabled={otpLoading || otp.length !== 6}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg"
                      >
                        {otpLoading ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </div>
                  )}

                  {error && <p className="text-red-600 text-center font-medium bg-red-50 p-3 rounded-lg">{error}</p>}
                  {success && <p className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg">{success}</p>}
                </div>
              ) : (

                /* STEP 2: Full Registration Form */
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="bg-green-50 border-2 border-green-500 text-green-800 p-5 rounded-xl text-center font-bold text-lg">
                    Verified: {fullPhone}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><Label>Full Name *</Label><Input required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="John Doe" /></div>
                    <div><Label>Email Address *</Label><Input required type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="john@example.com" /></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><Label>State *</Label><Input required value={form.state} onChange={e => setForm(p => ({...p, state: e.target.value}))} placeholder="Karnataka" /></div>
                    <div><Label>City *</Label><Input required value={form.city} onChange={e => setForm(p => ({...p, city: e.target.value}))} placeholder="Bangalore" /></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label>Educational Status</Label>
                      <Select onValueChange={v => setForm(p => ({...p, educational_status: v}))}>
                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                        <SelectContent>{educationalStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Qualification</Label>
                      <Select onValueChange={v => setForm(p => ({...p, qualification: v}))}>
                        <SelectTrigger><SelectValue placeholder="Choose qualification" /></SelectTrigger>
                        <SelectContent>{qualifications.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div><Label>Passed Out Year</Label><Input value={form.passedout_year} onChange={e => setForm(p => ({...p, passedout_year: e.target.value.replace(/\D/g, "").slice(0,4)}))} placeholder="2024" maxLength={4} /></div>

                  <div>
                    <Label>Category</Label>
                    <Select onValueChange={(v: "technical" | "nonTechnical") => setCategory(v)}>
                      <SelectTrigger><SelectValue placeholder="Technical or Non-Technical" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="nonTechnical">Non-Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {category && (
                    <div>
                      <Label>Primary Skill / Interest</Label>
                      <Select onValueChange={v => setForm(p => ({...p, interest: v}))}>
                        <SelectTrigger><SelectValue placeholder="Choose your interest" /></SelectTrigger>
                        <SelectContent>
                          {(category === "technical" ? technicalSkills : nonTechnicalSkills).map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><Label>Create Password *</Label><Input required type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} placeholder="••••••••" /></div>
                    <div><Label>Confirm Password *</Label><Input required type="password" value={form.confirmPassword} onChange={e => setForm(p => ({...p, confirmPassword: e.target.value}))} placeholder="••••••••" /></div>
                  </div>

                  {error && <p className="text-red-600 text-center font-medium bg-red-50 p-4 rounded-xl">{error}</p>}
                  {success && <p className="text-green-600 text-center font-bold text-xl bg-green-50 p-4 rounded-xl">{success}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-8 text-xl rounded-full shadow-2xl transform transition hover:scale-105"
                  >
                    {loading ? "Creating Your Account..." : "Complete Registration"}
                  </Button>
                </form>
              )}

              <p className="text-center text-sm text-gray-600 mt-10 pb-10">
                Already have an account?{" "}
                <button type="button"  className="text-indigo-600 font-bold hover:underline">
                  <SignInDialog />
                </button>
              </p>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10 text-center text-white">
              <img src={signupIllustration} alt="Welcome" className="max-w-md mx-auto rounded-3xl shadow-2xl border-8 border-white/20" />
              <h3 className="text-5xl font-bold mt-10">Welcome to Lauratek!</h3>
              <p className="text-2xl mt-4 opacity-90">Please signin</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
