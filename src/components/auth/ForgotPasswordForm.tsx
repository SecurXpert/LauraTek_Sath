import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import guestApi from "@/api/guestApi";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetRole, setResetRole] = useState<"student" | "guest">("student");
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(180);
  const [maskedMobile, setMaskedMobile] = useState("");
  
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10 || !newPassword) {
      setError("Please fill in all fields correctly");
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 30) {
      setError("Password must be between 8 and 30 characters");
      return;
    }
    if (!/(?=.*[a-z])/.test(newPassword) || 
        !/(?=.*[A-Z])/.test(newPassword) || 
        !/(?=.*\d)/.test(newPassword) || 
        !/(?=.*[^a-zA-Z\d\s])/.test(newPassword)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
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
        onBackToLogin();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 w-full max-w-sm">
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
                onClick={onBackToLogin}
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
                onClick={onBackToLogin}
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
                maxLength={30}
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
              onClick={onBackToLogin}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
