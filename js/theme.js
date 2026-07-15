// theme switcher - light/dark mode toggle that remembers your choice
// starter code from the assignment PDF, filled in the TODOs below

// the toggle button now lives in components/header.html (Part 2), which gets fetched in
// dynamically - so this had to become its own named function instead of just sitting inside
// DOMContentLoaded, since js/components.js needs to call it again once the header actually
// shows up in the DOM
function setupThemeToggle() {

  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return; // header hasn't loaded in yet, bail out for now

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    toggleBtn.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    // save it so the theme sticks around on reload / other pages
    localStorage.setItem("theme", theme);
  }

  function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme("light"); // nothing saved yet, default to light
    }
  }

  toggleBtn.addEventListener("click", function () {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });

  loadSavedTheme(); // Run on every page load

}

// this first call does basically nothing right now since the header (and the button) hasn't
// fetched in yet - js/components.js calls setupThemeToggle() again once it has
document.addEventListener("DOMContentLoaded", setupThemeToggle);
