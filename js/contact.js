// Contact form handling with EmailJS
// Ensure you have included the EmailJS SDK in your HTML file
// <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
// Initialize EmailJS with your user ID


document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  const res = await fetch("/.netlify/functions/sendEmail", {
    method: "POST",
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (result.success) {
    showBanner("✅ Message sent successfully!", "success");
    form.reset();
  } else {
    showBanner("❌ Something went wrong.", "error");
  }
});

