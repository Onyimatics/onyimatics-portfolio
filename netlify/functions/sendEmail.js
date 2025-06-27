require("dotenv").config();

const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { name, email, subject, message } = JSON.parse(event.body);

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        origin: process.env.EMAILJS_ORIGIN || "http://localhost",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          user_name: name,
          user_email: email,
          subject,
          message,
        },
      }),
    });

    const responseText = await res.text(); // Capture actual response

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, info: responseText }),
      };
    } else {
      console.error("EmailJS Error:", responseText);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: responseText }),
      };
    }
  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
