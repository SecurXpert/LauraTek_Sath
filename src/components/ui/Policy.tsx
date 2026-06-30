import React from 'react';
import Footer from '../Footer';
import Header from '../Header';


const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
         <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>
      {/* Header */}
      <header className="bg-gradient-to-br from-course-hero via-primary to-course-gradient-end text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
       
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Name, contact number, email, educational details</li>
            <li>Course progress, feedback, assessments</li>
            <li>IP address, device/browser type (for technical analysis)</li>
          </ul>
        </section>

        {/* Use of Your Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>To provide personalized learning experiences</li>
            <li>To communicate course updates, schedules, or placement opportunities</li>
            <li>For internal analytics and improving our services</li>
          </ul>
        </section>

        {/* Data Sharing & Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Sharing & Security</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>We do not sell or rent your data to third parties.</li>
            <li>Data may be shared with trusted partners (e.g., trainers, hiring companies) solely for training or placement purposes.</li>
            <li>We use encryption, secure servers, and access control to protect your data.</li>
          </ul>
        </section>

        {/* Cookies & Tracking */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies & Tracking</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>We use cookies for session management and user experience.</li>
            <li>You can manage cookie preferences via your browser settings.</li>
          </ul>
        </section>

        {/* Third-Party Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Links</h2>
          <p className="text-gray-600">
            Our platform may contain links to third-party platforms (Zoom, payment gateways, job portals). We are not responsible for their content or privacy practices.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>You can request access, update, or delete your personal data.</li>
            <li>
              To exercise your rights, contact us at{' '}
              <a href="mailto:info@lauratek.in" className="text-blue-600 hover:underline">
                info@lauratek.in
              </a>.
            </li>
          </ul>
        </section>

        {/* Changes to This Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update these terms and our privacy practices from time to time. Updates will be posted on this page.
          </p>
        </section>
      </main>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
