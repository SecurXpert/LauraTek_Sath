import React, { useState } from "react";
import VerifyMobileForm from "./VerifyMobileForm";
import RegistrationDetailsForm from "./RegistrationDetailsForm";

interface SignupFormProps {
  onBackToLogin: () => void;
}

export default function SignupForm({ onBackToLogin }: SignupFormProps) {
  const [mobile, setMobile] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <div className="w-full max-w-sm">
      {!otpVerified ? (
        <VerifyMobileForm
          mobile={mobile}
          setMobile={setMobile}
          onVerified={() => setOtpVerified(true)}
          onBackToLogin={onBackToLogin}
        />
      ) : (
        <RegistrationDetailsForm
          mobile={mobile}
          onBackToLogin={onBackToLogin}
        />
      )}
    </div>
  );
}
