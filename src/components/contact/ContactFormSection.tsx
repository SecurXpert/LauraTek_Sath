import React, { useState } from 'react';
import { VITE_API_URL } from '../../services/api/api';

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    purpose: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone_number: false,
    purpose: false,
    message: false
  });

  const validateForm = () => {
    let isValid = true;
    const errors = { name: '', email: '', phone_number: '', purpose: '', message: '' };

    if (formData.name) {
      if (!/^[A-Za-z\s]+$/.test(formData.name)) {
        errors.name = 'Only alphabets and spaces allowed.';
        isValid = false;
      } else if (formData.name.trim().length < 2 || formData.name.trim().length > 50) {
        errors.name = 'Must be between 2 and 50 characters.';
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (formData.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Must be a valid email.';
        isValid = false;
      } else if (formData.email.length < 5 || formData.email.length > 100) {
        errors.email = 'Must be between 5 and 100 characters.';
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (formData.phone_number) {
      if (!/^[0-9]+$/.test(formData.phone_number)) {
        errors.phone_number = 'Only numbers allowed.';
        isValid = false;
      } else if (formData.phone_number.length !== 10) {
        errors.phone_number = 'Must be exactly 10 digits.';
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (formData.purpose) {
      if (!/^[A-Za-z0-9\s.,&-]+$/.test(formData.purpose)) {
        errors.purpose = 'Only alphanumeric and basic punctuation allowed.';
        isValid = false;
      } else if (formData.purpose.trim().length < 3 || formData.purpose.trim().length > 100) {
        errors.purpose = 'Must be between 3 and 100 characters.';
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (formData.message) {
      if (formData.message.trim().length < 10 || formData.message.trim().length > 200) {
        errors.message = 'Must be between 10 and 200 characters.';
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return { isValid, errors };
  };

  const { isValid, errors } = validateForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    
    if (name === 'name') {
      value = value.replace(/[^A-Za-z\s]/g, '');
    }
    
    if (name === 'phone_number') {
      value = value.replace(/[^0-9]/g, '');
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const BASE_URL = VITE_API_URL;
      const response = await fetch(`${BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', phone_number: '', purpose: '', message: '' });
        setTouched({ name: false, email: false, phone_number: false, purpose: false, message: false });
      } else {
        const errorData = await response.json();
        setSubmitMessage({ type: 'error', text: errorData.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
              
              {/* Map Column */}
              <div className="rounded-[24px] overflow-hidden shadow-sm h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                <iframe 
                  src="https://maps.google.com/maps?q=SecurXpert%20Technologies%20Pvt.%20Ltd.,%20Hyderabad&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full border-0"
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SecurXpert Technologies Map"
                ></iframe>
              </div>

              {/* Contact Form Column */}
              <div className="bg-[#F3F4F6] rounded-[24px] p-6 md:p-10 lg:p-14 shadow-sm flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h4 className="text-[#1D4ED8] font-bold text-[15px] mb-2 tracking-wide">Get In Touch</h4>
                  <h2 className="text-[#050816] font-extrabold text-[32px] md:text-[38px] leading-tight">Have Any Question?</h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {submitMessage && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {submitMessage.text}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium text-[14px] mb-2">Your Name*</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required minLength={2} maxLength={50} placeholder="Name" className={`w-full px-5 py-3.5 rounded-xl shadow-sm text-[14px] outline-none ${touched.name && errors.name ? 'border-2 border-red-500 focus:border-red-500' : 'border-none focus:ring-2 focus:ring-[#1D4ED8]'}`} />
                      {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium text-[14px] mb-2">Email Address*</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required minLength={5} maxLength={100} placeholder="Email" className={`w-full px-5 py-3.5 rounded-xl shadow-sm text-[14px] outline-none ${touched.email && errors.email ? 'border-2 border-red-500 focus:border-red-500' : 'border-none focus:ring-2 focus:ring-[#1D4ED8]'}`} />
                      {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium text-[14px] mb-2">Phone Number*</label>
                      <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} onBlur={handleBlur} required minLength={10} maxLength={10} placeholder="+91" className={`w-full px-5 py-3.5 rounded-xl shadow-sm text-[14px] outline-none ${touched.phone_number && errors.phone_number ? 'border-2 border-red-500 focus:border-red-500' : 'border-none focus:ring-2 focus:ring-[#1D4ED8]'}`} />
                      {touched.phone_number && errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium text-[14px] mb-2">purpose*</label>
                      <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} onBlur={handleBlur} required minLength={3} maxLength={100} placeholder="Subject" className={`w-full px-5 py-3.5 rounded-xl shadow-sm text-[14px] outline-none ${touched.purpose && errors.purpose ? 'border-2 border-red-500 focus:border-red-500' : 'border-none focus:ring-2 focus:ring-[#1D4ED8]'}`} />
                      {touched.purpose && errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium text-[14px] mb-2">Describe your message*</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} required minLength={10} maxLength={200} placeholder="Message" rows={4} className={`w-full px-5 py-3.5 rounded-xl shadow-sm text-[14px] outline-none resize-none ${touched.message && errors.message ? 'border-2 border-red-500 focus:border-red-500' : 'border-none focus:ring-2 focus:ring-[#1D4ED8]'}`}></textarea>
                    {touched.message && errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting || !isValid} className={`w-full bg-[#1E3A8A] hover:bg-[#1e3a8a]/90 text-white font-semibold py-4 rounded-xl transition-colors shadow-md text-[15px] ${(isSubmitting || !isValid) ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {isSubmitting ? 'Submitting...' : 'Submit Now'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
  );
};

export default ContactFormSection;
