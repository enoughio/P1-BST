"use client";
import { useState } from "react";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { addRegistration } from "@/lib/actions";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create form data for submission to Google Sheets
      const submitData = new FormData();
      submitData.append("name", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone || "");
      submitData.append("city", formData.city || "");
      submitData.append("profession", formData.profession || "");
      submitData.append("program", formData.program || "");
      submitData.append("message", formData.message || "");
      
      // Submit to Google Sheets using the addRegistration function
      const response = await addRegistration(submitData);
      
      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      // Show success state
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          message: "",
          occupation: "",
          program: "",
          profession: "",
          city: "",
          phone: "",
        });
      }, 5000);
      
    } catch (err) {
      console.error("Error submitting form:", err);
      setIsSubmitting(false);
      setError("There was an error submitting your message. Please try again or contact us directly.");
    }
  };

  // Success message component
  const SuccessMessage = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
      <p className="text-gray-600">
        Thank you for reaching out. We'll get back to you soon.
      </p>
    </div>
  );

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8 w-full mr-5">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

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
          type="tel"
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
          type="text"
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
          className="block text-gray-800 font-medium mb-2"
        >
          Select Profession
        </Label>

        <Select
          onValueChange={(value) => handleSelectChange("profession", value)}
          value={formData.profession}
        >
          <SelectTrigger className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2">
            <SelectValue placeholder="Select Profession" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Business Owner">
              Business Owner
            </SelectItem>
            <SelectItem value="Entrepreneur">
              Entrepreneur
            </SelectItem>
            <SelectItem value="Government Official">
              Government Official
            </SelectItem>
            <SelectItem value="Professionals">
              Professional
            </SelectItem>
            <SelectItem value="Self Employed">
              Self Employed
            </SelectItem>
            <SelectItem value="Student">
              Student
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="program"
          className="block text-gray-800 font-medium mb-2"
        >
          Select Program
        </Label>

        <Select
          onValueChange={(value) => handleSelectChange("program", value)}
          value={formData.program}
        >
          <SelectTrigger className="w-full border-b border-red-200 focus:border-red-500 outline-none py-2">
            <SelectValue placeholder="Select Program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="YoungOraters">
              YoungOrators (Age 5-10 years)
            </SelectItem>
            <SelectItem value="Young Leaders' Club">
              Young Leaders' Club (Age 11-17 years)
            </SelectItem>
            <SelectItem value="StoryTellers Club">
              Storytelling Club (Age 18+ years) 
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-gray-800 font-medium mb-2"
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
          disabled={isSubmitting}
          className="bg-red-400 hover:bg-red-500 text-gray-800 font-medium py-3 px-6 rounded-full transition-colors flex items-center"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              SENDING...
            </span>
          ) : (
            <span className="flex items-center">
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
            </span>
          )}
        </button>
      </div>
    </form>
  );
}