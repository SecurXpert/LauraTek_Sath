// src/components/SignInDialog.tsx
import React, { useState } from "react";
import { Mail, Lock, Shield, AlertCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import authApi from "@/api/authApi";

import logo from "@/assets/techlogo.png";
import mainImage from "@/assets/login.png";      // ← Main woman image
import bgLogin from "@/assets/bg_login.png";      // ← Background pattern

export default function SignInDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const [step, setStep] = useState<"login" | "mfa" | "enroll" | "reenroll" | "backupCodes" | "finalMfa">("login");
  const [showBackupInput, setShowBackupInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const resetAll = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setBackupCode("");
    setTempToken(null);
    setQrImage("");
    setBackupCodes([]);
    setStep("login");
    setShowBackupInput(false);
    setError("");
    setSuccess("");
  };

  // === LOGIN ===
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });
      const data = res.data;

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        setTimeout(() => {
          navigate("/dashboard");
          setOpen(false);
        }, 1000);
        return;
      }

      if (data.temp_token) {
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
    if (!tempToken || otp.length !== 6) return;

    if (showBackupInput && backupCode.trim()) {
      await startReEnrollWithBackupCode();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await authApi.verifyMfa({ temp_token: tempToken, code: otp });
      localStorage.setItem("access_token", res.data.access_token);
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
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
        setStep("finalMfa");
        setSuccess("Setup complete! Now enter your authenticator code to log in.");
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
      localStorage.setItem("access_token", res.data.access_token);
      setSuccess("Welcome back!");
      setTimeout(() => {
        navigate("/dashboard");
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

      <DialogContent className="p-0 max-w-6xl w-full h-screen md:h-auto rounded-none  overflow-hidden border-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* LEFT SIDE – Background + Main Image */}
          <div className="relative w-full md:w-1/2 hidden md:flex items-center justify-center overflow-hidden">
            {/* Background pattern */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${bgLogin})` }}
            />

            {/* Main Woman Image */}
            <img
              src={mainImage}
              alt="Welcome"
              className="relative z-10 w-[82%] max-w-lg rounded-3xl shadow-2xl border-8 border-white/30 object-cover mt-5 mb-5"
            />
          </div>

          {/* RIGHT SIDE – Login Form */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-12 md:px-16">
            <div className="w-full max-w-md space-y-8">
              {/* Logo & Heading */}
              <div className="text-center space-y-6">
                <img src={logo} alt="LAURATEK" className="h-12 mx-auto" />
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                    Let the Journey Begin!
                  </h1>
                  <p className="text-sm text-gray-900 mt-3">
                    Unlock a world of education with a single click! <br /> Please login in to your account.
                  </p>
                </div>
              </div>

              {/* LOGIN STEP */}
              {step === "login" && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Email Address</Label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="@example.com"
                        required
                        className="h-10 pl-12 pr-4 text-base border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium text-gray-700">Password</Label>
                    <div className="relative">
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-10 pl-12 pr-4 text-base border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 mb-9"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {error && <p className="text-red-600 text-center text-sm">{error}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800  shadow-lg mt-6 transition-all"
                  >
                    {loading ? "Loading..." : "Login"}
                  </Button>

                  <div className="text-center space-y-4 pt-4">
                    <a href="#" className="text-indigo-600 text-sm hover:underline block">
                      Forgot Password?
                    </a>
                    <p className="text-gray-600 text-base">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-bold text-indigo-600 hover:underline"
                      >
                        Sign Up For Free
                      </button>
                    </p>
                  </div>
                </form>
              )}

              {/* MFA STEP */}
              {step === "mfa" && (
                <form onSubmit={handleMfa} className="space-y-8 text-center">
                  <Shield className="w-16 h-16 text-indigo-600 mx-auto" />
                  <h3 className="text-2xl font-bold">Two-Factor Authentication</h3>
                  <p className="text-gray-600">Enter the 6-digit code from your authenticator app</p>

                  {!showBackupInput ? (
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="text-center text-4xl font-mono tracking-widest h-16"
                      autoFocus
                    />
                  ) : (
                    <Input
                      value={backupCode}
                      onChange={(e) => setBackupCode(e.target.value)}
                      placeholder="Enter backup code"
                      className="text-center font-mono text-lg"
                      autoFocus
                    />
                  )}

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBackupInput(!showBackupInput);
                        setOtp("");
                        setBackupCode("");
                      }}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      {showBackupInput ? "Use authenticator app" : "Lost access? Use backup code"}
                    </button>
                    <button type="button" onClick={startEnrollment} className="text-sm text-indigo-600 hover:underline block">
                      First time? Set up 2FA
                    </button>
                  </div>

                  {error && <p className="text-red-600">{error}</p>}
                  <Button
                    type="submit"
                    disabled={loading || (showBackupInput ? !backupCode.trim() : otp.length !== 6)}
                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-700 text-lg font-bold rounded-full"
                  >
                    Verify
                  </Button>
                </form>
              )}

              {/* ENROLL / RE-ENROLL */}
              {(step === "enroll" || step === "reenroll") && (
                <form onSubmit={handoffToFinalMfa} className="space-y-8 text-center">
                  <Smartphone className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-700">Scan QR Code</h3>
                  <p className="text-gray-600">Open your authenticator app and scan the QR code</p>
                  {qrImage && <img src={qrImage} alt="QR Code" className="w-64 h-64 mx-auto rounded-2xl border-4 border-gray-200" />}
                  <p className="text-gray-700 font-medium mt-4">Then enter the 6-digit code</p>
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="text-center text-4xl font-mono tracking-widest h-16"
                    autoFocus
                  />
                  {error && <p className="text-red-600">{error}</p>}
                  <Button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-700 text-lg font-bold rounded-full"
                  >
                    Verify Setup
                  </Button>
                </form>
              )}

              {/* FINAL MFA AFTER ENROLLMENT */}
              {step === "finalMfa" && (
                <form onSubmit={handleFinalMfaLogin} className="space-y-8 text-center">
                  <Shield className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-700">You're all set!</h3>
                  <p className="text-gray-600">Enter your authenticator code to complete login</p>
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="text-center text-4xl font-mono tracking-widest h-16"
                    autoFocus
                  />
                  {success && <p className="text-green-600 font-medium mt-4">{success}</p>}
                  {error && <p className="text-red-600">{error}</p>}
                  <Button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-700 text-lg font-bold rounded-full"
                  >
                    Complete Login
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}