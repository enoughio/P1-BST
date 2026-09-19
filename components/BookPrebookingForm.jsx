"use client"

import { useState } from "react"

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  quantity: "1",
  address: "",
  city: "",
  pincode: "",
}

export default function BookPrebookingForm() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: "", message: "" })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: "", message: "" })

    try {
      const response = await fetch("/api/book-prebooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Unable to send pre-booking")
      }

      setStatus({
        type: "success",
        message: "Your pre-booking request is with us. We will confirm the next steps by email.",
      })
      setFormData(initialForm)
    } catch {
      setStatus({
        type: "error",
        message: "We could not send your request. Please try again or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="prebooking-form" onSubmit={handleSubmit}>
      <div className="prebooking-form__fields">
        <label>
          Full name
          <input name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <label>
          Email address
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone number
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Copies
          <input name="quantity" type="number" min="1" max="20" value={formData.quantity} onChange={handleChange} required />
        </label>
      </div>
      <label>
        Delivery address
        <textarea name="address" rows="3" value={formData.address} onChange={handleChange} required />
      </label>
      <div className="prebooking-form__fields prebooking-form__fields--location">
        <label>
          City
          <input name="city" value={formData.city} onChange={handleChange} required />
        </label>
        <label>
          PIN code
          <input name="pincode" inputMode="numeric" pattern="[0-9]{6}" value={formData.pincode} onChange={handleChange} required />
        </label>
      </div>
      <p className="prebooking-form__note">
        Delivery fee: <strong>₹40 extra</strong>. The team will confirm availability, final pricing, and payment details with you.
      </p>
      {status.message && (
        <p className={status.type === "success" ? "prebooking-form__status prebooking-form__status--success" : "prebooking-form__status prebooking-form__status--error"}>
          {status.message}
        </p>
      )}
      <button className="book-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending request..." : "Send pre-booking request"}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  )
}
