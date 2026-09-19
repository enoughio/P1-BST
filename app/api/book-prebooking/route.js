import nodemailer from "nodemailer"

const getTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const service = process.env.SMTP_SERVICE

  if (service) {
    return nodemailer.createTransport({ service, auth: { user, pass } })
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

const isMissing = (...values) => values.some((value) => !value || String(value).trim() === "")
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[character]))

export async function POST(request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, quantity, address, city, pincode } = body

    if (isMissing(fullName, email, phone, quantity, address, city, pincode)) {
      return Response.json({ error: "Missing required fields." }, { status: 400 })
    }

    if (!/^\S+@\S+\.\S+$/.test(email) || !/^\d{6}$/.test(pincode)) {
      return Response.json({ error: "Please provide valid contact and PIN details." }, { status: 400 })
    }

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER
    const toAddress = process.env.SMTP_TO

    if (isMissing(fromAddress, toAddress, process.env.SMTP_USER, process.env.SMTP_PASS)) {
      return Response.json({ error: "Email service is not configured." }, { status: 500 })
    }

    const safe = {
      fullName: escapeHtml(fullName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      quantity: escapeHtml(quantity),
      address: escapeHtml(address).replace(/\n/g, "<br />"),
      city: escapeHtml(city),
      pincode: escapeHtml(pincode),
    }

    await getTransporter().sendMail({
      from: `Bharat Storytellers <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `New book pre-booking: ${fullName}`,
      text: [
        "New The Decoy Principle pre-booking request:",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Copies: ${quantity}`,
        `Delivery address: ${address}`,
        `City: ${city}`,
        `PIN code: ${pincode}`,
        "Delivery fee: ₹40 extra",
      ].join("\n"),
      html: `
        <h2>New The Decoy Principle pre-booking request</h2>
        <p><strong>Name:</strong> ${safe.fullName}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Copies:</strong> ${safe.quantity}</p>
        <p><strong>Delivery address:</strong><br />${safe.address}</p>
        <p><strong>City:</strong> ${safe.city}</p>
        <p><strong>PIN code:</strong> ${safe.pincode}</p>
        <p><strong>Delivery fee:</strong> ₹40 extra</p>
      `,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error("Book pre-booking error:", error)
    return Response.json({ error: "Unable to send pre-booking request." }, { status: 500 })
  }
}
