// src/pages/ProfilePage.tsx
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Calendar, MapPin, Briefcase, Globe, Linkedin, Instagram, Twitter, Facebook } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Profile Edit</h1>
        <p className="text-sm opacity-90">Get a chance to change your profile.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Avatar + Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Avatar className="w-32 h-32 mx-auto ring-4 ring-blue-100">
              <AvatarImage src="/assets/profile-avatar.jpg" />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                MB
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-bold">Mr. Beems</h2>
            <p className="text-gray-600">Sr. Designer</p>
            <p className="text-sm text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur. Pulvinar Donec Quam Tortor sit sit, Nulla Feugiat Senectus in Consectetur.
            </p>

            <div className="mt-6">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Web Design</Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Graphic Design</Badge>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">MEMBER SINCE DECEMBER 12, 2020</p>
          </div>
        </div>

        {/* Right: Form Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {["My Account", "Password & Security", "Messages"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    tab === "My Account"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* My Profile */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">My Profile</h3>

                <div>
                  <Label>First Name</Label>
                  <Input defaultValue="Mr. Beems" />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input defaultValue="+04 1234 5678" />
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input defaultValue="07/05/1987" />
                </div>

                <div>
                  <Label>Designer</Label>
                  <Input defaultValue="Skills" />
                </div>
              </div>

              {/* Job Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Job</h3>

                <div>
                  <Label>Last Name</Label>
                  <Input defaultValue="Jok" />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input defaultValue="beems76@gmail.com" />
                </div>

                <div>
                  <Label>Gender</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="gender" defaultChecked className="text-blue-600" />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="gender" className="text-blue-600" />
                      <span>Female</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="gender" className="text-blue-600" />
                      <span>Other (Not to Say)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label>Sr.UI/UX Designer</Label>
                  <Input defaultValue="Web Design" />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600" /> Facebook Link
                  </Label>
                  <Input defaultValue="https://www.facebook.net/beems" />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn Link
                  </Label>
                  <Input defaultValue="https://www.linkedin.net/beems" />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-blue-600" /> Twitter Link
                  </Label>
                  <Input defaultValue="https://www.twitter.net/beems" />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600" /> Instagram Link
                  </Label>
                  <Input defaultValue="https://www.instagram.net/beems" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;