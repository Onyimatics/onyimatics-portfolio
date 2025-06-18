document.addEventListener("DOMContentLoaded", () => {
    // Mobile Nav
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    hamburger?.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  
    // Smooth scroll
    document.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        const offset = document.querySelector("header").offsetHeight;
        window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  
    // Project filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        const filter = button.dataset.filter;
        projectCards.forEach(card => {
          const match = filter === "all" || card.dataset.category.includes(filter);
          card.style.display = match ? "block" : "none";
        });
      });
    });
  
    // Contact form
    document.getElementById("contactForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      console.log("Form submitted:", data);
      alert("Thanks for your message!");
      e.target.reset();
    });
  
    // Timeline scroll animation
    const timelineItems = document.querySelectorAll(".timeline-item");
    const revealTimeline = () => {
      timelineItems.forEach(item => {
        const inView = item.getBoundingClientRect().top < window.innerHeight * 0.8;
        item.classList.toggle("animate", inView);
      });
    };
    revealTimeline();
    window.addEventListener("scroll", revealTimeline);
  
    // Video Modal
    const videoModal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    document.querySelectorAll(".watch-video, .video-thumbnail").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const vid = btn.closest(".video-card")?.querySelector(".watch-video")?.dataset.videoId;
        if (vid) {
          videoFrame.src = `https://www.youtube.com/embed/${vid}?autoplay=1`;
          videoModal.style.display = "block";
          document.body.style.overflow = "hidden";
        }
      });
    });
  
    const closeModal = () => {
      videoModal.style.display = "none";
      videoFrame.src = "";
      document.body.style.overflow = "auto";
    };
  
    document.querySelector(".close-modal")?.addEventListener("click", closeModal);
    window.addEventListener("click", e => e.target === videoModal && closeModal());
    document.addEventListener("keydown", e => e.key === "Escape" && videoModal.style.display === "block" && closeModal());
  });
  