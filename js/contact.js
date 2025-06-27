// Contact form handling with EmailJS
// Ensure you have included the EmailJS SDK in your HTML file
// <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
// Initialize EmailJS with your user ID

function showBanner(message, type = "info") {
  const banner = document.createElement("div");
  banner.textContent = message;

  banner.style.position = "fixed";
  banner.style.bottom = "20px";
  banner.style.left = "50%";
  banner.style.transform = "translateX(-50%)";
  banner.style.padding = "12px 24px";
  banner.style.borderRadius = "6px";
  banner.style.fontSize = "16px";
  banner.style.fontWeight = "500";
  banner.style.zIndex = "9999";
  banner.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  banner.style.color = "#fff";

  if (type === "success") {
    banner.style.backgroundColor = "#28a745";
  } else if (type === "error") {
    banner.style.backgroundColor = "#dc3545";
  } else {
    banner.style.backgroundColor = "#007bff";
  }

  document.body.appendChild(banner);

  setTimeout(() => {
    banner.style.opacity = "0";
    banner.style.transition = "opacity 0.3s ease";
  }, 3000);

  setTimeout(() => {
    banner.remove();
  }, 3500);
}
// Ensure you have included the EmailJS SDK in your HTML file
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

