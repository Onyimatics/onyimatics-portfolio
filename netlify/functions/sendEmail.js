const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { name, email, subject, message } = JSON.parse(event.body);

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "origin": "http://localhost", // adjust for Netlify in prod
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        user_name: name,
        user_email: email,
        subject: subject,
        message: message,
      }
    })
  });

  if (res.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false })
    };
  }
};
