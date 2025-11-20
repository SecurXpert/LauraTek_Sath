

// // src/services/apiServices.js

// // Works with Vite (import.meta.env) or falls back to the hardcoded IP.
// const BASE_URL =
//   (typeof import.meta !== 'undefined' &&
//     import.meta.env &&
//     import.meta.env.VITE_API_BASE_URL) ||
//   'http://192.168.0.103:8000';

// const getHeaders = (includeToken = false) => {
//   const headers = { 'Content-Type': 'application/json' };
//   if (includeToken) {
//     const token = localStorage.getItem('access_token');
//     if (token) headers['Authorization'] = `Bearer ${token}`;
//   }
//   return headers;
// };

// const fetchWithAuth = async (url, options = {}) => {
//   try {
//     const response = await fetch(url, options);

//     if (response.status === 401) {
//       console.warn('Unauthorized - signing out');
//       localStorage.removeItem('access_token');
//       window.location.href = '/';
//       throw new Error('Unauthorized access - please log in again');
//     }

//     if (!response.ok) {
//       const errText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errText}`);
//     }

//     if (response.status === 204) return null;
//     return await response.json();
//   } catch (err) {
//     console.error('fetchWithAuth error:', err);
//     throw err;
//   }
// };

// /* -------------------------
//    Authentication / MFA API
//    -------------------------*/

// /**
//  * Primary login endpoint.
//  * - Backend may respond with:
//  *   { access_token: "..." }           // direct login
//  *   { mfa_required: true, temp_token: "..." } // needs MFA
//  *   { mfa_not_enabled: true, temp_token: "...", qr_hint: "..."} // if flow differs
//  */
// export async function login(userData) {
//   try {
//     const res = await fetch(`${BASE_URL}/student/login`, {
//       method: 'POST',
//       headers: getHeaders(false),
//       body: JSON.stringify(userData),
//     });

//     const status = res.status;
//     let data;
//     try {
//       data = await res.json();
//     } catch {
//       const text = await res.text();
//       data = { message: text || `HTTP ${status}` };
//     }
//     return { success: res.ok, status, ...data };
//   } catch (err) {
//     console.error('Network/login error:', err);
//     return { success: false, status: 0, message: 'Network error. Please try again.' };
//   }
// }

// /**
//  * Verify login MFA code (used to finish login when mfa_required was returned)
//  * Endpoint: POST /mfa/verify-login
//  * Payload: { temp_token, code }
//  * Response: { access_token: "..." }
//  */
// export async function verifyLoginMfa(payload) {
//   try {
//     const res = await fetch(`${BASE_URL}/mfa/verify-login`, {
//       method: 'POST',
//       headers: getHeaders(false),
//       body: JSON.stringify(payload),
//     });

//     const status = res.status;
//     let data;
//     try {
//       data = await res.json();
//     } catch {
//       const text = await res.text();
//       data = { message: text || `HTTP ${status}` };
//     }
//     return { success: res.ok, status, ...data };
//   } catch (err) {
//     console.error('Network/verifyLoginMfa error:', err);
//     return { success: false, status: 0, message: 'Network error. Please try again.' };
//   }
// }

// /**
//  * Start 2FA enrollment (server will generate temp_token + possibly QR data)
//  * Endpoint: POST /mfa/enroll/start
//  * Payload may be { email } or { } depending on API; we pass what caller provides.
//  * Response commonly: { temp_token: "...", message: "...", maybe other fields }
//  */
// export async function enrollStart(payload = {}) {
//   try {
//     const res = await fetch(`${BASE_URL}/mfa/enroll/start`, {
//       method: 'POST',
//       headers: getHeaders(false),
//       body: JSON.stringify(payload),
//     });

//     const status = res.status;
//     let data;
//     try {
//       data = await res.json();
//     } catch {
//       const text = await res.text();
//       data = { message: text || `HTTP ${status}` };
//     }
//     return { success: res.ok, status, ...data };
//   } catch (err) {
//     console.error('Network/enrollStart error:', err);
//     return { success: false, status: 0, message: 'Network error. Please try again.' };
//   }
// }

// /**
//  * Get enroll QR image/data.
//  * Endpoint: GET /mfa/enroll/qr?temp_token=...
//  * Returns JSON or image data (depends on backend). We'll assume JSON: { qr_image: "data:image/png;base64,..." }
//  */
// export async function enrollQr(tempToken) {
//   try {
//     // append temp token as query param
//     const url = `${BASE_URL}/mfa/enroll/qr?temp_token=${encodeURIComponent(tempToken)}`;
//     const res = await fetch(url, {
//       method: 'GET',
//       headers: getHeaders(false),
//     });

//     const status = res.status;
//     let data;
//     // try parse JSON (server likely returns JSON containing qr_image)
//     try {
//       data = await res.json();
//     } catch {
//       const text = await res.text();
//       data = { message: text || `HTTP ${status}` };
//     }
//     return { success: res.ok, status, ...data };
//   } catch (err) {
//     console.error('Network/enrollQr error:', err);
//     return { success: false, status: 0, message: 'Network error. Please try again.' };
//   }
// }

// /**
//  * Verify enrollment (confirm code shown in authenticator after scanning QR)
//  * Endpoint: POST /mfa/enroll/verify
//  * Payload: { temp_token, code }
//  * Response: { success: true, message: "...", maybe access_token if server logs in user }
//  */
// export async function enrollVerify(payload) {
//   try {
//     const res = await fetch(`${BASE_URL}/mfa/enroll/verify`, {
//       method: 'POST',
//       headers: getHeaders(false),
//       body: JSON.stringify(payload),
//     });

//     const status = res.status;
//     let data;
//     try {
//       data = await res.json();
//     } catch {
//       const text = await res.text();
//       data = { message: text || `HTTP ${status}` };
//     }
//     return { success: res.ok, status, ...data };
//   } catch (err) {
//     console.error('Network/enrollVerify error:', err);
//     return { success: false, status: 0, message: 'Network error. Please try again.' };
//   }
// }

// /**
//  * Resend MFA / re-start enrollment or resend OTP
//  * We use enrollStart to re-issue the temp_token (server should support this)
//  */
// export async function resendMfa(payload = {}) {
//   // same as enrollStart - server decides if it sends OTP or QR again
//   return enrollStart(payload);
// }

// /* -------------------------
//    Other existing APIs (unchanged)
//    -------------------------*/

// export async function registerGuest(userData) {
//   return fetchWithAuth(`${BASE_URL}/guest/register`, {
//     method: 'POST',
//     headers: getHeaders(),
//     body: JSON.stringify(userData),
//   });
// }

// export async function ContactUs(userData) {
//   return fetchWithAuth(`${BASE_URL}/enrollments/submit`, {
//     method: 'POST',
//     headers: getHeaders(),
//     body: JSON.stringify(userData),
//   });
// }

// export async function Getquizes(quizTitle) {
//   return fetchWithAuth(`${BASE_URL}/guest/quiz/${encodeURIComponent(quizTitle)}`, {
//     method: 'GET',
//     headers: getHeaders(true),
//   });
// }

// export async function PunchIn(data = {}) {
//   return fetchWithAuth(`${BASE_URL}/guest/attendance/check-in`, {
//     method: 'POST',
//     headers: getHeaders(true),
//     body: JSON.stringify(data),
//   });
// }

// export async function PunchOut(data = {}) {
//   return fetchWithAuth(`${BASE_URL}/guest/attendance/check-out`, {
//     method: 'PUT',
//     headers: getHeaders(true),
//     body: JSON.stringify(data),
//   });
// }

// export async function Getattendance() {
//   return fetchWithAuth(`${BASE_URL}/guest/attendance/my-attendance`, {
//     method: 'GET',
//     headers: getHeaders(true),
//   });
// }

// export async function GetQuizResult() {
//   return fetchWithAuth(`${BASE_URL}/guest/results`, {
//     method: 'GET',
//     headers: getHeaders(true),
//   });
// }

// export async function getjobs() {
//   return fetchWithAuth(`${BASE_URL}/company`, {
//     method: 'GET',
//     headers: getHeaders(true),
//   });
// }

// export async function getProfile() {
//   return fetchWithAuth(`${BASE_URL}/guest/my-profile`, {
//     method: 'GET',
//     headers: getHeaders(true),
//   });
// }

// export async function submitQuiz(payload) {
//   return fetchWithAuth(`${BASE_URL}/guest/submit`, {
//     method: 'POST',
//     headers: getHeaders(true),
//     body: JSON.stringify(payload),
//   });
// }

// export async function getquizes() {
//   return fetchWithAuth(`${BASE_URL}/admin/guest-quiz/guest/`, {
//     method: 'GET',
//     headers: getHeaders(true),
//   });
// }



// apiservices.js
const BASE_URL =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  'http://192.168.0.105:8000';

const getHeaders = (includeToken = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeToken) {
    const token = localStorage.getItem('access_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const fetchWithAuth = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 401) {
      console.warn('Unauthorized - signing out');
      localStorage.removeItem('access_token');
      window.location.href = '/';
      throw new Error('Unauthorized');
    }
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }
    if (response.status === 204) return null;
    return await response.json();
  } catch (err) {
    console.error('fetchWithAuth error:', err);
    throw err;
  }
};

/* ========================
   AUTH & MFA APIs (Fixed)
   ======================== */

export async function login(userData) {
  try {
    const res = await fetch(`${BASE_URL}/student/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: await res.text() };
    }
    return { success: res.ok, ...data };
  } catch (err) {
    return { success: false, message: 'Network error' };
  }
}

export async function verifyLoginMfa(payload) {
  try {
    const res = await fetch(`${BASE_URL}/mfa/verify-login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(payload),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: await res.text() };
    }
    return { success: res.ok, ...data };
  } catch (err) {
    return { success: false, message: 'Network error' };
  }
}

export async function enrollStart(payload = {}) {
  try {
    const res = await fetch(`${BASE_URL}/mfa/enroll/start`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(payload),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: await res.text() };
    }
    return { success: res.ok, ...data };
  } catch (err) {
    return { success: false, message: 'Failed to start enrollment' };
  }
}

export async function enrollQr(tempToken) {
  try {
    const url = `${BASE_URL}/mfa/enroll/qr?token=${encodeURIComponent(tempToken)}`;
    const res = await fetch(url, { headers: { Accept: 'image/png' } });
    if (!res.ok) throw new Error('QR load failed');
    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    return { success: true, qr_image: imageUrl };
  } catch (err) {
    return { success: false, message: 'Failed to load QR code' };
  }
}

// Re-enroll after using backup code
export async function reenrollStart(token, current_code) {
  try {
    const res = await fetch(`${BASE_URL}/mfa/re-enroll/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, current_code }),
    });
    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.detail || 'Invalid backup code' };
    }
    return { success: true, ...(await res.json()) };
  } catch (err) {
    return { success: false, error: 'Network error' };
  }
}

export async function reenrollQr(token) {
  try {
    const res = await fetch(`${BASE_URL}/mfa/re-enroll/qr?token=${token}`);
    if (!res.ok) throw new Error('Failed');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Generic verify for both enroll and re-enroll
export async function verifyMfaCode(token, code, isReenroll = false) {
  const endpoint = isReenroll ? '/mfa/re-enroll/verify' : '/mfa/enroll/verify';
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, data: { code } }),
    });
    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.detail || 'Invalid code' };
    }
    return { success: true, ...(await res.json()) };
  } catch (err) {
    return { success: false, error: 'Network error' };
  }
}

/* ========================
   Other APIs (unchanged)
   ======================== */

export async function registerGuest(userData) {
  return fetchWithAuth(`${BASE_URL}/guest/register`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(userData),
  });
}

export async function ContactUs(userData) {
  return fetchWithAuth(`${BASE_URL}/enrollments/submit`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(userData),
  });
}
 
export async function Getquizes(quizTitle) {
  return fetchWithAuth(`${BASE_URL}/guest/quiz/${encodeURIComponent(quizTitle)}`, {
    method: 'GET',
    headers: getHeaders(true),
  });
}
 
export async function PunchIn(data = {}) {
  return fetchWithAuth(`${BASE_URL}/guest/attendance/check-in`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  });
}
 
export async function PunchOut(data = {}) {
  return fetchWithAuth(`${BASE_URL}/guest/attendance/check-out`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  });
}
 
export async function Getattendance() {
  return fetchWithAuth(`${BASE_URL}/guest/attendance/my-attendance`, {
    method: 'GET',
    headers: getHeaders(true),
  });
}
 
export async function GetQuizResult() {
  return fetchWithAuth(`${BASE_URL}/guest/results`, {
    method: 'GET',
    headers: getHeaders(true),
  });
}
 
export async function getjobs() {
  return fetchWithAuth(`${BASE_URL}/company`, {
    method: 'GET',
    headers: getHeaders(true),
  });
}
 
export async function getProfile() {
  return fetchWithAuth(`${BASE_URL}/guest/my-profile`, {
    method: 'GET',
    headers: getHeaders(true),
  });
}
 
export async function submitQuiz(payload) {
  return fetchWithAuth(`${BASE_URL}/guest/submit`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  });
}
 
export async function getquizes() {
  return fetchWithAuth(`${BASE_URL}/admin/guest-quiz/guest/`, {
    method: 'GET',
    headers: getHeaders(true),
  });
}