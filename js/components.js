// loads the shared header and footer into every page so I'm not copy-pasting the same
// nav/footer markup six times - starter code from the PDF, filled in the TODO

function loadComponent(selector, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Could not load " + filePath);
      return response.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;
      // the theme toggle button lives in the header, so it doesn't exist until now -
      // gotta set it up again once it's actually in the DOM
      if (selector === "#header-placeholder") {
        setupThemeToggle();
        highlightCurrentPage();
      }
    })
    .catch(error => console.error(error));
}

// mark the nav link for whatever page we're currently on so it stands out
function highlightCurrentPage() {
  // grab just the file name from the URL, defaulting to index.html at the site root
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("#header-placeholder", "components/header.html");
  loadComponent("#footer-placeholder", "components/footer.html");
});
