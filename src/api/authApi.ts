// // src/api/authApi.ts
// import api from "./instance";

// export type LoginCredentials = {
//   email: string;
//   password: string;
// };

// export type VerifyMfaPayload = {
//   temp_token: string;
//   code: string;
// };

// export type ReEnrollStartPayload = {
//   token: string;
//   current_code: string;
// };

// const authApi = {
//   login: (credentials: LoginCredentials) =>
//     api.post("/student/login", credentials),

//   verifyMfa: (payload: VerifyMfaPayload) =>
//     api.post("/mfa/verify-login", payload),

//   startMfaEnrollment: (token: string) =>
//     api.post("/mfa/enroll/start", { token }),

//   getMfaQr: (token: string) =>
//     api.get(`/mfa/enroll/qr?token=${token}`, { responseType: "blob" }),

//   startReEnroll: (payload: ReEnrollStartPayload) =>
//     api.post("/mfa/re-enroll/start", payload),

//   getReEnrollQr: (token: string) =>
//     api.get(`/mfa/re-enroll/qr?token=${token}`, { responseType: "blob" }),

//   verifyReEnroll: (token: string, code: string) =>
//     api.post("/mfa/re-enroll/verify", { token, data: { code } }),
// };

// export default authApi;



// // src/api/authApi.ts
// import api from "./instance";

// export type LoginCredentials = {
//   email: string;
//   password: string;
// };

// export type VerifyMfaPayload = {
//   temp_token: string;
//   code: string;
// };

// export type ReEnrollStartPayload = {
//   token: string;
//   current_code: string;
// };

// const authApi = {
//   login: (credentials: LoginCredentials) =>
//     api.post("/student/login", credentials),

//   verifyMfa: (payload: VerifyMfaPayload) =>
//     api.post("/mfa/verify-login", payload),

//   // ← NEW: Same endpoint, but used after re-enroll to finally log in
//   verifyMfaAfterReEnroll: (payload: VerifyMfaPayload) =>
//     api.post("/mfa/verify-login", payload),

//   startMfaEnrollment: (token: string) =>
//     api.post("/mfa/enroll/start", { token }),

//   getMfaQr: (token: string) =>
//     api.get(`/mfa/enroll/qr?token=${token}`, { responseType: "blob" }),

//    verifyEnroll: (token: string, code: string) =>
//     api.post("/mfa/enroll/verify", { token, data: { code } }),

//   startReEnroll: (payload: ReEnrollStartPayload) =>
//     api.post("/mfa/re-enroll/start", payload),

//   getReEnrollQr: (token: string) =>
//     api.get(`/mfa/re-enroll/qr?token=${token}`, { responseType: "blob" }),

//   verifyReEnroll: (token: string, code: string) =>
//     api.post("/mfa/re-enroll/verify", { token, data: { code } }),
// };

// export default authApi;



// src/api/authApi.ts

// src/api/authApi.ts
import api from "./instance";

export type LoginCredentials = { email: string; password: string };
export type VerifyMfaPayload = { temp_token: string; code: string };
export type ReEnrollStartPayload = { token: string; current_code: string };

const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post("/student/login", credentials),

  verifyMfa: (payload: VerifyMfaPayload) =>
    api.post("/mfa/verify-login", payload),

  startMfaEnrollment: (token: string) =>
    api.post("/mfa/enroll/start", { token }),

  getMfaQr: (token: string) =>
    api.get(`/mfa/enroll/qr?token=${token}`, { responseType: "blob" }),

  verifyEnroll: (token: string, code: string) =>
    api.post("/mfa/enroll/verify", { token, data: { code } }),

  startReEnroll: (payload: ReEnrollStartPayload) =>
    api.post("/mfa/re-enroll/start", payload),

  getReEnrollQr: (token: string) =>
    api.get(`/mfa/re-enroll/qr?token=${token}`, { responseType: "blob" }),

  verifyReEnroll: (token: string, code: string) =>
    api.post("/mfa/re-enroll/verify", { token, data: { code } }),

  changePassword: (data: { current_password: string; new_password: string }) =>
    api.put("/student/change-password", data),
};

export default authApi;
