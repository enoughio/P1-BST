import nodemailer from "nodemailer"

const getTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const service = process.env.SMTP_SERVICE

  if (service) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass },
    })
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

const isMissing = (...values) => values.some((value) => !value || value.trim() === "")

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      fullName,
      email,
      phone,
      ageGroup,
      category,
      school,
      city,
      message,
      eventTitle,
      eventSlug,
    } = body

    if (isMissing(fullName, email, phone, ageGroup, category, school, eventTitle)) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400 })
    }

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER
    const toAddress = process.env.SMTP_TO

    if (isMissing(fromAddress, toAddress, process.env.SMTP_USER, process.env.SMTP_PASS)) {
      return new Response(JSON.stringify({ error: "Email service is not configured." }), { status: 500 })
    }

    const transporter = getTransporter()

    await transporter.sendMail({
      from: `Bharat Storytellers <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `Event registration: ${eventTitle}`,
      text: [
        "New event registration:",
        `Event: ${eventTitle}`,
        `Slug: ${eventSlug || ""}`,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Age group: ${ageGroup}`,
        `Category: ${category}`,
        `School: ${school}`,
        `City: ${city || ""}`,
        "",
        message || "",
      ].join("\n"),
      html: `
        <h2>New event registration</h2>
        <p><strong>Event:</strong> ${eventTitle}</p>
        <p><strong>Slug:</strong> ${eventSlug || ""}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Age group:</strong> ${ageGroup}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>School:</strong> ${school}</p>
        <p><strong>City:</strong> ${city || ""}</p>
        <p><strong>Message:</strong></p>
        <p>${(message || "").replace(/\n/g, "<br />")}</p>
      `,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (error) {
    console.error("Event registration error:", error)
    return new Response(JSON.stringify({ error: "Unable to send registration." }), { status: 500 })
  }
}
