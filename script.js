// Sweet Alerts
function sayHello() {
  alert("Hello! Thanks for visiting 😊");
}

function greetUser(name) {
  alert("Welcome, " + name + "! Glad you're here.");
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

  // Change button text accordingly
  const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
  if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
}

// Run this when the page loads
window.addEventListener("DOMContentLoaded", () => {
  const darkModeSetting = localStorage.getItem("darkMode");
  const btn = document.querySelector('button[onclick="toggleDarkMode()"]');

  if (darkModeSetting === "enabled") {
    document.body.classList.add("dark-mode");
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  // Animation scroll-in observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});

// Form Submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbx-od27r1JZNdr1RBf4U2m-T7SF_jlWOdKc7LrFWZ3a_I9d3jObvbXotxbedGpouZF-wA/exec", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire("Success", "Message sent successfully!", "success");
        form.reset();
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Oops", "Something went wrong.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send";
    }
  });
});
