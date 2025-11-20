import React from 'react';
import Header from '../Header';
import Footer from '../Footer';


const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="sticky top-0 z-50 bg-background">
          <Header />
        </div>
      {/* Header */}
      <header className="bg-gradient-to-br from-course-hero via-primary to-course-gradient-end text-white text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">LauraTek Support</h1>
          <p className="mt-2 text-lg">We’re here to help you every step of the way.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to You</h2>
          <p className="text-gray-600">
            At LauraTek, we believe that learning never stops—and neither does our support. Whether you’re facing technical challenges, need help with your course, or have questions about placement, our dedicated support team is here to assist you every step of the way.
          </p>
        </section>

        {/* What We Help With */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Help With</h2>
          <p className="text-gray-600 mb-4">We understand that issues can arise, especially in a hybrid learning environment. That’s why our support covers:</p>
          <ul className="space-y-6 text-gray-600">
            <li>
              <strong className="font-medium">Login & Account Access</strong>
              <p>Trouble signing in or resetting your password? We’ll help you regain access to your student dashboard quickly.</p>
            </li>
            <li>
              <strong className="font-medium">Course Access & Content Issues</strong>
              <p>Can’t find your live class link or recorded sessions? Our team ensures uninterrupted access to your enrolled content.</p>
            </li>
            <li>
              <strong className="font-medium">Live Class Timings & Changes</strong>
              <p>Need clarity on your upcoming sessions or notified about a schedule change? We’ll keep you updated in real-time.</p>
            </li>
            <li>
              <strong className="font-medium">Placement Support Queries</strong>
              <p>Want to know your placement eligibility, mock interview schedules, or how to build your resume? Reach out to us.</p>
            </li>
            <li>
              <strong className="font-medium">Payments & Refunds</strong>
              <p>Need help with payment confirmation, fee receipts, or refund status? We’re here to guide you through every step.</p>
            </li>
          </ul>
        </section>

        {/* How to Reach Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Reach Us</h2>
          <p className="text-gray-600 mb-4">Our support team is available Monday to Saturday | 9:30 AM – 6:30 PM IST</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              <strong className="font-medium">Email Support:</strong>{' '}
              <a href="mailto:info@lauratek.in" className="text-blue-600 hover:underline">
                info@lauratek.in
              </a>
            </li>
            <li>
              <strong className="font-medium">Phone & WhatsApp Support:</strong>{' '}
              <a href="tel:+917993256679" className="text-blue-600 hover:underline">
                +91-7993256679
              </a>
            </li>
          </ul>
        </section>

        {/* Response Time */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Response Time</h2>
          <p className="text-gray-600">
            We aim to respond to all queries within 24 hours on working days. Our learners are our priority, and we strive to resolve your concerns efficiently and with care.
          </p>
        </section>

        {/* Need Help Right Now */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need Help Right Now?</h2>
          <p className="text-gray-600">
            If you’re facing an urgent issue or have a detailed question, you can fill out our{' '}
            <a href="/support-request" className="text-blue-600 hover:underline">
              support request form
            </a>{' '}
            on the website, and our team will get in touch with you shortly.
          </p>
        </section>
      </main>

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default Support;