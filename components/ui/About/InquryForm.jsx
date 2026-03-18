//TODO: creaet route heandler for sending mail
import React, { useState } from 'react';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredProgram: '',
    contactMethod: '',
    referralSource: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactMethodChange = (method) => {
    setFormData({ ...formData, contactMethod: method });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend API
      // This is a placeholder for the actual API call
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitMessage('Thank you! Your enquiry has been sent successfully.');
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredProgram: '',
          contactMethod: '',
          referralSource: ''
        });
      } else {
        setSubmitMessage('There was an error sending your enquiry. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error sending your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full my-5 py-6 max-w-5xl mx-auto flex flex-col md:flex-row rounded-lg overflow-hidden">
      {/* Left Section - Title and Description */}
      <div className="w-full md:w-1/4 p-6 md:p-8 ">
        <h2 className="text-4xl font-bold mb-2">Join us Today</h2>
        <p className="text-gray-600 text-sm">
            send and enquiry to us and we will get back to you as soon as possible to help you with your needs.
        </p>
      </div>
      
      {/* Middle Section - Form */}
      <div className="w-full md:w-1/2 p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Full name</label>
            <div className="flex gap-3">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <p className="text-xs mt-1 text-gray-500">First</p>
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <p className="text-xs mt-1 text-gray-500">Last</p>
              </div>
            </div>
          </div>
          
          {/* Email Address */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          
          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          
          {/* Preferred Program */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Preferred Program</label>
            <select
              name="preferredProgram"
              value={formData.preferredProgram}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
              required
            >
              <option value="" disabled>Select preferred program</option>
              <option value="program1">Sunday Club</option>
              <option value="program2">Young Oraters</option>
              <option value="program3">Young Orator Junior</option>
            </select>
          </div>
          
          {/* Preferred Contact Method */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Preferred Contact Method</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleContactMethodChange('phone')}
                className={`px-4 py-1 border rounded-full text-sm ${
                  formData.contactMethod === 'phone' ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                }`}
              >
                Phone call
              </button>
              <button
                type="button"
                onClick={() => handleContactMethodChange('whatsapp')}
                className={`px-4 py-1 border rounded-full text-sm ${
                  formData.contactMethod === 'whatsapp' ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                }`}
              >
                Whatsapp
              </button>
              <button
                type="button"
                onClick={() => handleContactMethodChange('email')}
                className={`px-4 py-1 border rounded-full text-sm ${
                  formData.contactMethod === 'email' ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                }`}
              >
                Email
              </button>
            </div>
          </div>
          
          {/* Referral Source */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">How did you hear about us?</label>
            <input
              type="text"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              placeholder="Google search, Friend, Social media, etc"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-8 py-2 rounded-full inline-flex items-center transition-all duration-300"
            >
              {isSubmitting ? 'SENDING...' : 'SEND AN ENQUIRY'}
              {!isSubmitting && (
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Submission Message */}
          {submitMessage && (
            <div className={`mt-4 p-3 rounded text-center ${submitMessage.includes('error') ? 'bg-[#F6EDE2] text-[#7A5E3A]' : 'bg-green-100 text-green-800'}`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
      
      {/* Right Section - Images */}
      <div className="hidden md:block md:w-1/4 bg-blue-50">
        <div className="grid grid-rows-3 gap-3 p-4 h-full">
          <div className="bg-white rounded-lg overflow-hidden">
            <img src="" alt="Join Us" className="w-full h-full object-cover" />
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <img src="/api/placeholder/300/200" alt="Join Us Blocks" className="w-full h-full object-cover" />
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <img src="/api/placeholder/300/200" alt="Join Us Jenga" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;