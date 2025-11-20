// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { ContactUs } from "@/services/apiservices";

// interface ContactUsDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

// const countryCodes: Record<string, string> = {
//   "India": "+91",
//   "USA": "+1",
//   "UK": "+44",
//   "Australia": "+61",
//   "Canada": "+1",
// };

// const Contactus = ({ open, setOpen }: ContactUsDialogProps) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     country: "",
//     mobile_number: "",
//     qualification: "",
//     year_of_passedout: "",
//     interest: "",
//     state: "",
//     city: "",
//     description: "",
//   });
//   const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const countWords = (text: string) => {
//     return text.trim() ? text.trim().split(/\s+/).length : 0;
//   };

//   const validateField = (name: string, value: string) => {
//     const newErrors = { ...errors };

//     switch (name) {
//       case "name":
//         if (!/^[A-Za-z\s]*$/.test(value)) {
//           newErrors.name = "Only letters and spaces allowed";
//         } else if (!value.trim()) {
//           newErrors.name = "This field is required";
//         } else {
//           delete newErrors.name;
//         }
//         break;
//       case "country":
//         if (!/^[A-Za-z\s]*$/.test(value)) {
//           newErrors.country = "Only letters and spaces allowed";
//         } else if (!value.trim()) {
//           newErrors.country = "This field is required";
//         } else {
//           delete newErrors.country;
//         }
//         break;
//       case "state":
//         if (!/^[A-Za-z\s]*$/.test(value)) {
//           newErrors.state = "Only letters and spaces allowed";
//         } else if (!value.trim()) {
//           newErrors.state = "This field is required";
//         } else {
//           delete newErrors.state;
//         }
//         break;
//       case "city":
//         if (!/^[A-Za-z\s]*$/.test(value)) {
//           newErrors.city = "Only letters and spaces allowed";
//         } else if (!value.trim()) {
//           newErrors.city = "This field is required";
//         } else {
//           delete newErrors.city;
//         }
//         break;
//       case "mobile_number":
//         if (!/^\d*$/.test(value)) {
//           newErrors.mobile_number = "Only numbers allowed";
//         } else if (value.length > 15) {
//           newErrors.mobile_number = "Phone number too long";
//         } else if (!value.trim()) {
//           newErrors.mobile_number = "This field is required";
//         } else {
//           delete newErrors.mobile_number;
//         }
//         break;
//       case "year_of_passedout":
//         if (!/^\d{4}$/.test(value)) {
//           newErrors.year_of_passedout = "Must be a 4-digit year";
//         } else if (parseInt(value) < 1900 || parseInt(value) > new Date().getFullYear()) {
//           newErrors.year_of_passedout = "Invalid year";
//         } else if (!value.trim()) {
//           newErrors.year_of_passedout = "This field is required";
//         } else {
//           delete newErrors.year_of_passedout;
//         }
//         break;
//       case "email":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           newErrors.email = "Invalid email format";
//         } else if (!value.trim()) {
//           newErrors.email = "This field is required";
//         } else {
//           delete newErrors.email;
//         }
//         break;
//       case "qualification":
//         if (!value.trim()) {
//           newErrors.qualification = "This field is required";
//         } else {
//           delete newErrors.qualification;
//         }
//         break;
//       case "interest":
//         if (!value.trim()) {
//           newErrors.interest = "This field is required";
//         } else {
//           delete newErrors.interest;
//         }
//         break;
//       case "description":
//         if (!value.trim()) {
//           newErrors.description = "This field is required";
//         } else if (countWords(value) > 1000) {
//           newErrors.description = "Description must not exceed 1000 words";
//         } else {
//           delete newErrors.description;
//         }
//         break;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     validateField(id, value);
//   };

//   const handleCountryCodeChange = (value: string) => {
//     setSelectedCountryCode(value);
//     if (value) {
//       setErrors({ ...errors, mobile_number: formData.mobile_number ? errors.mobile_number : "" });
//     } else {
//       setErrors({ ...errors, mobile_number: "Please select a country code" });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     // Validate all fields before submission
//     const isValid = Object.entries(formData).every(([key, value]) => validateField(key, value));

//     if (!selectedCountryCode) {
//       setErrors((prev) => ({ ...prev, mobile_number: "Please select a country code" }));
//       return;
//     }

//     if (!isValid || Object.keys(errors).length > 0) {
//       setError("Please fix the errors in the form");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         mobile_number: selectedCountryCode + formData.mobile_number,
//       };
//       await ContactUs(payload);
//       setSuccess("Message sent successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         country: "",
//         mobile_number: "",
//         qualification: "",
//         year_of_passedout: "",
//         interest: "",
//         state: "",
//         city: "",
//         description: "",
//       });
//       setSelectedCountryCode("+91");
//       setTimeout(() => setOpen(false), 1500);
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : "Failed to send message";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="
//         max-w-[18rem] 
//           2xs:max-w-[18rem] 
//           xs:max-w-[20rem] 
//           2sm:max-w-[22rem] 
//           sm:max-w-[24rem] 
//           md:max-w-[26rem] 
//           md800:max-w-[27rem] 
//           md900:max-w-[28rem] 
//           lg:max-w-[23rem] 
//           xl:max-w-[24rem] 
//           2xl:max-w-[25rem] 
//           3xl:max-w-[25rem] 
//         max-h-[90vh] overflow-hidden
//         p-3 sm:p-4 md:p-5
//         rounded-lg sm:rounded-xl
//         bg-white shadow-lg
//       ">
//         <form className="flex flex-col gap-3 sm:gap-4 md:gap-5" onSubmit={handleSubmit}>
//           <h2 className="
//             text-xl sm:text-2xl md:text-3xl
//              sticky top-0 z-10
//             font-bold text-gray-800 text-center
//           ">
//             Contact Us
//           </h2>
//           <p className="
//             text-sm sm:text-base md:text-lg
//             text-muted-foreground text-center
//           ">
//             We'd love to hear from you!
//           </p>
//           <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
//           <div className="grid gap-3 sm:gap-4 md:gap-5">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="name"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   Full Name
//                 </Label>
//                 <Input
//                   id="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className={`
//                     ${errors.name ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.name}</p>
//                 )}
//               </div>
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="email"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   Email Address
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className={`
//                     ${errors.email ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="country"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   Country
//                 </Label>
//                 <Input
//                   id="country"
//                   placeholder="Country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   required
//                   className={`
//                     ${errors.country ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.country && (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.country}</p>
//                 )}
//               </div>
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="mobile_number"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   Phone Number
//                 </Label>
//                 <div className="flex items-center">
//                   <Select
//                     value={selectedCountryCode}
//                     onValueChange={handleCountryCodeChange}
//                   >
//                     <SelectTrigger
//                       className="
//                         w-[90px] sm:w-[100px]
//                         text-sm sm:text-base
//                         p-2 sm:p-2.5 rounded-r-none border-r-0
//                       "
//                     >
//                       <SelectValue placeholder="+Code" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {Object.entries(countryCodes).map(([country, code]) => (
//                         <SelectItem key={code} value={code}>
//                           {code} ({country})
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <Input
//                     id="mobile_number"
//                     type="tel"
//                     placeholder="Phone Number"
//                     value={formData.mobile_number}
//                     onChange={handleChange}
//                     required
//                     inputMode="numeric"
//                     className={`
//                       ${errors.mobile_number ? "border-red-500 focus:ring-red-500" : ""}
//                       flex-1 text-sm sm:text-base
//                       p-2 sm:p-2.5 rounded-l-none
//                     `}
//                   />
//                 </div>
//                 {errors.mobile_number ? (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.mobile_number}</p>
//                 ) : (
//                   <p className="text-gray-500 text-xs sm:text-sm">Numbers only</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="qualification"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   Qualification
//                 </Label>
//                 <Input
//                   id="qualification"
//                   placeholder="Qualification"
//                   value={formData.qualification}
//                   onChange={handleChange}
//                   required
//                   className={`
//                     ${errors.qualification ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.qualification && (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.qualification}</p>
//                 )}
//               </div>
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="year_of_passedout"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   Year (e.g., 2024)
//                 </Label>
//                 <Input
//                   id="year_of_passedout"
//                   placeholder="Year (e.g., 2024)"
//                   value={formData.year_of_passedout}
//                   onChange={handleChange}
//                   required
//                   inputMode="numeric"
//                   maxLength={4}
//                   className={`
//                     ${errors.year_of_passedout ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.year_of_passedout ? (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.year_of_passedout}</p>
//                 ) : (
//                   <p className="text-gray-500 text-xs sm:text-sm">Format: YYYY</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="interest"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   Interest
//                 </Label>
//                 <Input
//                   id="interest"
//                   placeholder="Your Interest"
//                   value={formData.interest}
//                   onChange={handleChange}
//                   required
//                   className={`
//                     ${errors.interest ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.interest && (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.interest}</p>
//                 )}
//               </div>
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="state"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   State
//                 </Label>
//                 <Input
//                   id="state"
//                   placeholder="State"
//                   value={formData.state}
//                   onChange={handleChange}
//                   required
//                   className={`
//                     ${errors.state ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.state && (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.state}</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-3 sm:gap-4">
//               <div className="space-y-1 sm:space-y-2">
//                 <Label
//                   htmlFor="city"
//                   className="
//                     text-sm sm:text-base
//                     font-medium text-gray-600
//                   "
//                 >
//                   City
//                 </Label>
//                 <Input
//                   id="city"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   required
//                   className={`
//                     ${errors.city ? "border-red-500 focus:ring-red-500" : ""}
//                     text-sm sm:text-base
//                     p-2 sm:p-2.5
//                   `}
//                 />
//                 {errors.city && (
//                   <p className="text-red-500 text-xs sm:text-sm">{errors.city}</p>
//                 )}
//               </div>
//             </div>
//             <div className="space-y-1 sm:space-y-2">
//               <Label
//                 htmlFor="description"
//                 className="
//                   text-sm sm:text-base
//                   font-medium text-gray-600
//                 "
//               >
//                 Description
//               </Label>
//               <Textarea
//                 id="description"
//                 placeholder="Your message here (max 1000 words)"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 className={`
//                   ${errors.description ? "border-red-500 focus:ring-red-500" : ""}
//                   w-full
//                   h-24 sm:h-28 md:h-32
//                   text-sm sm:text-base
//                   p-2 sm:p-2.5
//                   border rounded
//                 `}
//               />
//               {errors.description ? (
//                 <p className="text-red-500 text-xs sm:text-sm">{errors.description}</p>
//               ) : (
//                 <p className="text-gray-500 text-xs sm:text-sm">
//                   Word count: {countWords(formData.description)}/1000
//                 </p>
//               )}
//             </div>
//             {success && (
//               <div className="
//                 text-green-600 text-center
//                 text-sm sm:text-base
//               ">
//                 {success}
//               </div>
//             )}
//             {error && (
//               <div className="
//                 text-red-600 text-center
//                 text-sm sm:text-base
//               ">
//                 {error}
//               </div>
//             )}
//             <Button
//               className="
//                 w-full
//                 text-sm sm:text-base
//                 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700
//                 mt-2 sm:mt-3
//               "
//               type="submit"
//               disabled={loading || Object.keys(errors).length > 0}
//             >
//               {loading ? "Sending..." : "Send Message"}
//             </Button>
//           </div>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Contactus;




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