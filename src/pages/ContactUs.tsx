import React from 'react';
import Header from '@/components/Header';
import ContactHeroSection from '@/components/contact/ContactHeroSection';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactFAQSection from '@/components/contact/ContactFAQSection';
import ContactNewsletterFooter from '@/components/contact/ContactNewsletterFooter';

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <ContactHeroSection />

        {/* Info Cards */}
        <ContactInfoCards />

        {/* Contact Form & Map */}
        <ContactFormSection />

        {/* FAQ Section */}
        <ContactFAQSection />

        {/* Newsletter & Footer */}
        <ContactNewsletterFooter />

      </main>
    </div>
  );
};

export default ContactUs;
