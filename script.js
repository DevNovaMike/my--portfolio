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
}

// Run this when the page loads
window.addEventListener("DOMContentLoaded", () => {
  const darkModeSetting = localStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    document.body.classList.add("dark-mode");
  }
});

// Form Submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbx-od27r1JZNdr1RBf4U2m-T7SF_jlWOdKc7LrFWZ3a_I9d3jObvbXotxbedGpouZF-wA/exec", {
        // 🔁 Replace this with your actual Google Apps Script Web App URL
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
    }
  });
});
