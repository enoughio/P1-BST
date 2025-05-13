"use client";
import { useState } from "react";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    occupation: "",
    program: "",
    profession: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ fullName: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8 w-full mr-5">
      <div>
        <label
          htmlFor="fullName"
          className="block text-gray-800 font-medium mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2"
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
          className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-gray-800 font-medium mb-2">
          Phone
        </label>
        <input
          type="phone"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-gray-800 font-medium mb-2">
          City Of Residence
        </label>
        <input
          type="city"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2"
          required
        />
      </div>

      <div>
        <Label
          htmlFor="profession"
          className="block border-b  border-red-200 focus:border-red-500 outline-none py-2 text-base"
        >
          Select Profession
        </Label>

        <Select
        type="profession"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2"
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Profession" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={1} value={`Business_Owner`}>
              Business Owner
            </SelectItem>
            <SelectItem key={2} value={`Entrepreneur`}>
              Entrepreneur
            </SelectItem>
            <SelectItem key={3} value={`Government_Official`}>
              Government Official
            </SelectItem>
            <SelectItem key={4} value={`Self_Employed`}>
              Self Employed
            </SelectItem>
            <SelectItem key={3} value={`Student`}>
              Student
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      
      <div>
        <Label
          htmlFor="program"
          className="block border-b border-red-200 focus:border-red-500 outline-none py-2 font-medium text-base"
        >
          Select Program
        </Label>

        <Select
          type="program"
          id="program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2"
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Program" />
          </SelectTrigger>
          <SelectContent>
            
            <SelectItem key={1} value={`YoungOraters`}>
              YoungOrators (Age 5-10 years)
            </SelectItem>
            <SelectItem key={3} value={`Young Leaders`}>
              Young Leaders' Club (Age 11-17 years)
            </SelectItem>
            <SelectItem key={2} value={`StoryTellers`}>
              Storytelling Club (Age 18+ years) 
            </SelectItem>
            
          </SelectContent>
        </Select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block border-b border-red-200 focus:border-red-500 outline-none py-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2 min-h-[80px]"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-red-400 hover:bg-red-500 text-gray-800 font-medium py-3 px-6 rounded-full transition-colors flex items-center"
        >
          SEND MESSAGE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
