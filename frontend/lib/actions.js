"use server"

// Google Script URL for the contact form
const googleScriptURLContact = "https://script.google.com/macros/s/AKfycby7pgr9knZp2dLS9UIujytVS4u0entHIs0UzDKVoAMXibeqRpAg_wavJgTENEqInxLsAA/exec"

/**
 * Adds a form submission to Google Sheets
 * @param {FormData} formData - Form data containing contact information
 * @returns {Object} - Success or error message
 */
export const addRegistration = async (formData) => {
    // Extract values from FormData
    const name = formData.get("name")
    const phone = formData.get("phone")
    const email = formData.get("email")
    const city = formData.get("city")
    const profession = formData.get("profession")
    const program = formData.get("program")
    const message = formData.get("message")
    
    try {
        // Log data for debugging (optional)
        console.log("Registration Data:", { 
            name, phone, email, city, profession, program, message 
        });
        
        // Send data to Google Sheets
        const res = await fetch(googleScriptURLContact, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                city,
                profession,
                program,
                message
            })
        })
        
        if(!res.ok) {
            throw new Error("Failed to add registration to Google spreadsheet")
        }
        
        return {successMessage: `Your message has been sent successfully!`}
    } catch (error) {
        console.error("Error adding registration:", error)
        return {errorMessage: `There was a problem with sending your message!`}
    }
}