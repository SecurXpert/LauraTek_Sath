import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import techLogo from "@/assets/techlogo.png";
import logoImg from "@/assets/logo.png";
import { Menu, X, User, LogOut } from "lucide-react";
import { getUserRoleFromToken } from "@/lib/jwtUtils";
 
const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentHash = location.hash;
  const fullPath = currentPath + currentHash;
  
  const getLinkClass = (path: string) => {
    // If we're at exact path (e.g. '/' or '/#about-us' matches)
    const isActive = fullPath === path || (path === "/" && currentPath === "/" && !currentHash);
    return isActive
      ? "px-5 py-2 rounded-full bg-gradient-to-r from-[#6525a3] to-[#8f28b5] text-white font-medium shadow-sm transition-all"
      : "px-5 py-2 rounded-full font-medium transition-all text-gray-800 hover:text-white hover:bg-[linear-gradient(180deg,#32269B_0%,#931AAB_100%)]";
  };
 
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
 
  // Sync auth state
  useEffect(() => {
    const checkToken = () => {
      setIsAuthenticated(!!localStorage.getItem("access_token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);
 
  // Get user role from JWT token
  const userRole = getUserRoleFromToken();
 
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_profile_pic");
    setIsAuthenticated(false);
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };
 
  const goToDashboard = () => {
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/dashboard");
  };
  const goToStudent = () => {
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/profile");
  };
 
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-12 2xs:h-12 xs:h-14 2sm:h-14 sm:h-16 md:h-16 lg:h-18 xl:h-18 2xl:h-20 3xl:h-20 flex items-center justify-between w-full max-w-[1920px] px-2 xs:px-3 sm:px-4 md:px-4 lg:px-6 xl:px-8 2xl:px-10 3xl:px-12">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <img src={techLogo} alt="Logo" className="h-6 xs:h-7 2sm:h-8 sm:h-8 w-auto object-contain" />
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
 
        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 w-full items-center gap-2 xl:gap-4">
          <div className="col-span-3">
            <Link to="/">
              <img src={techLogo} alt="Logo" className="h-8 lg:h-10 xl:h-12 w-auto object-contain" />
            </Link>
          </div>
 
          <nav className="col-span-6 flex justify-center items-center space-x-1 xl:space-x-4 text-sm lg:text-base whitespace-nowrap">
            <Link to="/" className={getLinkClass("/")}>Home</Link>
            <a href="/#about-us" className={getLinkClass("/#about-us")}>About Us</a>
            <a href="/#courses" className={getLinkClass("/#courses")}>Courses</a>
            {/* <Link to="/jobs" className={getLinkClass("/jobs")}>Jobs</Link> */}
            {/* <Link to="/#success-stories" className={getLinkClass("/#success-stories")}>Success Stories</Link> */}
            <Link to="/contact-us" className={getLinkClass("/contact-us")}>Contact us</Link>
          </nav>
 
          <div className="col-span-3 flex items-center justify-end space-x-4">
            <a href="https://securxperts.com/" target="_blank" rel="noopener noreferrer">
              <img src={logoImg} alt="Company" className="h-8 w-10" />
            </a>
 
            {isAuthenticated ? (
              <div className="relative" ref={profileDropdownRef}>
                {/* Profile Icon - Opens Dropdown */}
                <div
                  className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <span className="text-blue-600 font-bold text-lg">P</span>
                </div>
 
                {/* Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {userRole === "student" ? (
                        <>
                          <button
                            onClick={goToDashboard}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <User className="h-4 w-4 mr-3" />
                            Profile Settings
                          </button>
                          <button
                            onClick={goToStudent}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <User className="h-4 w-4 mr-3" />
                            Profile
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={goToStudent}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </button>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')} className="font-medium text-base px-6 rounded-full hover:text-white hover:bg-[linear-gradient(180deg,#32269B_0%,#931AAB_100%)]">Sign In</Button>
                <Button variant="ghost" onClick={() => navigate('/login', { state: { view: 'signup' } })} className="font-medium text-base px-6 rounded-full hover:text-white hover:bg-[linear-gradient(180deg,#32269B_0%,#931AAB_100%)]">Sign Up</Button>
              </>
            )}
          </div>
        </div>
 
        {/* Mobile Menu */}
      {/* Mobile Menu - FIXED with Sign In / Sign Up */}
{isMenuOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
    <nav className="flex flex-col items-center py-8 space-y-6 px-4">
      {/* Company Logo + Profile (if logged in) */}
      <div className="flex items-center space-x-6 mb-4">
        <a href="https://securxperts.com/" target="_blank" rel="noopener noreferrer">
          <img src={logoImg} alt="Company" className="h-12 w-12 rounded-lg shadow-md" />
        </a>
        {isAuthenticated && (
          <button
            onClick={goToDashboard}
            className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
          >
            <span className="text-blue-600 font-bold text-xl">P</span>
          </button>
        )}
      </div>
 
      {/* Navigation Links */}
      <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${fullPath === '/' ? 'text-primary' : 'hover:text-primary'}`}>
        Home
      </Link>
      <a href="/#about-us" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${fullPath === '/#about-us' ? 'text-primary' : 'hover:text-primary'}`}>
        About Us
      </a>
      <a href="/#courses" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${fullPath === '/#courses' ? 'text-primary' : 'hover:text-primary'}`}>
        Courses
      </a>
      {/* <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${currentPath === '/jobs' ? 'text-primary' : 'hover:text-primary'}`}>
        Jobs
      </Link> */}
      {/* <Link to="/#success-stories" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${fullPath === '/#success-stories' ? 'text-primary' : 'hover:text-primary'}`}>
        Success Stories
      </Link> */}
      <Link to="/contact-us" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${currentPath === '/contact-us' ? 'text-primary' : 'hover:text-primary'}`}>
        Contact us
      </Link>
 
              {/* Authentication Buttons - NOW VISIBLE IN MOBILE MENU */}
              <div className="flex flex-col w-full items-center gap-4 pt-6 border-t border-gray-200 mt-6">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={goToDashboard}
                      className="w-full max-w-xs py-3 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                    >
                      {userRole === "student" ? "Profile Settings" : "Profile"}
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full max-w-xs py-3 px-6 border border-red-600 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    {/* Sign In Button */}
                    <Button variant="ghost" className="w-full max-w-xs py-3 px-6 text-base font-medium rounded-xl transition-all hover:text-white hover:bg-[linear-gradient(180deg,#32269B_0%,#931AAB_100%)]" onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}>
                      Sign In
                    </Button>
                    {/* Sign Up Button */}
                    <Button
                      variant="outline"
                      className="w-full max-w-xs py-3 px-6 border-2 border-[#001BB7] text-[#001BB7] rounded-xl font-medium transition-all hover:text-white hover:border-transparent hover:bg-[linear-gradient(180deg,#32269B_0%,#931AAB_100%)]"
                      onClick={() => {
                        navigate('/login', { state: { view: 'signup' } });
                        setIsMenuOpen(false); // Close menu when opening dialog
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
 
export default Header;
 
 
 
 
 
 
