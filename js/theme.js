// theme switcher - light/dark mode toggle that remembers your choice
// starter code from the assignment PDF, filled in the TODOs below

document.addEventListener("DOMContentLoaded", function () {

  const toggleBtn = document.getElementById("theme-toggle");

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

});
