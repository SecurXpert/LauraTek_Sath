// src/services/authService.ts
import api from './api';

export const sendOtp = async (phone: string, purpose?: string) => {
  const response = await api.post('/guest/send_otp', null, {
    params: { phone, purpose }
  });
  return response.data;
};

export const verifyOtp = async (phone: string, otp_code: string, purpose?: string) => {
  const response = await api.post('/guest/verify_otp', null, {
    params: { phone, otp_code, purpose }
  });
  return response.data;
};

export const forgotSendOtp = async (phone: string) => {
  const response = await api.post('/guest/forgot/send_otp', null, {
    params: { phone }
  });
  return response.data;
};

export const forgotVerifyOtp = async (phone: string, otp_code: string) => {
  const response = await api.post('/guest/forgot/verify_otp', null, {
    params: { phone, otp_code }
  });
  return response.data;
};

export const forgotReset = async (phone: string, new_password: string) => {
  const response = await api.post('/guest/forgot/reset', null, {
    params: { phone, new_password }
  });
  return response.data;
};

export const studentForgotSendOtp = async (phone: string) => {
  const response = await api.post('/guest/student/forgot/send_otp', null, {
    params: { phone }
  });
  return response.data;
};

export const studentForgotVerifyOtp = async (phone: string, otp_code: string) => {
  const response = await api.post('/guest/student/forgot/verify_otp', null, {
    params: { phone, otp_code }
  });
  return response.data;
};

export const studentForgotReset = async (phone: string, new_password: string) => {
  const response = await api.post('/guest/student/forgot/reset', null, {
    params: { phone, new_password }
  });
  return response.data;
};

export const registerGuest = async (data: any) => {
  const response = await api.post('/guest/register', data);
  return response.data;
};
