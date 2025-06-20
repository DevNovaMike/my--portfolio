function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

  const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
  if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
}

window.addEventListener("DOMContentLoaded", () => {
  const darkModeSetting = localStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

  const form = document.getElementById('contactForm');
  const button = form.querySelector("button[type='submit']");

  form.addEventListener('input', () => {
    button.disabled = !form.checkValidity();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = "Sending...";

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbx-od27r1JZNdr1RBf4U2m-T7SF_jlWOdKc7LrFWZ3a_I9d3jObvbXotxbedGpouZF-wA/exec", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
      button.disabled = false;
      button.textContent = "Send";
    }
  });
});
