
import React, { useState, useEffect } from "react";
import { Mail, Lock, Shield, AlertCircle, Smartphone, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import authApi from "@/api/authApi";
import guestApi from "@/api/guestApi";
import { VITE_API_URL } from "@/services/api/api";
import { decodeJWT } from "@/lib/jwtUtils";
 
import logo from "@/assets/techlogo.png";
import mainImage from "@/assets/userside.png";
 
export default function SignInDialog() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(180);
  const [maskedMobile, setMaskedMobile] = useState("");
 
  const [step, setStep] = useState<"login" | "mfa" | "enroll" | "reenroll" | "backupCodes" | "finalMfa">("login");
  const [showBackupInput, setShowBackupInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetRole, setResetRole] = useState<"student" | "guest">("student");
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);
 
  const resetAll = () => {
    setEmail("");
    setPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setMobile("");
    setOtp("");
    setBackupCode("");
    setTempToken(null);
    setQrImage("");
    setBackupCodes([]);
    setOtpSent(false);
    setOtpVerified(false);
    setTimer(180);
    setMaskedMobile("");
    setView("login");
    setStep("login");
    setShowBackupInput(false);
    setError("");
    setSuccess("");
  };

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
      setTimer(180);
      setMaskedMobile(maskMobileNumber(mobile));
      setSuccess("OTP sent successfully");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Mobile verified successfully");
      setTimeout(() => {
        setOpen(false);
        resetAll();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimer(180);
      setSuccess("OTP resent successfully");
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };
 
  // === FORGOT PASSWORD ===
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !newPassword) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (resetRole === "student") {
        await guestApi.studentForgotReset({
          phone: `+91${mobile}`,
          new_password: newPassword,
        });
      } else {
        await guestApi.forgotReset({
          phone: `+91${mobile}`,
          new_password: newPassword,
        });
      }
      setSuccess("Password reset successfully!");
      setTimeout(() => {
        resetAll();
        setView("login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) {
      setError("Please enter a valid mobile number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (resetRole === "student") {
        await guestApi.studentForgotSendOtp({ phone: `+91${mobile}` });
      } else {
        await guestApi.forgotSendOtp({ phone: `+91${mobile}` });
      }
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

  const handleForgotVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (resetRole === "student") {
        await guestApi.studentForgotVerifyOtp({ phone: `+91${mobile}`, otp_code: otp });
      } else {
        await guestApi.forgotVerifyOtp({ phone: `+91${mobile}`, otp_code: otp });
      }
      setSuccess("OTP verified successfully");
      setOtpVerified(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotResendOTP = async () => {
    setLoading(true);
    setError("");
    try {
      if (resetRole === "student") {
        await guestApi.studentForgotSendOtp({ phone: `+91${mobile}` });
      } else {
        await guestApi.forgotSendOtp({ phone: `+91${mobile}` });
      }
      setTimer(180);
      setSuccess("OTP resent successfully");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // === LOGIN ===
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
 
    try {
      let res;
      let userRole = "student";
      res = await authApi.login({ email, password });
      userRole = "student";
      const data = res.data;
 
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token", data.access_token);

        const decoded = decodeJWT(data.access_token);
        let finalRole = (decoded?.role || "").toLowerCase().trim();

        if (finalRole !== "instructor" && finalRole !== "trainer") {
          try {
            const checkRes = await fetch(`${VITE_API_URL}/student/me`, {
              headers: { Authorization: `Bearer ${data.access_token}` },
            });
            if (checkRes.ok) {
              finalRole = "student";
            } else {
              finalRole = "guest";
            }
          } catch (e) {
            finalRole = "guest";
          }
        }

        localStorage.setItem("userRole", finalRole);
        localStorage.setItem("role", finalRole);

        setTimeout(() => {
          if (finalRole === "instructor" || finalRole === "trainer") {
            window.location.href = "/instructor/dashboard";
          } else if (finalRole === "guest") {
            window.location.href = "/guest";
          } else {
            window.location.href = "/dashboard";
          }
          setOpen(false);
        }, 1000);
        return;
      }
 
      if (data.temp_token) {
        localStorage.setItem("userRole", userRole); // fallback for MFA flow
        localStorage.setItem("role", userRole);
        setTempToken(data.temp_token);
        setStep("mfa");
        setSuccess("Enter your 2FA code");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
 
  // === NORMAL MFA ===
  const handleMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempToken) return;
 
    if (showBackupInput) {
      if (!backupCode.trim()) return;
      await startReEnrollWithBackupCode();
      return;
    }

    if (otp.length !== 6) return;
 
    setLoading(true);
    setError("");
 
    try {
      const res = await authApi.verifyMfa({ temp_token: tempToken, code: otp });
      const accessToken = res.data.access_token;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("token", accessToken);

      const decoded = decodeJWT(accessToken);
      let finalRole = (decoded?.role || "").toLowerCase().trim();

      if (finalRole !== "instructor" && finalRole !== "trainer") {
        try {
          const checkRes = await fetch(`${VITE_API_URL}/student/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (checkRes.ok) {
            finalRole = "student";
          } else {
            finalRole = "guest";
          }
        } catch (e) {
          finalRole = "guest";
        }
      }

      localStorage.setItem("userRole", finalRole);
      localStorage.setItem("role", finalRole);
      
      setSuccess("Login successful!");
      setTimeout(() => {
        if (finalRole === "instructor" || finalRole === "trainer") {
          window.location.href = "/instructor/dashboard";
        } else if (finalRole === "guest") {
          window.location.href = "/guest";
        } else {
          window.location.href = "/dashboard";
        }
        setOpen(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid code");
    } finally {
      setLoading(false);
    }
  };
 
  // === FIRST-TIME ENROLLMENT ===
  const startEnrollment = async () => {
    if (!tempToken) return;
    setLoading(true);
    try {
      await authApi.startMfaEnrollment(tempToken);
      const blob = (await authApi.getMfaQr(tempToken)).data;
      setQrImage(URL.createObjectURL(blob));
      setStep("enroll");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load QR");
    } finally {
      setLoading(false);
    }
  };
 
  // === RE-ENROLL WITH BACKUP CODE ===
  const startReEnrollWithBackupCode = async () => {
    if (!tempToken || !backupCode.trim()) return;
 
    setLoading(true);
    setError("");
    setSuccess("Processing backup code...");
 
    try {
      await authApi.startReEnroll({ token: tempToken, current_code: backupCode.trim() });
      const blob = (await authApi.getReEnrollQr(tempToken)).data;
      setQrImage(URL.createObjectURL(blob));
      setStep("reenroll");
      setSuccess("Backup code accepted! Scan new QR");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid backup code");
    } finally {
      setLoading(false);
    }
  };
 
  // === VERIFY ENROLL / RE-ENROLL ===
  const handoffToFinalMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !tempToken) return setError("Invalid code");
 
    setLoading(true);
    setError("");
 
    try {
      const res = await authApi.verifyEnroll(tempToken, otp);
      const data = res.data;
 
      if (data.backup_codes) {
        setBackupCodes(data.backup_codes);
        setStep("backupCodes");
        setSuccess("Setup complete! Please save these backup codes.");
        setOtp("");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid code");
    } finally {
      setLoading(false);
    }
  };
 
  // === FINAL LOGIN AFTER SETUP ===
  const handleFinalMfaLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !tempToken) return;
 
    setLoading(true);
    setError("");
 
    try {
      const res = await authApi.verifyMfa({ temp_token: tempToken, code: otp });
      const accessToken = res.data.access_token;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("token", accessToken);
      
      const decoded = decodeJWT(accessToken);
      let finalRole = (decoded?.role || "").toLowerCase().trim();

      if (finalRole !== "instructor" && finalRole !== "trainer") {
        try {
          const checkRes = await fetch(`${VITE_API_URL}/student/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (checkRes.ok) {
            finalRole = "student";
          } else {
            finalRole = "guest";
          }
        } catch (e) {
          finalRole = "guest";
        }
      }

      localStorage.setItem("userRole", finalRole);
      localStorage.setItem("role", finalRole);

      setSuccess("Welcome back!");
      setTimeout(() => {
        if (finalRole === "instructor" || finalRole === "trainer") {
          window.location.href = "/instructor/dashboard";
        } else if (finalRole === "guest") {
          window.location.href = "/guest";
        } else {
          window.location.href = "/dashboard";
        }
        setOpen(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid code");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetAll(); setOpen(o); }}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-medium text-base">Sign In</Button>
      </DialogTrigger>
 
      <DialogContent className="!p-0 !m-0 !left-0 !top-0 !translate-x-0 !translate-y-0 !max-w-none !w-screen !h-screen !max-h-screen !rounded-none sm:!rounded-none !border-none !shadow-none overflow-hidden bg-white [&>button]:hidden">
        <div className="flex w-full h-full">
          {/* LEFT SIDE – Image on top + Purple gradient welcome section below */}
          <div className="w-1/2 hidden md:flex flex-col">
            {/* Student Image on top */}
            <div className="h-[55%] w-full overflow-hidden">
              <img
                src={mainImage}
                alt="Students learning"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Purple gradient welcome section */}
            <div className="h-[45%] w-full bg-gradient-to-br from-blue-600 via-purple-600 to-purple-500 flex items-center justify-center p-8">
              <div className="border-l-4 border-white pl-6 py-2">
                <h2 className="text-white text-3xl font-semibold mb-3">Welcome To <span className="font-normal">Lauratek</span></h2>
                <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                  A powerful platform designed to streamline learning, assessments, and student success with a modern, centralized experience.
                </p>
              </div>
            </div>
          </div>
 
          {/* RIGHT SIDE – Forms */}
          <div className="w-full md:w-1/2 bg-white flex flex-col h-full">
            {/* Header with Logo and Back button */}
            <div className="flex items-center justify-between px-8 pt-6 pb-4">
              <img src={logo} alt="LAURATEK" className="h-8" />
              <button
                type="button"
                onClick={() => (view === "signup" || view === "forgot") ? setView("login") : setOpen(false)}
                className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Back
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex items-center justify-center px-10 pb-8">
              <div className="w-full max-w-sm">
                {/* LOGIN VIEW */}
                {view === "login" && step === "login" && (
                  <div className="space-y-5">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Login</h1>
                      <p className="text-gray-500 text-sm">Enter your credentials to login your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="h-10 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-gray-700">Password <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="h-10 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {error && <p className="text-red-500 text-xs">{error}</p>}

                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => { setView("forgot"); setError(""); setSuccess(""); }}
                          className="text-xs text-blue-600 hover:underline font-medium"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        {loading ? "Loading..." : "Login"}
                      </Button>

                      <p className="text-center text-xs text-gray-600 pt-2">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setView("signup")}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          Sign up
                        </button>
                      </p>
                    </form>
                  </div>
                )}

                {/* FORGOT PASSWORD VIEW */}
                {view === "forgot" && (
                  <div className="space-y-5">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Forgot Password</h1>
                      <p className="text-gray-500 text-sm">Select your role and enter your phone number</p>
                    </div>

                    {!otpVerified ? (
                      !otpSent ? (
                        <form onSubmit={handleForgotSendOTP} className="space-y-4">
                          <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                              type="button"
                              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${resetRole === 'student' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                              onClick={() => setResetRole('student')}
                            >
                              Student
                            </button>
                            <button
                              type="button"
                              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${resetRole === 'guest' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                              onClick={() => setResetRole('guest')}
                            >
                              Guest
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></Label>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 bg-white">
                              <span className="px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700 border-r border-gray-200 h-10 flex items-center">+91</span>
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
                            disabled={loading || mobile.length !== 10}
                            className="w-full h-10 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                          >
                            {loading ? "Sending..." : "Send OTP"}
                          </Button>

                          <p className="text-center text-xs text-gray-600 pt-2">
                            Remember your password?{" "}
                            <button
                              type="button"
                              onClick={() => { resetAll(); setView("login"); }}
                              className="font-semibold text-blue-600 hover:underline"
                            >
                              Login
                            </button>
                          </p>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <div className="border border-purple-200 rounded-xl p-4 bg-white">
                            <p className="text-xs font-medium text-gray-800 mb-3">
                              <span className="font-semibold">Mobile Verification</span>
                              <span className="text-gray-500"> (An OTP has been sent to the {maskedMobile})</span>
                            </p>
    
                            <form onSubmit={handleForgotVerifyOTP} className="space-y-3">
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
                                  onClick={handleForgotResendOTP}
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
    
                          <p className="text-center text-xs text-gray-600 pt-2">
                            Remember your password?{" "}
                            <button
                              type="button"
                              onClick={() => { resetAll(); setView("login"); }}
                              className="font-semibold text-blue-600 hover:underline"
                            >
                              Login
                            </button>
                          </p>
                        </div>
                      )
                    ) : (
                      <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-center text-sm font-medium">
                          Verified: +91{mobile}
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-gray-700">New Password <span className="text-red-500">*</span></Label>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password"
                              required
                              className="h-10 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        {error && <p className="text-red-500 text-xs">{error}</p>}
                        {success && <p className="text-green-500 text-xs">{success}</p>}

                        <Button
                          type="submit"
                          disabled={loading || !newPassword}
                          className="w-full h-10 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          {loading ? "Resetting..." : "Reset Password"}
                        </Button>

                        <p className="text-center text-xs text-gray-600 pt-2">
                          Remember your password?{" "}
                          <button
                            type="button"
                            onClick={() => { resetAll(); setView("login"); }}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            Login
                          </button>
                        </p>
                      </form>
                    )}
                  </div>
                )}

                {/* SIGNUP / MOBILE VERIFICATION VIEW */}
                {view === "signup" && (
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
                            onClick={() => setView("login")}
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
                            onClick={() => setView("login")}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            Login
                          </button>
                        </p>
                      </div>
                    )}
                  </div>
                )}
 
                {/* MFA STEP */}
                {step === "mfa" && (
                  <form onSubmit={handleMfa} className="space-y-6 text-center">
                    <Shield className="w-12 h-12 text-purple-600 mx-auto" />
                    <h3 className="text-xl font-bold">Two-Factor Authentication</h3>
                    <p className="text-gray-600 text-sm">Enter the 6-digit code from your authenticator app</p>
 
                    {!showBackupInput ? (
                      <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        className="text-center text-3xl font-mono tracking-widest h-14"
                        autoFocus
                      />
                    ) : (
                      <Input
                        value={backupCode}
                        onChange={(e) => setBackupCode(e.target.value)}
                        placeholder="Enter backup code"
                        className="text-center font-mono text-base"
                        autoFocus
                      />
                    )}
 
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowBackupInput(!showBackupInput);
                          setOtp("");
                          setBackupCode("");
                        }}
                        className="text-xs text-purple-600 hover:underline block"
                      >
                        {showBackupInput ? "Use authenticator app" : "Lost access? Use backup code"}
                      </button>
                      <button type="button" onClick={startEnrollment} className="text-xs text-purple-600 hover:underline block">
                        First time? Set up 2FA
                      </button>
                    </div>
 
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      type="submit"
                      disabled={loading || (showBackupInput ? !backupCode.trim() : otp.length !== 6)}
                      className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-medium rounded-lg"
                    >
                      Verify
                    </Button>
                  </form>
                )}
 
                {/* ENROLL / RE-ENROLL */}
                {(step === "enroll" || step === "reenroll") && (
                  <form onSubmit={handoffToFinalMfa} className="space-y-6 text-center">
                    <Smartphone className="w-12 h-12 text-green-600 mx-auto" />
                    <h3 className="text-xl font-bold text-green-700">Scan QR Code</h3>
                    <p className="text-gray-600 text-sm">Open your authenticator app and scan the QR code</p>
                    {qrImage && <img src={qrImage} alt="QR Code" className="w-48 h-48 mx-auto rounded-xl border-4 border-gray-200" />}
                    <p className="text-gray-700 font-medium text-sm mt-2">Then enter the 6-digit code</p>
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="text-center text-3xl font-mono tracking-widest h-14"
                      autoFocus
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium rounded-lg"
                    >
                      Verify Setup
                    </Button>
                  </form>
                )}
 
                {/* BACKUP CODES VIEW */}
                {step === "backupCodes" && (
                  <div className="space-y-6 text-center">
                    <Shield className="w-12 h-12 text-purple-600 mx-auto" />
                    <h3 className="text-xl font-bold text-purple-700">Save Your Backup Codes</h3>
                    <p className="text-gray-600 text-sm">
                      These codes can be used to access your account if you lose your authenticator device.
                      Please save them securely. Each code can only be used once.
                    </p>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {backupCodes.map((code, index) => (
                          <div key={index} className="font-mono text-sm bg-white py-1.5 rounded border border-gray-100 shadow-sm text-center">
                            {code}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => { setStep("finalMfa"); setSuccess(""); }}
                      className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-medium rounded-lg text-white shadow-md hover:shadow-lg transition-all"
                    >
                      I have saved these codes
                    </Button>
                  </div>
                )}

                {/* FINAL MFA AFTER ENROLLMENT */}
                {step === "finalMfa" && (
                  <form onSubmit={handleFinalMfaLogin} className="space-y-6 text-center">
                    <Shield className="w-12 h-12 text-green-600 mx-auto" />
                    <h3 className="text-xl font-bold text-green-700">You're all set!</h3>
                    <p className="text-gray-600 text-sm">Enter your authenticator code to complete login</p>
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="text-center text-3xl font-mono tracking-widest h-14"
                      autoFocus
                    />
                    {success && <p className="text-green-600 font-medium text-sm mt-2">{success}</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium rounded-lg"
                    >
                      Complete Login
                    </Button>
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
 
