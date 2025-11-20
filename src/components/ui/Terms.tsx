import React from 'react';
import Header from '../Header';
import Footer from '../Footer';


const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
         <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>
      {/* Header */}
      <header className="bg-gradient-to-br from-course-hero via-primary to-course-gradient-end text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About LauraTek</h2>
          <p className="text-gray-600">
            At LauraTek, we empower careers through industry-aligned training and placement programs designed for the digital age. Headquartered in Hyderabad, we specialize in delivering hybrid learning experiences—seamlessly blending online flexibility with offline mentorship.
          </p>
        </section>

        {/* Acceptance of Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-600">
            By registering or accessing any part of the LauraTek platform, you agree to comply with and be bound by these Terms and our{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </section>

        {/* Services Provided */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services Provided</h2>
          <p className="text-gray-600 mb-4">LauraTek offers:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Instructor-led training programs (online + offline)</li>
            <li>Internship and placement support</li>
            <li>Skill-based assessments and certifications</li>
            <li>Access to recorded and live sessions</li>
          </ul>
        </section>

        {/* User Responsibilities */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Provide accurate personal and educational details.</li>
            <li>Maintain confidentiality of login credentials.</li>
            <li>Use the platform for learning and career development purposes only.</li>
            <li>Avoid plagiarism or unauthorized sharing of course materials.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>All content, materials, and recordings are the property of LauraTek.</li>
            <li>You may not reproduce, share, or distribute content without written permission.</li>
          </ul>
        </section>

        {/* Placement Assistance Disclaimer */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Placement Assistance Disclaimer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>LauraTek provides placement support but does not guarantee a job.</li>
            <li>Placement depends on individual performance, eligibility, and market conditions.</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default TermsAndConditions;