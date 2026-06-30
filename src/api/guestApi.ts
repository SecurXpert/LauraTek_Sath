// src/api/guestApi.ts
import api from "./instance";

export type SendOtpParams = {
  phone: string;
  purpose: string;
};

export type VerifyOtpParams = {
  phone: string;
  otp_code: string;
  purpose: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  country?: string;
  state: string;
  city: string;
  educational_status?: string | null;
  qualification?: string | null;
  passedout_year?: string | null;
  interest?: string | null;
  password: string;
};

const guestApi = {
  sendOtp: (params: SendOtpParams) =>
    api.post("/guest/send_otp", null, { params }),

  verifyOtp: (params: VerifyOtpParams) =>
    api.post("/guest/verify_otp", null, { params }),

  login: (credentials: { email: string; password: string }) =>
    api.post("/student/login", credentials),

  register: (payload: RegisterPayload) =>
    api.post("/guest/register", payload),

  forgotSendOtp: (params: { phone: string }) =>
    api.post("/guest/forgot/send_otp", null, { params }),

  forgotVerifyOtp: (params: { phone: string; otp_code: string }) =>
    api.post("/guest/forgot/verify_otp", null, { params }),

  forgotReset: (params: { phone: string; new_password: string }) =>
    api.post("/guest/forgot/reset", null, { params }),

  studentForgotSendOtp: (params: { phone: string }) =>
    api.post("/guest/student/forgot/send_otp", null, { params }),

  studentForgotVerifyOtp: (params: { phone: string; otp_code: string }) =>
    api.post("/guest/student/forgot/verify_otp", null, { params }),

  studentForgotReset: (params: { phone: string; new_password: string }) =>
    api.post("/guest/student/forgot/reset", null, { params }),
};

export default guestApi;
