// Initialize Lucide icons
lucide.createIcons();

// Plan selection
const planButtons = document.querySelectorAll(".plan-button");
const plansSection = document.getElementById("plans-section");
const paymentSection = document.getElementById("payment-section");
const backButton = document.querySelector(".back-button");
const planNameElement = document.querySelector(".plan-summary .plan-name");
const planPriceElement = document.querySelector(".plan-summary .plan-price");

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    const price = button.dataset.price;

    // Update selected plan info
    planNameElement.textContent =
      plan.charAt(0).toUpperCase() + plan.slice(1) + " Plan";
    planPriceElement.textContent = `$${price}/month`;

    // Show payment section
    plansSection.classList.remove("active");
    paymentSection.classList.add("active");
  });
});

backButton.addEventListener("click", () => {
  paymentSection.classList.remove("active");
  plansSection.classList.add("active");
});

// Form validation and submission
const paymentForm = document.querySelector(".payment-form");
const submitButton = document.querySelector(".submit-button");

// Format card number with spaces
const cardNumberInput = document.getElementById("cardNumber");
cardNumberInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\s/g, "");
  if (value.length > 16) {
    value = value.slice(0, 16);
  }
  e.target.value = value.replace(/(.{4})/g, "$1 ").trim();
});

// Format expiry date
const expiryInput = document.getElementById("expiry");
expiryInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  e.target.value = value;
});

// Validate form on submit
paymentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!paymentForm.checkValidity()) {
    // Show validation messages
    const invalidInputs = paymentForm.querySelectorAll(":invalid");
    invalidInputs.forEach((input) => {
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 600);
    });
    return;
  }

  // Show loading state
  submitButton.classList.add("loading");

  try {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message
    showToast("Payment successful! Redirecting...", "success");

    // Reset form and return to plans
    setTimeout(() => {
      paymentForm.reset();
      submitButton.classList.remove("loading");
      paymentSection.classList.remove("active");
      plansSection.classList.add("active");
    }, 2000);
  } catch (error) {
    showToast("Payment failed. Please try again.", "error");
    submitButton.classList.remove("loading");
  }
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Toast notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Add styles for the toast
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    padding: "12px 24px",
    background: type === "success" ? "var(--success)" : "var(--error)",
    color: "var(--text)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: "100",
    transition: "all 0.3s ease",
    opacity: "0",
    transform: "translateY(100%)",
  });

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
