import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://192.168.0.100:8000";

interface QrData {
  otpAuthUrl: string;
  email: string;
}

export const useStudentMfaLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [step, setStep] = useState<
    "login" | "setup" | "enable-mfa" | "login-mfa"
  >("login");

  const [tempToken, setTempToken] = useState("");
  const [qrData, setQrData] = useState<QrData | null>(null);

  const navigate = useNavigate();

  const getTokenPayload = (token: string) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  // Step 1: Initial Login
  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE}/student/login`, {
        email,
        password,
      });

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        const payload = getTokenPayload(data.access_token);
        if (payload?.role === "student") navigate("/dashboard");
        return;
      }

      if (data.mfa_required && data.temp_token) {
        setTempToken(data.temp_token);
        if (data.mfa_enrolled) {
          setStep("login-mfa");
        } else {
          await startMfaSetup(data.temp_token);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Generate QR
  const startMfaSetup = async (token: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/mfa/enroll/start`,
        { token },
        { headers: { "Content-Type": "application/json" } }
      );
      setQrData({ otpAuthUrl: data.otpauth_uri, email: data.email });
      setStep("setup"); // This triggers QR screen
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Enable MFA
  const handleEnableMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6) {
      setError("Enter 6-digit code");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_BASE}/mfa/enroll/verify`,
        { data: { code: totpCode }, token: tempToken },
        { headers: { "Content-Type": "application/json" } }
      );
      setStep("login-mfa"); // This moves to final login
      setTotpCode(""); // Clear input
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Final Login
  const handleLoginWithMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/mfa/verify-login`,
        { temp_token: tempToken, code: totpCode },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("access_token", data.access_token);
      const payload = getTokenPayload(data.access_token);
      if (payload?.role === "student") navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("login");
    setTempToken("");
    setQrData(null);
    setTotpCode("");
    setError("");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    totpCode,
    setTotpCode,
    loading,
    error,
    step,
    setStep, // THIS IS THE KEY: expose setStep
    qrData,
    handleInitialLogin,
    handleEnableMfa,
    handleLoginWithMfa,
    reset,
  };
};
