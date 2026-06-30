import { useState, useRef, useEffect } from "react";
import { Lock, Eye, Bell, Shield, Smartphone, Monitor, Menu, X } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Profileheader from "@/components/ui/Profileheader";

const Toggle = ({ checked, onChange }: { checked: boolean; onChange?: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
      checked ? "bg-blue-500" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </button>
);

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileVisibility, setProfileVisibility] = useState("Everyone");
  
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    assignmentReminders: true,
    classReminders: true,
    weeklyDigest: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gray-50 overflow-hidden">
      <div ref={sidebarRef}>
        <Sidebar sidebarOpen={sidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Profileheader />



        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 lg:pl-8">
          <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account preferences and settings</p>
        </div>

        {/* Password & Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Password & Security</h2>
              <p className="text-sm text-gray-500">Update your password and security settings</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={handleChangePassword}
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Privacy Settings</h2>
              <p className="text-sm text-gray-500">Control your privacy preferences</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                <p className="text-sm text-gray-500">Who can view your profile</p>
              </div>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>Everyone</option>
                <option>Friends Only</option>
                <option>Only Me</option>
              </select>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Data Sharing</h3>
                <p className="text-sm text-gray-500">Share anonymous analytics data</p>
              </div>
              <Toggle
                checked={privacy.dataSharing}
                onChange={() => setPrivacy({ ...privacy, dataSharing: !privacy.dataSharing })}
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Notification Preferences</h2>
              <p className="text-sm text-gray-500">Choose what notifications you receive</p>
            </div>
          </div>
          <div className="p-5 space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <Toggle
                checked={notifications.email}
                onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Get push notifications on your device</p>
              </div>
              <Toggle
                checked={notifications.push}
                onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Assignment Reminders</h3>
                <p className="text-sm text-gray-500">Remind me about upcoming assignments</p>
              </div>
              <Toggle
                checked={notifications.assignmentReminders}
                onChange={() => setNotifications({ ...notifications, assignmentReminders: !notifications.assignmentReminders })}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Class Reminders</h3>
                <p className="text-sm text-gray-500">Remind me before live classes</p>
              </div>
              <Toggle
                checked={notifications.classReminders}
                onChange={() => setNotifications({ ...notifications, classReminders: !notifications.classReminders })}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Weekly Digest</h3>
                <p className="text-sm text-gray-500">Receive a weekly summary email</p>
              </div>
              <Toggle
                checked={notifications.weeklyDigest}
                onChange={() => setNotifications({ ...notifications, weeklyDigest: !notifications.weeklyDigest })}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-gray-500">Advanced security options</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <Toggle
                checked={security.twoFactor}
                onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Login Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Chrome on MacOS</p>
                      <p className="text-xs text-gray-500">San Francisco, CA</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">Now</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Safari on iPhone</p>
                      <p className="text-xs text-gray-500">San Francisco, CA</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl border border-red-200">
          <div className="p-5 border-b border-red-100">
            <h2 className="font-semibold text-red-500">Danger Zone</h2>
            <p className="text-sm text-gray-500">Irreversible actions</p>
          </div>
          <div className="p-5 space-y-3">
            <button className="w-full py-3 px-4 border border-red-300 text-red-500 font-medium rounded-lg hover:bg-red-100 transition-colors">
              Deactivate Account
            </button>
            <button className="w-full py-3 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors">
              Delete Account Permanently
            </button>
          </div>
        </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

