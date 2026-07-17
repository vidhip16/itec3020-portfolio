// contact form validation - checks name/email/message before "sending"
// starter code from the assignment PDF, filled in the TODOs

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return; // only the contact page has this form

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    // reuse the error span if it's already there, otherwise make one right after the field
    let errorEl = field.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains("error-msg")) {
      errorEl = document.createElement("span");
      errorEl.className = "error-msg";
      field.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-msg")) {
      errorEl.textContent = "";
    }
  }

  function validateEmail(email) {
    // no spaces, an @, a domain, and a dot with something after it
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    } else {
      clearError("name");
    }

    if (email === "") {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("email", "That doesn't look like a valid email.");
      isValid = false;
    } else {
      clearError("email");
    }

    if (message.length < 20) {
      showError("message", "Message needs to be at least 20 characters.");
      isValid = false;
    } else {
      clearError("message");
    }

    if (isValid) {
      // no real backend to send to, so just swap the form out for a thank-you message
      const success = document.createElement("p");
      success.className = "success-msg";
      success.textContent = "Thanks! Your message has been sent.";
      form.replaceWith(success);
    }
  });

  // clear a field's error as soon as the user starts fixing it
  ["name", "email", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      clearError(id);
    });
  });
});
