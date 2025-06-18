'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8 w-full mr-5">
      <div>
        <label htmlFor="fullName" className="block text-gray-800 font-medium mb-2">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border-b border-pink-200 focus:border-pink-500 outline-none py-2"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b border-pink-200 focus:border-pink-500 outline-none py-2"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-gray-800 font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border-b border-pink-200 focus:border-pink-500 outline-none py-2 min-h-[80px]"
          required
        />
      </div>
      
      <div>
        <button 
          type="submit" 
          className="bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium py-3 px-6 rounded-full transition-colors flex items-center"
        >
          SEND MESSAGE
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  );
}