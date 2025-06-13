document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll("input, textarea");
  const submitButton = form.querySelector("button[type='submit']");

  const validateForm = () => {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    submitButton.disabled = !allFilled;
  };

  inputs.forEach(input => input.addEventListener("input", validateForm));
});
