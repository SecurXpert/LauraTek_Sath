import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ContactUs } from "@/services/apiservices";
import signupIllustration from "@/assets/signup-illustration.png";
import techlogo from "@/assets/techlogo.png"; // <-- ADDED LOGO
 
interface ContactUsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
 
const countryCodes: Record<string, string> = {
  India: "+91",
  USA: "+1",
  UK: "+44",
  Australia: "+61",
  Canada: "+1",
};
 
const Contactus = ({ open, setOpen }: ContactUsDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    mobile_number: "",
    qualification: "",
    year_of_passedout: "",
    interest: "",
    state: "",
    city: "",
    description: "",
  });
 
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
 
  // When dialog opens, clear previous success/error so they don't show immediately
  useEffect(() => {
    if (open) {
      setSuccess("");
      setError("");
    }
  }, [open]);
 
  const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);
 
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
 
    switch (name) {
      case "name":
      case "country":
      case "state":
      case "city":
        if (!/^[A-Za-z\s]*$/.test(value)) newErrors[name] = "Only letters and spaces allowed";
        else if (!value.trim()) newErrors[name] = "This field is required";
        else delete newErrors[name];
        break;
 
      case "mobile_number":
        if (!/^\d*$/.test(value)) newErrors.mobile_number = "Only numbers allowed";
        else if (value.length > 15) newErrors.mobile_number = "Phone number too long";
        else if (!value.trim()) newErrors.mobile_number = "This field is required";
        else delete newErrors.mobile_number;
        break;
 
      case "year_of_passedout":
        if (!/^\d{4}$/.test(value)) newErrors.year_of_passedout = "Must be a 4-digit year";
        else if (parseInt(value) < 1900 || parseInt(value) > new Date().getFullYear())
          newErrors.year_of_passedout = "Invalid year";
        else delete newErrors.year_of_passedout;
        break;
 
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = "Invalid email format";
        else delete newErrors.email;
        break;
 
      case "qualification":
      case "interest":
        if (!value.trim()) newErrors[name] = "This field is required";
        else delete newErrors[name];
        break;
 
      case "description":
        if (!value.trim()) newErrors.description = "This field is required";
        else if (countWords(value) > 1000) newErrors.description = "Description must not exceed 1000 words";
        else delete newErrors.description;
        break;
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    // Clear success when user starts editing again
    if (success) setSuccess("");
    if (error) setError("");
 
    setFormData({ ...formData, [id]: value });
    validateField(id, value);
  };
 
  const handleCountryCodeChange = (value: string) => {
    // Clear messages when country code changed too
    if (success) setSuccess("");
    if (error) setError("");
    setSelectedCountryCode(value);
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
 
    const isValid = Object.entries(formData).every(([k, v]) => validateField(k, v));
 
    if (!isValid || Object.keys(errors).length > 0) {
      setError("Please fix the errors in the form");
      return;
    }
 
    setLoading(true);
    try {
      const payload = {
        ...formData,
        mobile_number: selectedCountryCode + formData.mobile_number,
      };
      await ContactUs(payload);
      setSuccess("Message sent successfully!");
 
      setFormData({
        name: "",
        email: "",
        country: "",
        mobile_number: "",
        qualification: "",
        year_of_passedout: "",
        interest: "",
        state: "",
        city: "",
        description: "",
      });
 
      setSelectedCountryCode("+91");
      setTimeout(() => setOpen(false), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 overflow-hidden bg-white rounded-2xl shadow-2xl max-w-5xl max-h-[90vh] grid grid-cols-1 lg:grid-cols-2"
      >
        {/* LEFT SIDE */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col h-full min-h-0">
 
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img src={techlogo} alt="Lautek Logo" className="w-28 h-auto object-contain" />
          </div>
 
          {/* HEADING */}
          <h3 className="text-center text-lg sm:text-xl font-medium text-gray-700 mb-6">
            Contact Us
          </h3>
 
          {/* SCROLLABLE FORM */}
          <div
            className="flex-1 min-h-0 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{ maxHeight: "calc(90vh - 180px)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5 pb-28">
 
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name.."
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>
 
                <div>
                  <Label htmlFor="email">Email Id</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@xyz.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
              </div>
 
              {/* Country & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Country</Label>
                  <Input
                    id="country"
                    placeholder="Enter country.."
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? "border-red-500" : ""}
                  />
                  {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                </div>
 
                <div>
                  <Label>Mobile No.</Label>
                  <div className="flex">
                    <Select value={selectedCountryCode} onValueChange={handleCountryCodeChange}>
                      <SelectTrigger className="w-20 rounded-r-none border-r-0">
                        <SelectValue placeholder="+Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(countryCodes).map(([name, code]) => (
                          <SelectItem key={code} value={code}>
                            {code} ({name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
 
                    <Input
                      id="mobile_number"
                      placeholder="98596 58000"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      className={`flex-1 rounded-l-none ${errors.mobile_number ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.mobile_number ? (
                    <p className="text-red-500 text-xs">{errors.mobile_number}</p>
                  ) : (
                    <p className="text-gray-500 text-xs">Numbers only</p>
                  )}
                </div>
              </div>
 
              {/* Qualification & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Qualification</Label>
                  <Input
                    id="qualification"
                    placeholder="e.g., B.Tech"
                    value={formData.qualification}
                    onChange={handleChange}
                    className={errors.qualification ? "border-red-500" : ""}
                  />
                  {errors.qualification && <p className="text-red-500 text-xs">{errors.qualification}</p>}
                </div>
 
                <div>
                  <Label>Year (e.g., 2024)</Label>
                  <Input
                    id="year_of_passedout"
                    placeholder="2024"
                    value={formData.year_of_passedout}
                    onChange={handleChange}
                    maxLength={4}
                    className={errors.year_of_passedout ? "border-red-500" : ""}
                  />
                  {errors.year_of_passedout ? (
                    <p className="text-red-500 text-xs">{errors.year_of_passedout}</p>
                  ) : (
                    <p className="text-gray-500 text-xs">Format: YYYY</p>
                  )}
                </div>
              </div>
 
              {/* Interest & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Interest</Label>
                  <Input
                    id="interest"
                    placeholder="e.g., Web Development"
                    value={formData.interest}
                    onChange={handleChange}
                    className={errors.interest ? "border-red-500" : ""}
                  />
                  {errors.interest && <p className="text-red-500 text-xs">{errors.interest}</p>}
                </div>
 
                <div>
                  <Label>State</Label>
                  <Input
                    id="state"
                    placeholder="Enter state.."
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                </div>
              </div>
 
              {/* City */}
              <div>
                <Label>City</Label>
                <Input
                  id="city"
                  placeholder="Enter city.."
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
              </div>
 
              {/* Description */}
              <div>
                <Label>Description</Label>
                <Textarea
                  id="description"
                  placeholder="Your message here (max 1000 words)"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description ? (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                ) : (
                  <p className="text-gray-500 text-xs">
                    Word count: {countWords(formData.description)}/1000
                  </p>
                )}
              </div>
 
              {/* SUCCESS / ERROR */}
              {success && <p className="text-green-600 text-center">{success}</p>}
              {error && <p className="text-red-600 text-center">{error}</p>}
 
              {/* BUTTON */}
              <Button
                type="submit"
                disabled={loading || Object.keys(errors).length > 0}
                className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-2.5 rounded-md"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
 
        {/* RIGHT SIDE IMAGE */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-8">
          <div className="relative">
            <img src={signupIllustration} alt="Illustration" className="w-full max-w-md" />
           
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
 
export default Contactus;