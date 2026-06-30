import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";

interface PasswordSecuritySettingsProps {
  oldPassword: string;
  setOldPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showOldPassword: boolean;
  setShowOldPassword: (val: boolean) => void;
  showNewPassword: boolean;
  setShowNewPassword: (val: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (val: boolean) => void;
  changingPassword: boolean;
  handleChangePassword: () => void;
  passwordMessage: string | null;
  passwordError: string | null;
}

const PasswordSecuritySettings: React.FC<PasswordSecuritySettingsProps> = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showOldPassword,
  setShowOldPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  changingPassword,
  handleChangePassword,
  passwordMessage,
  passwordError,
}) => {
  return (
    <div className="space-y-10 max-w-3xl">
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <LockKeyhole className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          <h3 className="text-base sm:text-lg font-semibold">Change Password</h3>
        </div>

        <div className="grid gap-4 sm:gap-5 max-w-md w-full">
          <div>
            <Label>Current Password</Label>
            <div className="relative mt-1.5">
              <Input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <Label>New Password</Label>
            <div className="relative mt-1.5">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <Label>Confirm New Password</Label>
            <div className="relative mt-1.5">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={handleChangePassword}
              disabled={changingPassword || !oldPassword || !newPassword}
              className="bg-[#5556EC] hover:bg-[#5556EC]/90 shadow-[0px_4.94px_7.4px_-4.94px_#2B7FFF4D]"
            >
              {changingPassword ? "Changing..." : "Update Password"}
            </Button>
          </div>

          {passwordMessage && (
            <p className="text-green-600 text-sm">{passwordMessage}</p>
          )}
          {passwordError && (
            <p className="text-red-600 text-sm">{passwordError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordSecuritySettings;
