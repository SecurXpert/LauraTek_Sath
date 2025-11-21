import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RegistrationDialog from "./ui/RegistrationDialog";
import SignInDialog from "./ui/SignInDialog";
import { useState, useEffect, useRef } from "react";
import techLogo from "@/assets/techlogo.png";
import logoImg from "@/assets/logo.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Menu, X, User, LogOut } from "lucide-react";
import { getProfile } from "../../src/services/apiservices";
 
interface ProfileData {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  educational_status: string;
  qualification: string;
  passedout_year: string;
  interest: string;
  state: string;
  city: string;
  created_at: string;
}
 
const Header = () => {
  const [regOpen, setRegOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  useEffect(() => {
    const checkToken = () => {
      setIsAuthenticated(!!localStorage.getItem("access_token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);
 
  useEffect(() => {
    if (profileOpen && isAuthenticated) {
      const fetchProfileData = async () => {
        setLoading(true);
        try {
          const data = await getProfile();
          setProfileData(data);
          setError(null);
        } catch (err: any) {
          setError(err.message || "Failed to fetch profile data");
          setProfileData(null);
        } finally {
          setLoading(false);
        }
      };
      fetchProfileData();
    }
  }, [profileOpen, isAuthenticated]);
 
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setIsProfileDropdownOpen(false);
    setProfileOpen(false);
    setIsMenuOpen(false);
    window.location.reload();
  };
 
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-12 2xs:h-12 xs:h-14 2sm:h-14 sm:h-16 md:h-16 md800:h-16 md900:h-16 lg:h-18 xl:h-18 2xl:h-20 3xl:h-20 flex items-center justify-between w-full max-w-[1920px] px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-4 md:px-4 md800:px-5 md900:px-5 lg:px-6 xl:px-8 2xl:px-10 3xl:px-12">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <img
              src={techLogo}
              alt="Main Logo"
              className="h-8 w-12 2xs:h-8 2xs:w-12 xs:h-9 xs:w-13 2sm:h-10 2sm:w-14 sm:h-10 sm:w-16 min-h-[2rem] min-w-[3rem]"
            />
          </Link>
          <button
            className="p-1 2xs:p-1 xs:p-1 2sm:p-2 sm:p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 2xs:h-5 2xs:w-5 xs:h-6 xs:w-6 2sm:h-6 2sm:w-6 sm:h-6 sm:w-6 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 2xs:h-5 2xs:w-5 xs:h-6 xs:w-6 2sm:h-6 2sm:w-6 sm:h-6 sm:w-6 text-foreground" />
            )}
          </button>
        </div>
 
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-12 w-full items-center gap-2 2xs:gap-2 xs:gap-3 2sm:gap-3 sm:gap-4 md:gap-4 md800:gap-5 md900:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-9">
          {/* Left Section: Main Logo */}
          <div className="col-span-3 flex items-center space-x-2 2xs:space-x-2 xs:space-x-3 2sm:space-x-3 sm:space-x-4 md:space-x-4 md800:space-x-5 md900:space-x-5 lg:space-x-6 xl:space-x-6 2xl:space-x-7 3xl:space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={techLogo}
                alt="Main Logo"
                className="h-10 w-14 2xs:h-10 2xs:w-14 xs:h-11 xs:w-15 2sm:h-12 2sm:w-16 sm:h-12 sm:w-16 md:h-13 md:w-18 md800:h-14 md800:w-19 md900:h-14 md900:w-20 lg:h-15 lg:w-22 xl:h-16 xl:w-24 2xl:h-18 2xl:w-26 3xl:h-20 3xl:w-28"
              />
            </Link>
          </div>
 
          {/* Center Section: Navigation */}
          <nav className="col-span-5 flex items-center justify-center space-x-3 2xs:space-x-3 xs:space-x-4 2sm:space-x-4 sm:space-x-5 md:space-x-5 md800:space-x-6 md900:space-x-7 lg:space-x-8 xl:space-x-9 2xl:space-x-10 3xl:space-x-12">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium text-[0.65rem] 2xs:text-[0.7rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-[0.9rem] xl:text-lg 2xl:text-xl 3xl:text-2xl"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-foreground hover:text-primary transition-colors font-medium text-[0.65rem] 2xs:text-[0.7rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-[0.9rem] xl:text-lg 2xl:text-xl 3xl:text-2xl"
            >
              Courses
            </Link>
            <Link
              to="/jobs"
              className="text-foreground hover:text-primary transition-colors font-medium text-[0.65rem] 2xs:text-[0.7rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-[0.9rem] xl:text-lg 2xl:text-xl 3xl:text-2xl"
            >
              Jobs
            </Link>
            <Link
              to="/success-stories"
              className="text-foreground hover:text-primary transition-colors font-medium text-[0.65rem] 2xs:text-[0.7rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-[0.9rem] xl:text-lg 2xl:text-xl 3xl:text-2xl"
            >
              Success Stories
            </Link>
            <Link
              to="/bootcamp"
              className="text-foreground hover:text-primary transition-colors font-medium text-[0.65rem] 2xs:text-[0.7rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-[0.9rem] xl:text-lg 2xl:text-xl 3xl:text-2xl"
            >
              BootCamp
            </Link>
          </nav>
 
          {/* Right Section: Company Logo, Profile/Sign Up */}
          <div className="col-span-4 flex items-center justify-end space-x-2 2xs:space-x-2 xs:space-x-3 2sm:space-x-3 sm:space-x-4 md:space-x-4 md800:space-x-5 md900:space-x-5 lg:space-x-6 xl:space-x-6 2xl:space-x-7 3xl:space-x-8">
            {/* COMPANY LOGO - UNIFORM WIDTH (w-10 on all breakpoints) */}
            <a href="https://securxperts.com/" target="_blank" rel="noopener noreferrer">
              <img
                src={logoImg}
                alt="Company Logo"
                className="
                  h-5 w-10
                  2xs:h-[1rem] 2xs:w-10
                  xs:h-[1rem] xs:w-10
                  2sm:h-[1rem] 2sm:w-10
                  sm:h-[1rem] sm:w-10
                  md:h-[1.5rem] md:w-10
                  md800:h-[1.5rem] md800:w-10
                  md900:h-[1.5rem] md900:w-10
                  lg:h-[1.5rem] lg:w-10
                  xl:h-[1.5rem] xl:w-10
                  2xl:h-[2rem] 2xl:w-10
                  3xl:h-14 3xl:w-10
                "
              />
            </a>
 
            {isAuthenticated ? (
              <div className="relative" ref={profileDropdownRef}>
                <div
                  className="h-5 w-5 2xs:h-5 2xs:w-5 xs:h-6 xs:w-6 2sm:h-6 2sm:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 md800:h-8 md800:w-8 md900:h-9 md900:w-9 lg:h-9 lg:w-9 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 3xl:h-14 3xl:w-14 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <span className="text-blue-600 font-bold text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl">
                    {profileData?.name?.charAt(0).toUpperCase() || "P"}
                  </span>
                </div>
 
                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        onClick={() => {
                          setProfileOpen(true);
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[0.6rem] hover:bg-white hover:text-gray-900 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-[0.9rem] xl:text-lg 2xl:text-xl 3xl:text-2xl px-1 2xs:px-1 xs:px-2 2sm:px-2 sm:px-3 md:px-3 md800:px-3 md900:px-4 lg:px-4 xl:px-5 2xl:px-6 3xl:px-7"
                >
                  <SignInDialog />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRegOpen(true)}
                  className="text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-[0.9rem] xl:text-lg 2xl:text-xl 3xl:text-2xl px-1 2xs:px-1 xs:px-2 2sm:px-2 sm:px-3 md:px-3 md800:px-3 md900:px-4 lg:px-4 xl:px-5 2xl:px-6 3xl:px-7"
                >
                  Sign Up
                </Button>
                <RegistrationDialog open={regOpen} setOpen={setRegOpen} />
              </>
            )}
          </div>
        </div>
 
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-12 2xs:top-12 xs:top-14 2sm:top-14 sm:top-16 md:top-16 md800:top-16 md900:top-16 lg:top-18 xl:top-18 2xl:top-20 3xl:top-20 left-0 w-full bg-background/95 backdrop-blur border-b shadow-lg">
            <nav className="flex flex-col items-center space-y-3 2xs:space-y-3 xs:space-y-3 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-4 md900:space-y-4 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-7 py-3 2xs:py-3 xs:py-3 2sm:py-4 sm:py-4 md:py-4 md800:py-4 md900:py-4 lg:py-4 xl:py-5 2xl:py-6 3xl:py-7">
              <div className="flex items-center space-x-2 2xs:space-x-2 xs:space-x-3 2sm:space-x-3 sm:space-x-4">
                {/* MOBILE COMPANY LOGO - UNIFORM WIDTH (w-10) */}
                <a href="https://securxperts.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    src={logoImg}
                    alt="Company Logo"
                    className="
                      h-8 w-10
                      2xs:h-8 2xs:w-10
                      xs:h-9 xs:w-10
                      2sm:h-10 2sm:w-10
                      sm:h-10 sm:w-10
                      md:h-12 md:w-10
                      md800:h-12 md800:w-10
                      md900:h-12 md900:w-10
                      lg:h-14 lg:w-10
                      xl:h-16 xl:w-10
                      2xl:h-18 2xl:w-10
                      3xl:h-20 3xl:w-10
                    "
                  />
                </a>
                {isAuthenticated ? (
                  <div
                    className="h-5 w-5 2xs:h-5 2xs:w-5 xs:h-6 xs:w-6 2sm:h-6 2sm:w-6 sm:h-7 sm:w-7 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
                    onClick={() => {
                      setProfileOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="text-blue-600 font-bold text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm">
                      {profileData?.name?.charAt(0).toUpperCase() || "P"}
                    </span>
                  </div>
                ) : (
                  <div className="flex space-x-2 2xs:space-x-2 xs:space-x-3 2sm:space-x-3 sm:space-x-4">
                    <Button variant="ghost" size="sm" className="text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm">
                      <SignInDialog />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setRegOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-foreground hover:text-primary transition-colors font-medium text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/jobs"
                className="text-foreground hover:text-primary transition-colors font-medium text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/success-stories"
                className="text-foreground hover:text-primary transition-colors font-medium text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </Link>
 
              {/* Mobile Sign Out Button */}
              {isAuthenticated && (
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
 
      {/* Profile Dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-[18rem] 2xs:max-w-[18rem] xs:max-w-[20rem] 2sm:max-w-[22rem] sm:max-w-[24rem] md:max-w-[26rem] md800:max-w-[27rem] md900:max-w-[28rem] lg:max-w-[23rem] xl:max-w-[24rem] 2xl:max-w-[25rem] 3xl:max-w-[25rem] bg-white rounded-2xl p-0 border-0 shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-hidden text-sm [&_div]:space-y-2 [&_input]:py-1.5 [&_input]:px-2 [&_label]:text-sm [&_label]:mb-1 [&_button]:text-sm">
          <div className="sticky top-0 z-10 flex flex-col items-center bg-gradient-to-b from-blue-500 to-blue-600 p-3 2xs:p-3 xs:p-4 2sm:p-4 sm:p-5 md:p-5 md800:p-6 md900:p-4 lg:p-3 xl:px-5 2xl:px-4 3xl:px-3 rounded-t-2xl">
            <div className="h-12 w-12 2xs:h-12 2xs:w-12 xs:h-14 xs:w-14 2sm:h-15 2sm:w-15 sm:h-16 sm:w-16 md:h-18 md:w-18 md800:h-18 md800:w-18 md900:h-20 md900:w-20 lg:h-20 lg:w-15 xl:h-22 xl:w-22 2xl:h-24 2xl:w-24 3xl:h-30 3xl:w-26 rounded-full bg-blue-100 flex items-center justify-center text-xl 2xs:text-xl xs:text-2xl 2sm:text-2xl sm:text-3xl md:text-3xl md800:text-3xl md900:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold text-blue-600 border-4 border-white shadow-md">
              {profileData?.name?.charAt(0).toUpperCase() || "P"}
            </div>
            <div className="mt-1 2xs:mt-1 xs:mt-2 2sm:mt-2 sm:mt-2 md:mt-3 md800:mt-3 md900:mt-3 lg:mt-4 xl:mt-4 2xl:mt-5 3xl:mt-6 text-white font-semibold text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-lg md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
              {profileData?.name || "User"}
            </div>
            <div className="text-blue-100 text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl">
              {profileData?.email || "Email not available"}
            </div>
          </div>
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="p-3 2xs:p-3 xs:p-4 2sm:p-4 sm:p-5 md:p-5 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-9 3xl:p-10 bg-white rounded-b-2xl">
              {loading && (
                <div className="text-center text-blue-500 font-medium text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
                  Loading profile...
                </div>
              )}
              {error && (
                <div className="text-center text-red-500 font-medium text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
                  {error}
                </div>
              )}
              {profileData && !loading && (
                <div className="space-y-1 2xs:space-y-1 xs:space-y-2 2sm:space-y-2 sm:space-y-2 md:space-y-3 md800:space-y-3 md900:space-y-3 lg:space-y-4 xl:space-y-4 2xl:space-y-5 3xl:space-y-6 text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl flex flex-col">
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Phone</span>
                    <span className="text-blue-600">{profileData.phone}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Country</span>
                    <span className="text-blue-600">{profileData.country}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">State</span>
                    <span className="text-blue-600">{profileData.state}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">City</span>
                    <span className="text-blue-600">{profileData.city}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Qualification</span>
                    <span className="text-blue-600">{profileData.qualification}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Passed Out Year</span>
                    <span className="text-blue-600">{profileData.passedout_year}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Interest</span>
                    <span className="text-blue-600">{profileData.interest}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Educational Status</span>
                    <span className="text-blue-600">{profileData.educational_status || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between py-0.5 2xs:py-0.5 xs:py-1 2sm:py-1 sm:py-1 md:py-1 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4">
                    <span className="text-gray-600 font-medium">Created At</span>
                    <span className="text-blue-600">{new Date(profileData.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
              <button
                className="mt-3 2xs:mt-3 xs:mt-3 2sm:mt-4 sm:mt-4 md:mt-5 md800:mt-5 md900:mt-6 lg:mt-6 xl:mt-7 2xl:mt-8 3xl:mt-9 w-full py-1 2xs:py-1 xs:py-1 2sm:py-1 sm:py-2 md:py-2 md800:py-2 md900:py-2 lg:py-2 xl:py-3 2xl:py-3 3xl:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
 
export default Header;