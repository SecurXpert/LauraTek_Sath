// src/services/authService.ts
import api from './api';

export const sendOtp = async (phone: string) => {
  const response = await api.post('/guest/send-otp', { phone });
  return response.data;
};

export const verifyOtp = async (phone: string, otp: string) => {
  const response = await api.post('/guest/verify-otp', { phone, otp });
  return response.data;
};

export const registerGuest = async (data: any) => {
  const response = await api.post('/guest/register', data);
  return response.data;
};