// src/services/auth.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// ---------------------------------------------------------------------------
// 1. Axios instance (base URL from .env – adjust if needed)
// ---------------------------------------------------------------------------
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.0.103:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ---------------------------------------------------------------------------
// 2. Helper – attach Bearer token if present
// ---------------------------------------------------------------------------
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// 3. JWT payload decoder (no external libs)
// ---------------------------------------------------------------------------
export interface JWTPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
  // …any other claims your backend adds
}

export const getTokenPayload = (token: string): JWTPayload | null => {
  try {
    const base64 = token.split('.')[1];
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------------------
// 4. Login – returns { access_token, token_type } + MFA flag
// ---------------------------------------------------------------------------
interface LoginResponse {
  access_token: string;
  token_type: string;
  mfa_required?: boolean;
  temp_token?: string; // only when MFA is required
}

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const res: AxiosResponse<LoginResponse> = await api.post(
    '/student/login',
    credentials
  );
  return res.data;
};

// ---------------------------------------------------------------------------
// 5. MFA – Start enrolment (creates secret + otpauth URL)
// ---------------------------------------------------------------------------
interface MfaStartResponse {
  otpauth_url: string; // e.g. otpauth://totp/...
}

export const mfaStart = async (tempToken: string): Promise<MfaStartResponse> => {
  const res: AxiosResponse<MfaStartResponse> = await api.post('/mfa/enroll/start', {
    token: tempToken,
  });
  return res.data;
};

// ---------------------------------------------------------------------------
// 6. MFA – Verify TOTP code & finish enrolment
// ---------------------------------------------------------------------------
interface MfaVerifyRequest {
  code: string;   // 6-digit TOTP
  token: string;  // temp_token from login or start
}

interface MfaVerifyResponse {
  access_token: string;
  backup_codes: string[];
}

export const mfaVerify = async (
  data: MfaVerifyRequest
): Promise<MfaVerifyResponse> => {
  const res: AxiosResponse<MfaVerifyResponse> = await api.post(
    '/mfa/enroll/verify',
    data
  );
  return res.data;
};

// ---------------------------------------------------------------------------
// 7. MFA – Rotate backup codes
// ---------------------------------------------------------------------------
interface MfaRotateResponse {
  new_backup_codes: string[];
}

export const mfaRotateBackup = async (token: string): Promise<MfaRotateResponse> => {
  const res: AxiosResponse<MfaRotateResponse> = await api.post(
    '/mfa/backup/rotate',
    { token }
  );
  return res.data;
};

// ---------------------------------------------------------------------------
// 8. MFA – Get current QR (PNG)
// ---------------------------------------------------------------------------
export const mfaGetQr = async (token: string): Promise<Blob> => {
  const res = await api.get(`/mfa/enroll/qr?token=${encodeURIComponent(token)}`, {
    responseType: 'blob',
  });
  return res.data;
};

// ---------------------------------------------------------------------------
// 9. MFA – Disable
// ---------------------------------------------------------------------------
interface MfaDisableRequest {
  code: string;
  token: string;
}

export const mfaDisable = async (data: MfaDisableRequest): Promise<void> => {
  await api.post('/mfa/disable', data);
};

// ---------------------------------------------------------------------------
// 10. Optional: Full login flow (login → MFA if required) – easy to call from UI
// ---------------------------------------------------------------------------
export const loginWithMfa = async (
  email: string,
  password: string,
  totpCode?: string
): Promise<{
  access_token: string;
  backup_codes?: string[];
}> => {
  // 1. Normal login
  const loginRes = await login({ email, password });

  // No MFA → done
  if (!loginRes.mfa_required) {
    return { access_token: loginRes.access_token };
  }

  // 2. MFA required – user must provide TOTP now
  if (!totpCode) {
    throw new Error('MFA_REQUIRED');
  }

  // 3. Verify TOTP (temp_token comes from login response)
  const verifyRes = await mfaVerify({
    code: totpCode,
    token: loginRes.temp_token!,
  });

  return {
    access_token: verifyRes.access_token,
    backup_codes: verifyRes.backup_codes,
  };
};