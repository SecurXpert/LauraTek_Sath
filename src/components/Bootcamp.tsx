import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import hackton from '../assets/hackton.png'
import learning from '../assets/learning.png'

const PythonAPICourse = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const sections = [
    { id: 'hero', label: 'About the course' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'course-journey', label: 'Course journey' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'faqs', label: 'FAQs' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Approximate height of header (top-0 + py-4 ~80px)
      const navHeight = 80; // Approximate height of nav (top-20 + py-4 ~80px)
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - (headerHeight + navHeight);
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveTab(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      });
      setActiveTab(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0b0d17] to-[#1a1d2e] font-sans text-white">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-white px-8 py-4 flex items-center justify-between border-b border-gray-200 z-50 shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="text-sm font-medium">
            <div className="text-gray-800">SecurXperts</div>
            <div className="text-gray-500">/python-api-course</div>
          </div>
        </div>

        {/* Request Callback Button */}
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
          Request callback
        </button>
      </header>

      {/* Main Content - Hero Section */}
      <section id="hero" className="pt-20 flex flex-col md:flex-row min-h-screen">
        {/* Left Section - Banner Content */}
        <div className="md:w-1/2 flex flex-col justify-between pt-8 pb-36 pl-8 md:pl-40 pr-4 md:pr-4 md:pt-12 md:pb-36">
          {/* For Professionals Section */}
          <div className="mb-4">
            <div className="bg-[#0b0d17] border border-blue-500/30 rounded-full px-12 py-3 flex justify-center shadow-lg shadow-blue-500/20">
              <span className="text-blue-400 font-bold text-lg flex items-center space-x-1">
                <span>✨</span>
                <span>For professionals</span>
                <span>✨</span>
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mt-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Python+API BootCamp
              <br />
              <span className="text-purple-400 text-3xl md:text-4xl">with Hands-on Projects</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Get years ahead in just six months through practice-based
              <br />
              learning and real-world projects.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 mb-12 text-sm opacity-80">
              <span className="bg-green-900/30 text-green-300 px-4 py-2 rounded-full">
                🟢 Live learning
              </span>
              <span className="bg-purple-900/30 text-purple-300 px-4 py-2 rounded-full">
                🟣 Python & API curriculum
              </span>
              <span className="bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full">
                🔵 Real world case studies
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-xs text-gray-300 mt-1">Live classes</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                <div className="text-2xl font-bold text-blue-400">100+</div>
                <div className="text-xs text-gray-300 mt-1">Companies Hiring</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                <div className="text-2xl font-bold text-purple-400">95%</div>
                <div className="text-xs text-gray-300 mt-1">Placement rate</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                <div className="text-2xl font-bold text-purple-400">100+</div>
                <div className="text-xs text-gray-300 mt-1">Learners</div>
              </div>
            </div>

            {/* Bottom Text */}
            <p className="text-sm text-gray-400">
              Know in-depth details in our free webinar{' '}
              <span className="text-blue-400">👇🏻</span>
            </p>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 text-gray-800">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Book a <span className="text-purple-500">free live webinar</span>{' '}
              <span className="text-sm font-normal text-gray-600">to know more</span>
            </h2>

            {/* Form */}
            <form className="space-y-2">
              {/* Name */}
              <div className="form-field">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Email"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-field">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 bg-gray-100 rounded-l-lg border border-gray-300 border-r-0">
                    <img
                      src="https://files.codingninjas.com/flag-5-1732876121.webp"
                      alt="Indian Flag"
                      className="h-4 w-4 mr-1"
                      height="16"
                      width="16"
                    />
                    <span className="text-xs font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Phone number"
                    required
                    pattern="[0-9]{10}"
                  />
                </div>
              </div>

              {/* Experience Radio Buttons */}
              <div className="experience-type-list-container space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  Experience <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-start py-2 cursor-pointer">
                    <input type="radio" className="mt-1 mr-3 w-4 h-4 text-purple-500" name="experience" value="1" required />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      Working professional - Technical roles
                    </span>
                  </label>
                  <label className="flex items-start py-2 cursor-pointer">
                    <input type="radio" className="mt-1 mr-3 w-4 h-4 text-purple-500" name="experience" value="2" required />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      Working professional - Non technical
                    </span>
                  </label>
                  <label className="flex items-start py-2 cursor-pointer">
                    <input type="radio" className="mt-1 mr-3 w-4 h-4 text-purple-500" name="experience" value="3" required />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      College student - Final year
                    </span>
                  </label>
                  <label className="flex items-start py-2 cursor-pointer">
                    <input type="radio" className="mt-1 mr-3 w-4 h-4 text-purple-500" name="experience" value="23" required />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      College student - 1st to pre-final year
                    </span>
                  </label>
                  <label className="flex items-start py-2 cursor-pointer">
                    <input type="radio" className="mt-1 mr-3 w-4 h-4 text-purple-500" name="experience" value="5" required />
                    <span className="text-sm text-gray-600 leading-relaxed">Others</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="shimmer-button">
                <button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Continue booking webinar</span>
                  <span>→</span>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="disclaimer-note-container text-xs text-gray-500 text-center leading-relaxed">
                I authorise SecurXperts to contact me with course updates & offers via Email/SMS/Whatsapp/Call. I have read and agree to{' '}
                <a href="https://www.securxperts.com/policy/privacy.pdf" target="_blank" rel="noopener noreferrer" className="text-purple-500 underline">
                  Privacy Policy
                </a>{' '}
                &{' '}
                <a href="https://www.securxperts.com/policy/tnc.pdf" target="_blank" rel="noopener noreferrer" className="text-purple-500 underline">
                  Terms of use
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Sticky Tabs Navigation - After Hero */}
      <nav className="sticky top-20 z-40 bg-white/80 backdrop-blur-md flex justify-center py-4 border-b border-gray-200">
        <div className="flex space-x-1 bg-white rounded-full p-1 shadow-lg max-w-4xl mx-auto">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-purple-50 text-purple-600 shadow-md'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Brochure Section - Curriculum */}
      <section id="curriculum" className="bg-white py-16 flex flex-col items-center justify-center text-center px-4 pt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Python+API course brochure</h3>
        <button className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors">
          Download Python+API course brochure
        </button>
      </section>

      {/* Bootcamp Journey Section */}
      <section id="course-journey" className="bg-purple-50 py-16 px-8 md:px-12 pt-16">
        {/* Journey Content */}
        <div className="max-w-6xl mx-auto relative">
          {/* Left Title Column */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 hidden md:block">
            <h2 className="text-5xl font-bold text-gray-800 mb-2 leading-tight">
              Learning Journey
            </h2>
            <h3 className="text-3xl font-semibold text-blue-600 mb-8 leading-tight">
              Your Learning Journey at SecurXperts Training Platform
              <br />
              <span className="text-purple-600">Transform your career</span>
            </h3>
          </div>

          {/* Flowchart */}
          <div className="ml-0 md:ml-80 flex flex-col space-y-8">
            {/* Stage 1 */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <span className="text-xl">🚀</span>
                </div>
                <div className="mt-2 bg-blue-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Step 1
                </div>
                <div className="flex-1 w-0.5 bg-gray-300 min-h-0 mt-4"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 max-w-xs min-h-[140px] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Register & Begin Your Journey</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Start your tech career with one click</li>
                      <li>• Sign up on the SecurXperts Training Platform</li>
                      <li>• Create your learner profile</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="mt-2 bg-pink-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Step 2
                </div>
                <div className="flex-1 w-0.5 bg-gray-300 min-h-0 mt-4"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 max-w-xs min-h-[140px] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Choose Your IT Program</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Explore our wide range of IT courses</li>
                      <li>• From Python and Full Stack to Cybersecurity</li>
                      <li>• Pick the one that matches your goals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <span className="text-2xl">📖</span>
                </div>
                <div className="mt-2 bg-green-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Step 3
                </div>
                <div className="flex-1 w-0.5 bg-gray-300 min-h-0 mt-4"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 max-w-xs min-h-[140px] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Learn. Practice. Master.</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Attend 100% live interactive sessions</li>
                      <li>• Guided by expert trainers like L. Kishore</li>
                      <li>• Practice through assignments and challenges</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <span className="text-2xl">🛠️</span>
                </div>
                <div className="mt-2 bg-blue-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Step 4
                </div>
                <div className="flex-1 w-0.5 bg-gray-300 min-h-0 mt-4"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 max-w-xs min-h-[140px] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Build Real-World Projects</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Work on projects simulating IT environments</li>
                      <li>• Develop web apps and automate workflows</li>
                      <li>• Get mentor feedback on every step</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div className="mt-2 bg-pink-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Step 5
                </div>
                <div className="flex-1 w-0.5 bg-gray-300 min-h-0 mt-4"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 max-w-xs min-h-[140px] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Get Career Mentorship</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Attend one-on-one career sessions</li>
                      <li>• Resume workshops and interview prep</li>
                      <li>• Grow from learner to job-ready professional</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 6 */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <span className="text-2xl">💼</span>
                </div>
                <div className="mt-2 bg-green-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Step 6
                </div>
                <div className="flex-1 w-0.5 bg-gray-300 min-h-0 mt-4"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 max-w-xs min-h-[140px] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Showcase Your Portfolio & Get Hired</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Upload verified projects</li>
                      <li>• Earn certificates</li>
                      <li>• Connect with hiring partners</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 7 */}
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <span className="text-2xl">🔄</span>
                </div>
                <div className="mt-2 bg-blue-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Step 7
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 max-w-xs min-h-[140px] flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Stay Updated. Keep Growing.</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Access webinars and tech events</li>
                      <li>• Advanced programs</li>
                      <li>• Continuous learning and community support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Webinar Button */}
          <div className="flex justify-center mt-16">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-colors">
              Book a free webinar
            </button>
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="bg-white py-16 px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Your Mentor – L. Kishore</h2>
          <p className="text-xl text-gray-600 mb-8">Python Developer & Team Lead at SecurXperts</p>
          <img 
            src="https://ui-avatars.com/api/?name=L.+Kishore&background=purple&color=white&size=128" 
            alt="L. Kishore" 
            className="w-32 h-32 rounded-full mx-auto mb-6" 
          />
          <p className="text-lg text-gray-700 leading-relaxed">
            Kishore is a passionate developer and mentor who believes in learning by building. He helps students understand coding concepts through real-world examples and guides them in transforming ideas into working projects. His sessions are interactive, practical, and focused on making every learner industry-ready.
          </p>
        </div>
      </section>

      {/* Bootcamp Benefits Section */}
      <section id="benefits" className="bg-gray-50 py-16 px-8 md:px-12 pt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Bootcamp Benefits</h2>
          {/* First Row - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <span className="text-4xl mb-4">👤</span>
              <h4 className="font-bold text-lg text-gray-800 mb-3">Mentor Sessions</h4>
              <p className="text-sm text-gray-600">mentor guidance for real coding clarity.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <span className="text-4xl mb-4">👨‍🏫</span>
              <h4 className="font-bold text-lg text-gray-800 mb-3">Expert Trainers</h4>
              <p className="text-sm text-gray-600">Learn from SecurXperts pros with 10+ years’ experience.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <span className="text-4xl mb-4">💼</span>
              <h4 className="font-bold text-lg text-gray-800 mb-3">Case Studies & Projects</h4>
              <p className="text-sm text-gray-600">Build real-world apps with hands-on learning.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <span className="text-4xl mb-4">💡</span>
              <h4 className="font-bold text-lg text-gray-800 mb-3">Instant Doubt Support</h4>
              <p className="text-sm text-gray-600">Get quick answers and never stay stuck.</p>
            </div>
          </div>
          {/* Second Row - 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <span className="text-4xl mb-4">📺</span>
              <h4 className="font-bold text-lg text-gray-800 mb-3">Live Interactive Classes</h4>
              <p className="text-sm text-gray-600">Practice coding live with instant feedback.</p>
            </div>
            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🎯</span>
              <h4 className="font-bold text-lg text-gray-800 mb-3">Career-Focused Path</h4>
              <p className="text-sm text-gray-600">Learn skills that make you job-ready fast.</p>
            </div>
            {/* Card 7 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🏆</span>
              <h4 className="font-bold text-lg text-gray-800 mb-3">Certificate from SecurXperts</h4>
              <p className="text-sm text-gray-600">Earn an official industry-recognized certificate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Bootcamp Benefits Section */}
      <section className="bg-black py-16 px-8 md:px-12 pt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Course benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-green-400">👥</span>
              <h4 className="font-bold text-lg text-white mb-3">1:1 expert session</h4>
              <p className="text-sm text-gray-300">Connects theoretical understanding with practical implementation through their insights</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-purple-400">👨‍🏫</span>
              <h4 className="font-bold text-lg text-white mb-3">Expert faculty with 15+ years</h4>
              <p className="text-sm text-gray-300">Experience enriched by practical knowledge and innovation</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-blue-400">⚡</span>
              <h4 className="font-bold text-lg text-white mb-3">Case studies to make you job-ready</h4>
              <p className="text-sm text-gray-300">Hands-on learning to spark creative problem-solving</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-purple-400">🖐️</span>
              <h4 className="font-bold text-lg text-white mb-3">Quick doubt support</h4>
              <p className="text-sm text-gray-300">Personalised assistance for clear understanding of concepts</p>
            </div>
            {/* Card 5 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-blue-400">📱</span>
              <h4 className="font-bold text-lg text-white mb-3">Live classes</h4>
              <p className="text-sm text-gray-300">Learn by practice with instant feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Beyond Learning Section */}
      <section className="bg-black py-16 px-8 md:px-12 pt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Benefits beyond learning</h2>
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Card 1: GitHub */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-green-400">🐱‍💻</span>
              <h4 className="font-bold text-lg text-white mb-3">GitHub profile</h4>
            </div>
            {/* Card 2: LinkedIn */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-blue-400">💼</span>
              <h4 className="font-bold text-lg text-white mb-3">LinkedIn profile</h4>
            </div>
            {/* Card 3: Resume */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-purple-400">📄</span>
              <h4 className="font-bold text-lg text-white mb-3">Resume writing</h4>
            </div>
          </div>
          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 4: Soft skills */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-purple-400">✏️</span>
              <h4 className="font-bold text-lg text-white mb-3">Soft skills</h4>
              <p className="text-sm text-gray-300">Master communication and salary negotiation skills.</p>
            </div>
            {/* Card 5: Interview preparation */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl mb-4 text-blue-400">👥</span>
              <h4 className="font-bold text-lg text-white mb-3">Interview preparation</h4>
              <p className="text-sm text-gray-300">Mock interviews and expert support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="bg-black py-16 px-8 md:px-12 pt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Student Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <img 
                src="https://ui-avatars.com/api/?name=Ananya+Reddy&background=0D8ABC&color=fff&size=64" 
                alt="Ananya Reddy" 
                className="w-16 h-16 rounded-full mx-auto mb-4" 
              />
              <h4 className="font-bold text-white text-center mb-1">Ananya Reddy</h4>
              <p className="text-gray-400 text-sm text-center mb-4">B.Tech CSE, G. Narayanamma College</p>
              <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed">
                Best Bootcamp Experience Ever! “I never thought learning APIs could be this fun! The mentors explained every concept clearly, and building a Swiggy-like app gave me real project confidence.”
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button className="text-purple-400 text-sm hover:text-purple-300">Post →</button>
                <img 
                  src="https://via.placeholder.com/32x32/0066CC/FFFFFF?text=GN" 
                  alt="G. Narayanamma College" 
                  className="h-8" 
                />
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <img 
                src="https://ui-avatars.com/api/?name=Rohit+Verma&background=FF6B35&color=fff&size=64" 
                alt="Rohit Verma" 
                className="w-16 h-16 rounded-full mx-auto mb-4" 
              />
              <h4 className="font-bold text-white text-center mb-1">Rohit Verma</h4>
              <p className="text-gray-400 text-sm text-center mb-4">BCA Student, Aurora’s Degree College</p>
              <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed">
                From Beginner to Confident Coder “I joined with zero Python knowledge, but now I can create APIs and connect databases easily. The live sessions and instant doubt support made a big difference!”
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button className="text-purple-400 text-sm hover:text-purple-300">Post →</button>
                <img 
                  src="https://via.placeholder.com/32x32/FF6B35/FFFFFF?text=AD" 
                  alt="Aurora’s Degree College" 
                  className="h-8" 
                />
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <img 
                src="https://ui-avatars.com/api/?name=Megha+Singh&background=FF0000&color=fff&size=64" 
                alt="Megha Singh" 
                className="w-16 h-16 rounded-full mx-auto mb-4" 
              />
              <h4 className="font-bold text-white text-center mb-1">Megha Singh</h4>
              <p className="text-gray-400 text-sm text-center mb-4">MCA, Osmania University</p>
              <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed">
                Practical Learning That Works! “The mentors were very supportive, and the case studies helped me understand how real apps work. The SecurXperts certificate added great value to my resume.”
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button className="text-purple-400 text-sm hover:text-purple-300">Post →</button>
                <img 
                  src="https://via.placeholder.com/32x32/FF0000/FFFFFF?text=OU" 
                  alt="Osmania University" 
                  className="h-8" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10X Club Section */}
      <section className="py-16 px-8 md:px-12 bg-white pt-16">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 leading-tight">
      Your One-Stop Destination to Code, Build & Grow
    </h2>
    <p className="text-xl font-semibold text-gray-700 text-center mb-12">
      Unlock learning, innovation, and career success — from Zero to Pro with SecurXperts.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* 10X Card */}
      <div className="bg-white shadow-md rounded-3xl p-6 border border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
            <span className="text-2xl font-bold text-white">10X</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Unlock learning, innovation, and career success — from Zero to Pro
            </h3>
            <p className="text-purple-600 font-semibold">with SecurXperts</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Industry Expert Sessions
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            CXO Connect
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Tech Conference & Bootcamp Events
          </button>
        </div>

        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={learning}
            alt="Group discussion"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>

      {/* Hackathons Card */}
      <div className="bg-white shadow-md rounded-3xl p-6 border border-gray-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Hackathons & Hands-On Workshops</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Build your first live API project and integrate it with real applications like Swiggy or Zomato. Practice coding, collaborate, and contribute to open-source challenges.
          </p>
        </div>
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={hackton}
            alt="Hackathon"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>

    {/* Bottom Row - Three Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Learn from CXOs Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white">👑</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900">
            Industry Expert Sessions
          </h4>
        </div>
        <p className="text-gray-600 mb-4">
          Learn from Tech Leaders, Founders & CXOs who’ve built real-world products and teams. Gain exclusive insights into coding, APIs, and app development directly from experts.
        </p>
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="https://ui-avatars.com/api/?name=Paul+Hunkin&background=8B5CF6&color=fff&size=40"
            alt="Paul Hunkin"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm">Paul Hunkin</p>
            <p className="text-gray-500 text-xs">Founder, Jsonify</p>
          </div>
        </div>
      </div>

      {/* Hands-on Workshops Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white">🛠️</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900">
            Hackathons & Hands-On Workshops
          </h4>
        </div>
        <p className="text-gray-600 mb-6">
          Build your first live API project and integrate it with real applications like Swiggy or Zomato. Practice coding, collaborate, and contribute to open-source challenges.
        </p>
        <img
          src="https://source.unsplash.com/random/300x200/?workshop,technology"
          alt="Workshop"
          className="w-full rounded-xl object-cover"
        />
      </div>

      {/* Partner Events Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white">🤝</span>
          </div>
          <h4 className="font-bold text-lg text-gray-900">
            Tech Conference & Bootcamp Events
          </h4>
        </div>
        <p className="text-gray-600">
          Join our live hackathons, workshops, and coding sprints. Experience hands-on learning while working on real-world projects guided by professionals.
        </p>
      </div>
    </div>
    <div className="mt-8 p-6 bg-purple-50 rounded-2xl text-center">
      <h4 className="text-lg font-bold text-gray-900 mb-2">Certificate of Achievement</h4>
      <p className="text-gray-600">Earn a recognized Certificate from SecurXperts Technologies Pvt. Ltd., to boost your career profile.</p>
    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section id="faqs" className="bg-white py-16 px-8 md:px-12 pt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">What is this training platform about?</summary>
              <p className="text-gray-600 mt-2">It’s a live learning platform by SecurXperts where students can learn real-world tech skills through hands-on projects and guided mentorship.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">Do I need prior coding experience to join?</summary>
              <p className="text-gray-600 mt-2">No, the platform is beginner-friendly. You’ll start from the basics and progress toward building real-world applications.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">Who will be my mentor?</summary>
              <p className="text-gray-600 mt-2">You’ll be guided by L. Kishore, Python Developer & Team Lead at SecurXperts, known for his practical teaching and real-world approach to coding.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">What will I learn in the program?</summary>
              <p className="text-gray-600 mt-2">You’ll learn essential tech skills across multiple domains like Python, API integration, SQL, data handling, and project implementation.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">Are the classes live or recorded?</summary>
              <p className="text-gray-600 mt-2">All sessions are 100% live and interactive, ensuring you get real-time support and clarity.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">Will I get a certificate after completion?</summary>
              <p className="text-gray-600 mt-2">Yes, you’ll receive an industry-recognized certificate from SecurXperts Technologies Pvt. Ltd.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">Can I work on projects during the program?</summary>
              <p className="text-gray-600 mt-2">Absolutely. Every student builds real-world projects under mentor guidance, making your learning hands-on and practical.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">How can I get my doubts cleared?</summary>
              <p className="text-gray-600 mt-2">You’ll have access to instant doubt support during live sessions and mentor guidance in dedicated Q&A channels.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">Is this bootcamp suitable for college students?</summary>
              <p className="text-gray-600 mt-2">Yes, it’s designed for students, freshers, and professionals who want to upskill or prepare for tech placements.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-gray-800 cursor-pointer">How can I register?</summary>
              <p className="text-gray-600 mt-2">Click the “Register Now” button, fill in your details, and you’ll receive your login access and next-step instructions instantly.</p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PythonAPICourse;