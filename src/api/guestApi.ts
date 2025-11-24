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

  register: (payload: RegisterPayload) =>
    api.post("/guest/register", payload),
};

export default guestApi;