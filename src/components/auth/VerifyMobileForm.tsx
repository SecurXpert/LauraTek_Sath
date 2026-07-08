import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import guestApi from "@/api/guestApi";

interface VerifyMobileFormProps {
  mobile: string;
  setMobile: (val: string) => void;
  onVerified: () => void;
  onBackToLogin: () => void;
}

export default function VerifyMobileForm({ mobile, setMobile, onVerified, onBackToLogin }: VerifyMobileFormProps) {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
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
      onVerified();
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

  return (
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
  );
}
