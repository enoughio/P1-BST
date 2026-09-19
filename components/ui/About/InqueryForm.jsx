import { useState } from "react";

const AboutForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    Message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const respose = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!respose.ok) {
        throw new Error("Unable to send message");
      }
      // reset from fields after succesful submit
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 w-full mr-5">
      <div>
        <label
          htmlFor="fullName"
          className="block text-gray-800 font-medium mb-2"
        >
          Full name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border-b border-[#D9C7B4] focus:border-[#1F1B16] outline-none py-2"
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
          className="w-full border-b border-[#D9C7B4] focus:border-[#1F1B16] outline-none py-2"
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
          className="w-full border-b border-[#D9C7B4] focus:border-[#1F1B16] outline-none py-2"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-gray-800 font-medium mb-2"
        >
          Message
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border-b border-[#D9C7B4] focus:border-[#1F1B16] outline-none py-2"
        />
      </div>

      {status.message && (
        <div
          className={
            status.type === "success"
              ? "text-sm text-emerald-600"
              : "text-sm text-[#8A6D4D]"
          }
        >
          {status.message}
        </div>
      )}

      <div>
        <button
          type="submit"
          className="bg-[#E7D8C6] hover:bg-[#D9C7B4] text-[#1F1B16] font-medium py-3 px-6 rounded-full transition-colors flex items-center disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
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
};

export default AboutForm;
