import React, { useState } from "react";
import { Shield, Smartphone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authApi from "@/api/authApi";
import { useNavigate } from "react-router-dom";

interface MfaFlowProps {
  step: "mfa" | "enroll" | "reenroll" | "backupCodes" | "finalMfa";
  setStep: React.Dispatch<React.SetStateAction<"login" | "mfa" | "enroll" | "reenroll" | "backupCodes" | "finalMfa">>;
  tempToken: string | null;
}

export default function MfaFlow({ step, setStep, tempToken }: MfaFlowProps) {
  const [otp, setOtp] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [showBackupInput, setShowBackupInput] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("token", res.data.access_token);
      
      let actualRole = "student";
      try {
        const checkRes = await fetch(`${import.meta.env.VITE_API_URL}/student/me`, {
          headers: { Authorization: `Bearer ${res.data.access_token}` }
        });
        if (!checkRes.ok) {
          actualRole = "guest";
        }
      } catch (err) {
        actualRole = "guest";
      }

      localStorage.setItem("userRole", actualRole);
      localStorage.setItem("role", actualRole);
      
      setSuccess("Login successful!");
      setTimeout(() => {
        if (actualRole === "guest") {
          navigate("/guest");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

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

  const handleFinalMfaLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !tempToken) return;
 
    setLoading(true);
    setError("");
 
    try {
      const res = await authApi.verifyMfa({ temp_token: tempToken, code: otp });
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("token", res.data.access_token);
      
      let actualRole = "student";
      try {
        const checkRes = await fetch(`${import.meta.env.VITE_API_URL}/student/me`, {
          headers: { Authorization: `Bearer ${res.data.access_token}` }
        });
        if (!checkRes.ok) {
          actualRole = "guest";
        }
      } catch (err) {
        actualRole = "guest";
      }

      localStorage.setItem("userRole", actualRole);
      localStorage.setItem("role", actualRole);

      setSuccess("Welcome back!");
      setTimeout(() => {
        if (actualRole === "guest") {
          navigate("/guest");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-medium rounded-lg text-white"
          >
            Verify
          </Button>
        </form>
      )}

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
            className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium rounded-lg text-white"
          >
            Verify Setup
          </Button>
        </form>
      )}

      {step === "finalMfa" && (
        <form onSubmit={handleFinalMfaLogin} className="space-y-6 text-center">
          <Shield className="w-12 h-12 text-green-600 mx-auto" />
          <h3 className="text-xl font-bold text-green-700">You're all set!</h3>
          
          {backupCodes.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-left">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h4 className="font-semibold text-amber-800 text-sm">Save your backup codes!</h4>
              </div>
              <p className="text-xs text-amber-700 mb-3">
                These codes can be used to log in if you lose access to your authenticator app. 
                Keep them somewhere safe. They will only be shown once.
              </p>
              <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-amber-100">
                {backupCodes.map((code, index) => (
                  <div key={index} className="font-mono text-xs text-gray-800 text-center py-1 bg-gray-50 rounded">
                    {code}
                  </div>
                ))}
              </div>
              <Button 
                type="button" 
                onClick={() => {
                  const codesText = backupCodes.join('\n');
                  const blob = new Blob([codesText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'lauratek_backup_codes.txt';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="mt-3 w-full h-8 text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 border-none shadow-none"
              >
                Download Codes
              </Button>
            </div>
          )}

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
            className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium rounded-lg text-white"
          >
            Complete Login
          </Button>
        </form>
      )}
    </>
  );
}
