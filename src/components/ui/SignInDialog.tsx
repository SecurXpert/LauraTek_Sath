import React, { useState } from "react";
import { Mail, Lock, Shield, AlertCircle, RefreshCw, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

import loginImage from "@/assets/login.png";
import logo from "@/assets/techlogo.png";

const BASE_URL = "http://192.168.0.105:8000";

export default function SignInDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const [step, setStep] = useState<"login" | "mfa" | "enroll" | "reenroll" | "backupCodes">("login");
  const [showBackupInput, setShowBackupInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const resetAll = () => {
    setEmail(""); setPassword(""); setOtp(""); setBackupCode(""); setCurrentCode("");
    setTempToken(null); setQrImage(""); setBackupCodes([]); setStep("login");
    setShowBackupInput(false); setError(""); setSuccess("");
  };

  // === LOGIN ===
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/student/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        setTimeout(() => { navigate("/dashboard"); setOpen(false); }, 1000);
        return;
      }

      if (data.temp_token) {
        setTempToken(data.temp_token);
        setStep("mfa");
        setSuccess("Enter your 2FA code");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // === MFA + BACKUP CODE HANDLER ===
const handleMfa = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!tempToken) return;

  setLoading(true);
  setError("");

  try {
    if (showBackupInput && backupCode.trim()) {
      // CASE 1: USER USED BACKUP CODE → START RE-ENROLL DIRECTLY
      await startReEnrollWithBackupCode();
      return;
    }

    // CASE 2: NORMAL TOTP CODE
    const res = await fetch(`${BASE_URL}/mfa/verify-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        temp_token: tempToken,
        code: otp,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.detail || "Invalid code");
      setLoading(false);
      return;
    }

    localStorage.setItem("access_token", data.access_token);
    setSuccess("Login successful!");
    setTimeout(() => {
      navigate("/dashboard");
      setOpen(false);
    }, 1000);

  } catch (err: any) {
    setError("Network error");
  } finally {
    setLoading(false);
  }
};

// === NEW: Start re-enroll using backup code as current_code ===
// const startReEnrollWithBackupCode = async () => {
//   if (!tempToken || !backupCode.trim()) return;

//   setLoading(true);
//   setError("");
//   setSuccess("Processing backup code...");

//   try {
//     const res = await fetch(`${BASE_URL}/mfa/re-enroll/start`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         token: tempToken,
//         current_code: backupCode.trim(), // ← BACKUP CODE USED HERE
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.detail || "Invalid backup code");
//     }

//     // Success! Re-enroll started → now load QR
//     setSuccess("Backup code accepted! Loading new QR code...");
//     setStep("reenroll");
//     await loadReEnrollQR(); // Load QR immediately

//   } catch (err: any) {
//     setError(err.message || "Invalid or used backup code");
//   } finally {
//     setLoading(false);
//   }
// };

  // === FIRST-TIME ENROLLMENT ===
  const startEnrollment = async () => {
    if (!tempToken) return;
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/mfa/enroll/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tempToken }),
      });

      const qrRes = await fetch(`${BASE_URL}/mfa/enroll/qr?token=${tempToken}`);
      const blob = await qrRes.blob();
      setQrImage(URL.createObjectURL(blob));
      setStep("enroll");
    } catch {
      setError("Failed to load QR");
    } finally {
      setLoading(false);
    }
  };

  // === RE-ENROLL: When user has old device (asks for current code) ===
  const startReEnroll = async () => {
    if (!tempToken || currentCode.length !== 6) {
      setError("Enter current 6-digit code");
      return;
    }

    setLoading(true); setError("");
    try {
      const res = await fetch(`${BASE_URL}/mfa/re-enroll/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tempToken, current_code: currentCode }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Invalid current code");
      }

      const qrRes = await fetch(`${BASE_URL}/mfa/re-enroll/qr?token=${tempToken}`);
      const blob = await qrRes.blob();
      setQrImage(URL.createObjectURL(blob));
      setSuccess("Scan with new device");
    } catch (err: any) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  // === RE-ENROLL: Direct QR after backup code (NO current_code needed) ===
  const fetchReEnrollQRDirectly = async () => {
    if (!tempToken) return;
    setLoading(true); setError("");

    try {
      const qrRes = await fetch(`${BASE_URL}/mfa/re-enroll/qr?token=${tempToken}`);
      if (!qrRes.ok) throw new Error("Failed to load recovery QR");

      const blob = await qrRes.blob();
      setQrImage(URL.createObjectURL(blob));
      setSuccess("Scan this QR with your new device");
    } catch (err: any) {
      setError(err.message || "Could not load QR");
    } finally {
      setLoading(false);
    }
  };

  // === VERIFY ENROLLMENT / RE-ENROLLMENT ===
  const handleReEnrollVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  if (otp.length !== 6) return;

  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${BASE_URL}/mfa/re-enroll/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: tempToken,
        data: { code: otp },
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.detail || "Invalid code");

    if (data.backup_codes) {
      setBackupCodes(data.backup_codes);
      setStep("backupCodes");
    } else {
      setSuccess("2FA Recovery Complete!");
      localStorage.setItem("access_token", data.access_token || ""); // in case token is returned
      setTimeout(() => {
        navigate("/dashboard");
        setOpen(false);
      }, 1500);
    }
  } catch (err: any) {
    setError(err.message || "Verification failed");
  } finally {
    setLoading(false);
  }
};

const loadReEnrollQR = async () => {
  if (!tempToken) return;

  setLoading(true);
  try {
    const qrRes = await fetch(`${BASE_URL}/mfa/re-enroll/qr?token=${tempToken}`);
    if (!qrRes.ok) throw new Error("Failed to load QR code");

    const blob = await qrRes.blob();
    setQrImage(URL.createObjectURL(blob));
    setSuccess("Scan this QR code with your new device");
  } catch (err: any) {
    setError(err.message || "Could not load QR code");
  } finally {
    setLoading(false);
  }
};

const startReEnrollWithBackupCode = async () => {
  if (!tempToken || !backupCode.trim()) return;

  setLoading(true);
  setError("");
  setSuccess("Processing backup code...");

  try {
    const res = await fetch(`${BASE_URL}/mfa/re-enroll/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: tempToken,
        current_code: backupCode.trim(), // ← BACKUP CODE USED HERE
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Invalid backup code");
    }

    // Success! Re-enroll started → now load QR
    setSuccess("Backup code accepted! Loading new QR code...");
    setStep("reenroll");
    await loadReEnrollQR(); // Load QR immediately

  } catch (err: any) {
    setError(err.message || "Invalid or used backup code");
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetAll(); setOpen(o); }}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-medium text-base">Sign In</Button>
      </DialogTrigger>

      <DialogContent className="p-0 max-w-5xl h-screen md:h-[720px] rounded-3xl overflow-hidden border-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">

          {/* Left Side */}
          <div className="hidden md:block bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="flex flex-col justify-center items-center h-full p-12 relative z-10 text-white">
              <img src={loginImage} alt="Welcome" className="w-96 rounded-3xl shadow-2xl border-8 border-white/20" />
              <h2 className="text-5xl font-bold mt-10">Welcome Back!</h2>
              <p className="text-xl mt-3 opacity-90">Continue your learning journey</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 md:p-10 bg-white">
            <div className="w-full max-w-md space-y-8">

              <div className="text-center">
                <img src={logo} alt="LAURATEK" className="h-12 mx-auto" />
                <h1 className="mt-6 text-4xl font-bold text-gray-900">Sign In</h1>
                <p className="text-gray-600 mt-2">Enter your credentials</p>
              </div>

              {/* LOGIN */}
              {step === "login" && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="pl-11" />
                    </div>
                  </div>
                  <div>
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="pl-11" />
                    </div>
                  </div>
                  {error && <p className="text-red-600 text-center">{error}</p>}
                  {success && <p className="text-green-600 text-center">{success}</p>}
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-7 text-xl font-bold rounded-full">
                    {loading ? "Signing in..." : "Continue"}
                  </Button>
                </form>
              )}

              {/* MFA */}
              {step === "mfa" && (
                <form onSubmit={handleMfa} className="space-y-8 text-center">
                  <Shield className="w-16 h-16 text-indigo-600 mx-auto" />
                  <h3 className="text-2xl font-bold">Two-Factor Authentication</h3>
                  <p className="text-gray-600">Enter code from your app</p>

                  {!showBackupInput ? (
                    <Input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="123456" maxLength={6} className="text-center text-3xl font-mono" autoFocus />
                  ) : (
                    <Input value={backupCode} onChange={(e) => setBackupCode(e.target.value)} placeholder="abcd-1234-efgh" className="text-center font-mono text-lg" autoFocus />
                  )}

                  <div className="space-y-3">
                    <button type="button" onClick={() => { setShowBackupInput(!showBackupInput); setOtp(""); setBackupCode(""); setError(""); }} className="text-sm text-indigo-600 hover:underline">
                      {showBackupInput ? "Use authenticator app" : "Lost access? Use backup code"}
                    </button>
                    <button type="button" onClick={startEnrollment} className="text-sm text-indigo-600 hover:underline block">First time? Set up 2FA</button>
                  </div>

                  {error && <p className="text-red-600">{error}</p>}
                  <Button type="submit" disabled={loading || (!showBackupInput && otp.length !== 6) || (showBackupInput && !backupCode.trim())} className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-7 text-xl font-bold rounded-full">
                    Verify
                  </Button>
                </form>
              )}

              {/* ENROLLMENT */}
              {step === "enroll" && (
                <form onSubmit={(e) => { e.preventDefault(); handleReEnrollVerify(e); }} className="space-y-8 text-center">
                  <Smartphone className="w-16 h-16 text-indigo-600 mx-auto" />
                  <h3 className="text-2xl font-bold">Set Up Authenticator</h3>
                  <p className="text-gray-600">Scan QR with Google Authenticator</p>
                  {qrImage ? <img src={qrImage} alt="QR" className="w-64 h-64 mx-auto border-4 border-gray-300 rounded-2xl shadow-lg" /> : <div className="w-64 h-64 mx-auto bg-gray-200 border-4 border-dashed rounded-2xl animate-pulse" />}
                  <Input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="Enter code" maxLength={6} className="text-center text-3xl font-mono" autoFocus />
                  {error && <p className="text-red-600">{error}</p>}
                  <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-7 text-xl font-bold rounded-full">
                    Complete Setup
                  </Button>
                </form>
              )}

              {/* RE-ENROLL */}
             {step === "reenroll" && !qrImage && (
  <div className="space-y-8 text-center">
    <div className="w-16 h-16 mx-auto border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    <h3 className="text-2xl font-bold">Setting Up New Device</h3>
    <p className="text-gray-600">Please wait while we prepare your recovery QR code...</p>
  </div>
)}

{step === "reenroll" && qrImage && (
  <form onSubmit={handleReEnrollVerify} className="space-y-8 text-center">
    <Smartphone className="w-16 h-16 text-green-600 mx-auto" />
    <h3 className="text-2xl font-bold text-green-700">Scan with New Device</h3>
    <p className="text-gray-600">Open Google Authenticator and scan this QR code</p>

    <img
      src={qrImage}
      alt="Recovery QR Code"
      className="w-64 h-64 mx-auto border-4 border-gray-300 rounded-2xl shadow-2xl"
    />

    <Input
      value={otp}
      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
      placeholder="Enter 6-digit code"
      maxLength={6}
      className="text-center text-3xl tracking-widest font-mono"
      autoFocus
    />

    {error && <p className="text-red-600 font-medium">{error}</p>}
    {success && <p className="text-green-600 font-medium">{success}</p>}

    <Button
      type="submit"
      disabled={loading || otp.length !== 6}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 py-7 text-xl font-bold rounded-full shadow-xl"
    >
      {loading ? "Completing Setup..." : "Complete Recovery"}
    </Button>
  </form>
)}

              {/* BACKUP CODES */}
              {step === "backupCodes" && (
                <div className="text-center space-y-8">
                  <AlertCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-700">All Set!</h3>
                  <p className="text-gray-600">Save these backup codes</p>
                  <div className="bg-gray-100 p-6 rounded-xl">
                    <div className="grid grid-cols-2 gap-4 text-lg font-mono">
                      {backupCodes.map((code, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg text-center border shadow">{code}</div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={() => { navigate("/dashboard"); setOpen(false); }} className="w-full bg-gradient-to-r from-green-600 to-emerald-700 py-7 text-xl font-bold rounded-full">
                    Go to Dashboard
                  </Button>
                </div>
              )}

              <p className="text-center text-sm text-gray-500 mt-10">
                New here? <button type="button" onClick={() => setOpen(false)} className="text-indigo-600 font-bold hover:underline">Register Now</button>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}