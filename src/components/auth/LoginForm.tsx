import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import authApi from "@/api/authApi";
import guestApi from "@/api/guestApi";
import { VITE_API_URL } from "@/services/api/api";

interface LoginFormProps {
  onMfaRequired: (token: string) => void;
  onNavigateSignup: () => void;
  onNavigateForgot: () => void;
}

export default function LoginForm({ onMfaRequired, onNavigateSignup, onNavigateForgot }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
 
    try {
      let res;
      try {
        res = await authApi.login({ email, password });
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 404) {
          res = await guestApi.login({ email, password });
        } else {
          throw err;
        }
      }
      const data = res.data;
 
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token", data.access_token);
        
        let actualRole = "student";
        try {
          const checkRes = await fetch(`${VITE_API_URL}/student/me`, {
            headers: { Authorization: `Bearer ${data.access_token}` }
          });
          if (!checkRes.ok) {
            actualRole = "guest";
          }
        } catch (err) {
          actualRole = "guest";
        }
        
        localStorage.setItem("userRole", actualRole);
        localStorage.setItem("role", actualRole);
        setTimeout(() => {
          if (actualRole === "guest") {
            navigate("/guest");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
        return;
      }
 
      if (data.temp_token) {
        onMfaRequired(data.temp_token);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Login</h1>
        <p className="text-gray-500 text-sm">Enter your credentials to login your account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
        <div className="space-y-1.5">
          <Label className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '19.96px', lineHeight: '100%' }}>Email <span className="text-red-500" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '19.96px', lineHeight: '100%' }}>*</span></Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="off"
            className="h-10 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '19.96px', lineHeight: '100%' }}>Password <span className="text-red-500" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '19.96px', lineHeight: '100%' }}>*</span></Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              maxLength={30}
              required
              autoComplete="new-password"
              className="h-10 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <div className="text-right">
          <button 
            type="button" 
            onClick={onNavigateForgot} 
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          {loading ? "Loading..." : "Login"}
        </Button>

        <p className="text-center text-xs text-gray-600 pt-2">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onNavigateSignup}
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
