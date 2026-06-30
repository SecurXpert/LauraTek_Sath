import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/techlogo.png";
import mainImage from "@/assets/userside.png";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import MfaFlow from "@/components/auth/MfaFlow";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [view, setView] = useState<"login" | "signup" | "forgot">(location.state?.view || "login");
  const [step, setStep] = useState<"login" | "mfa" | "enroll" | "reenroll" | "backupCodes" | "finalMfa">("login");
  const [tempToken, setTempToken] = useState<string | null>(null);

  const handleMfaRequired = (token: string) => {
    setTempToken(token);
    setStep("mfa");
  };

  const handleBack = () => {
    if (view === "signup" || view === "forgot") {
      setView("login");
      setStep("login");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-white">
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
        <div className="w-full md:w-1/2 bg-white flex flex-col h-full overflow-y-auto">
          {/* Header with Logo and Back button */}
          <div className="flex items-center justify-between px-8 pt-6 pb-4">
            <img src={logo} alt="LAURATEK" className="h-8" />
            <button
              type="button"
              onClick={handleBack}
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
                <LoginForm 
                  onMfaRequired={handleMfaRequired} 
                  onNavigateSignup={() => setView("signup")}
                  onNavigateForgot={() => setView("forgot")}
                />
              )}
 
              {/* FORGOT PASSWORD VIEW */}
              {view === "forgot" && (
                <ForgotPasswordForm onBackToLogin={() => setView("login")} />
              )}
 
              {/* SIGNUP / MOBILE VERIFICATION VIEW */}
              {view === "signup" && (
                <SignupForm onBackToLogin={() => setView("login")} />
              )}
 
              {/* MFA / ENROLLMENT VIEWS */}
              {step !== "login" && (
                <MfaFlow 
                  step={step} 
                  setStep={setStep} 
                  tempToken={tempToken} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
