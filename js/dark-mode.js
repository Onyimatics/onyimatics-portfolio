document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;
  
    const applyTheme = (isDark) => {
      body.classList.toggle("dark-mode", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };
  
    const saved = localStorage.getItem("theme");
    const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved === "dark" || (!saved && systemPref);
    applyTheme(initial);
  
    themeToggleBtn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) applyTheme(e.matches);
    });
  });
  