


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import guest20Img from "@/assets/guest20.png";
import guest22Img from "@/assets/guest22.png";
import techlogo from "@/assets/techlogo.png";

interface ContactUsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

const initialFormData = {
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
};

const Contactus = ({ open, setOpen, onSuccess }: ContactUsDialogProps) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /*  Reset form on dialog close */
  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setSuccess("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (
      ["country", "state", "city", "name", "interest", "qualification"].includes(id) &&
      !/^[A-Za-z\s]*$/.test(value)
    )
      return;

    if (id === "year_of_passedout") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 4) return;
    }

    if (id === "mobile_number") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (id === "description" && value.length > 100) return;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  /* ================= SUBMIT (BACKEND CONNECTED) ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* Mandatory fields check */
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.country.trim() ||
      !formData.mobile_number.trim() ||
      !formData.qualification.trim() ||
      !formData.year_of_passedout.trim() ||
      !formData.interest.trim() ||
      !formData.state.trim() ||
      !formData.city.trim()
    ) {
      setError("Please fill all mandatory fields");
      return;
    }

    if (formData.mobile_number.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (formData.year_of_passedout.length !== 4) {
      setError("Please enter a valid 4-digit year");
      return;
    }

    try {
      setLoading(true);

      /*  Backend payload mapping (REQUIRED) */
      const payload = {
        name: formData.name,
        email: formData.email,
        country: formData.country,
        mobile_number: formData.mobile_number,
        qualification: formData.qualification,
        year_of_passedout: formData.year_of_passedout,
        interest: formData.interest,
        state: formData.state,
        city: formData.city,
        description: formData.description,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/enrollments/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccess("Message sent successfully!");
      if (onSuccess) onSuccess();
      setOpen(false);
      setFormData(initialFormData);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          p-0 bg-white rounded-2xl shadow-2xl
          max-w-5xl h-[95vh]
          grid grid-cols-1 lg:grid-cols-2
          overflow-hidden
        "
      >
        {/* LEFT IMAGE */}
        <div className="hidden lg:flex relative h-full w-full bg-[#5231A8] overflow-hidden flex-col items-center pt-12">
          {/* Background pattern */}
          <img src={guest20Img} className="absolute inset-0 w-full h-full object-cover z-0" alt="Background" />
          
          {/* Title */}
          <h2 className="relative z-10 text-white font-bold text-4xl tracking-wide">
            Contact US
          </h2>

          {/* Foreground Illustration */}
          <div className="relative z-10 flex-1 w-full mt-4 flex items-end justify-center">
            <img 
              src={guest22Img} 
              className="w-[95%] max-h-[100%] object-contain object-bottom" 
              alt="Contact Us Illustration" 
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="py-6 sm:py-6 md:py-10 px-0 overflow-y-auto">
          <div className="flex justify-center mb-6">
            <img src={techlogo} className="w-28" />
          </div>

          <h3 className="text-center text-2xl font-bold mb-6 mt-4 md:mt-8">
            Contact Us
          </h3>

          {/*  FULL ORIGINAL FORM — UNCHANGED */}
          <form onSubmit={handleSubmit} className="space-y-4 px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-4">
       <div>
  <Label>
    Full Name <span className="text-red-500">*</span>
  </Label>

  <Input
    id="name"
    placeholder="Enter your full name"
    value={formData.name}
    maxLength={30}
    onChange={(e) => {
      const value = e.target.value;

      //  Do not allow space at the beginning
      if (value.startsWith(" ")) return;

      //  Allow letters and spaces only
      if (/^[A-Za-z ]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          name: value,
        }));
      }
    }}
  />

  {/*  Minimum length validation (ignores extra spaces) */}
  {formData.name.trim().length > 0 &&
    formData.name.trim().length < 3 && (
      <p className="text-red-500 text-sm mt-1">
        Name must be at least 3 characters
      </p>
    )}

  {/*  Maximum length info */}
  {formData.name.length === 30 && (
    <p className="text-gray-500 text-sm mt-1">
      Maximum 30 characters reached
    </p>
  )}
</div>


              <div>
  <Label>
    Email <span className="text-red-500">*</span>
  </Label>

  <Input
    id="email"
    type="email"
    placeholder="Enter your email address"
    value={formData.email}
    onChange={(e) => {
      //  Remove ALL spaces (typing + paste)
      const value = e.target.value.replace(/\s/g, "");

      //  Allow only valid email characters
      if (/^[A-Za-z0-9@._-]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          email: value,
        }));
      }
    }}
  />

  {/*  Invalid email format message */}
  {formData.email.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
      <p className="text-red-500 text-sm mt-1">
        Please enter a valid email address
      </p>
    )}
</div>

            </div>

            <div className="grid sm:grid-cols-2 gap-4">
          <div>
  <Label>
    Country <span className="text-red-500">*</span>
  </Label>

  <Input
    id="country"
    placeholder="Enter your country"
    value={formData.country}
    maxLength={30}
    onChange={(e) => {
      const value = e.target.value;

      //  Prevent starting space
      if (value.startsWith(" ")) return;

      //  Allow letters and spaces only
      if (/^[A-Za-z ]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          country: value,
        }));
      }
    }}
  />

  {/*  Minimum length validation (ignores extra spaces) */}
  {formData.country.trim().length > 0 &&
    formData.country.trim().length < 3 && (
      <p className="text-red-500 text-sm mt-1">
        Country must be at least 3 characters
      </p>
    )}

  {/*  Max length info */}
  {formData.country.length === 30 && (
    <p className="text-gray-500 text-sm mt-1">
      Maximum 30 characters reached
    </p>
  )}
</div>


              <div>
  <Label>
    Mobile <span className="text-red-500">*</span>
  </Label>

  <Input
    id="mobile_number"
    placeholder="Enter 10-digit mobile number"
    value={formData.mobile_number}
    onChange={(e) => {
      const value = e.target.value;

      // Allow digits only
      if (!/^\d*$/.test(value)) return;

      // Max 10 digits
      if (value.length > 10) return;

      setFormData((prev) => ({
        ...prev,
        mobile_number: value,
      }));
    }}
  />

  {formData.mobile_number.length > 0 &&
    formData.mobile_number.length < 10 && (
      <p className="text-red-500 text-sm mt-1">
        Mobile number must be exactly 10 digits
      </p>
    )}
</div>

            </div>

            <div className="grid sm:grid-cols-2 gap-4">
         <div>
  <Label>
    Qualification <span className="text-red-500">*</span>
  </Label>

  <Input
    id="qualification"
    placeholder="Eg: B.Tech, B.Sc, MCA"
    value={formData.qualification}
    maxLength={30}
    onChange={(e) => {
      const value = e.target.value;

      //  Allow clearing input (BACKSPACE FIX)
      if (value === "") {
        setFormData((prev) => ({ ...prev, qualification: "" }));
        return;
      }

      //  First character must be a LETTER
      if (value.length === 1 && !/^[A-Za-z]$/.test(value)) return;

      //  After first letter, allow letters, spaces, and dot only
      if (/^[A-Za-z][A-Za-z. ]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          qualification: value,
        }));
      }
    }}
  />

  {/*  Minimum length validation */}
  {formData.qualification.trim().length > 0 &&
    formData.qualification.trim().length < 2 && (
      <p className="text-red-500 text-sm mt-1">
        Qualification must be at least 2 characters
      </p>
    )}

  {/* ℹ Maximum length info */}
  {formData.qualification.length === 30 && (
    <p className="text-gray-500 text-sm mt-1">
      Maximum 30 characters reached
    </p>
  )}
</div>



           <div>
  <Label>
    Year of Passed Out <span className="text-red-500">*</span>
  </Label>

  <Input
    id="year_of_passedout"
    placeholder="Eg: 2022"
    value={formData.year_of_passedout}
    onChange={(e) => {
      const value = e.target.value;
      const currentYear = new Date().getFullYear();

      // Allow only digits
      if (!/^\d*$/.test(value)) return;

      // Max 4 digits
      if (value.length > 4) return;

      // Prevent future year
      if (value.length === 4 && Number(value) > currentYear) return;

      setFormData((prev) => ({
        ...prev,
        year_of_passedout: value,
      }));
    }}
  />

  {/* Validation messages */}
  {formData.year_of_passedout.length > 0 &&
    formData.year_of_passedout.length < 4 && (
      <p className="text-red-500 text-sm mt-1">
        Year must be exactly 4 digits
      </p>
    )}

  {formData.year_of_passedout.length === 4 &&
    Number(formData.year_of_passedout) > new Date().getFullYear() && (
      <p className="text-red-500 text-sm mt-1">
        Future year is not allowed
      </p>
    )}
</div>


            </div>
<div>
  <Label>
    Interest <span className="text-red-500">*</span>
  </Label>

  <Input
    id="interest"
    placeholder="Eg: Web Development, Data Science"
    value={formData.interest}
    maxLength={30}
    onChange={(e) => {
      const value = e.target.value;

      //  Allow clearing input (BACKSPACE FIX)
      if (value === "") {
        setFormData((prev) => ({ ...prev, interest: "" }));
        return;
      }

      //  First character must be a LETTER
      if (value.length === 1 && !/^[A-Za-z]$/.test(value)) return;

      //  After first letter, allow letters, spaces, comma
      if (/^[A-Za-z][A-Za-z, ]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          interest: value,
        }));
      }
    }}
  />

  {/*  Minimum length validation (ignores spaces & commas) */}
  {formData.interest.trim().replace(/,/g, "").length > 0 &&
    formData.interest.trim().replace(/,/g, "").length < 3 && (
      <p className="text-red-500 text-sm mt-1">
        Interest must be at least 3 characters
      </p>
    )}

  {/* ℹ Maximum length info */}
  {formData.interest.length === 30 && (
    <p className="text-gray-500 text-sm mt-1">
      Maximum 30 characters reached
    </p>
  )}
</div>




            <div className="grid sm:grid-cols-2 gap-4">
     <div>
  <Label>
    State <span className="text-red-500">*</span>
  </Label>

  <Input
    id="state"
    placeholder="Enter your state"
    value={formData.state}
    maxLength={30}
    onChange={(e) => {
      const value = e.target.value;

      //  Allow clearing input (IMPORTANT for backspace)
      if (value === "") {
        setFormData((prev) => ({ ...prev, state: "" }));
        return;
      }

      //  First character must be a LETTER
      if (value.length === 1 && !/^[A-Za-z]$/.test(value)) return;

      //  After first letter, allow letters and spaces only
      if (/^[A-Za-z][A-Za-z ]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          state: value,
        }));
      }
    }}
  />

  {/*  Minimum length validation (ignore spaces) */}
  {formData.state.trim().length > 0 &&
    formData.state.trim().length < 3 && (
      <p className="text-red-500 text-sm mt-1">
        State must be at least 3 characters
      </p>
    )}

  {/* ℹ Maximum length info */}
  {formData.state.length === 30 && (
    <p className="text-gray-500 text-sm mt-1">
      Maximum 30 characters reached
    </p>
  )}
</div>

<div>
  <Label>
    City <span className="text-red-500">*</span>
  </Label>

  <Input
    id="city"
    placeholder="Enter your city"
    value={formData.city}
    maxLength={30}
    onChange={(e) => {
      const value = e.target.value;

      //  Allow clearing input (fixes backspace)
      if (value === "") {
        setFormData((prev) => ({ ...prev, city: "" }));
        return;
      }

      //  First character must be a LETTER
      if (value.length === 1 && !/^[A-Za-z]$/.test(value)) return;

      //  After first letter, allow letters and spaces only
      if (/^[A-Za-z][A-Za-z ]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          city: value,
        }));
      }
    }}
  />

  {/*  Minimum length validation (ignore spaces) */}
  {formData.city.trim().length > 0 &&
    formData.city.trim().length < 3 && (
      <p className="text-red-500 text-sm mt-1">
        City must be at least 3 characters
      </p>
    )}

  {/*  Maximum length info */}
  {formData.city.length === 30 && (
    <p className="text-gray-500 text-sm mt-1">
      Maximum 30 characters reached
    </p>
  )}
</div>



            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your background and interests (optional)"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <Button className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Contactus;
