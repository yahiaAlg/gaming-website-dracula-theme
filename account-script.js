// Initialize Lucide icons
lucide.createIcons();

// Navigation
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.dataset.section;

    // Update active nav item
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    // Show selected section
    sections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === `${sectionId}-section`) {
        section.classList.add("active");
      }
    });
  });
});

// Profile form submission
const profileForm = document.querySelector(".profile-form");
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Handle form submission
  showToast("Profile updated successfully!");
});

// Visibility options
const visibilityOptions = document.querySelectorAll(".visibility-option");
visibilityOptions.forEach((option) => {
  option.addEventListener("click", () => {
    visibilityOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    showToast("Privacy settings updated!");
  });
});

// Connected accounts
const connectButtons = document.querySelectorAll(
  ".connect-button, .disconnect-button"
);
connectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isConnected = button.classList.contains("disconnect-button");
    const accountItem = button.closest(".account-item");
    const platform = accountItem.querySelector("h4").textContent;

    if (isConnected) {
      button.className = "connect-button";
      button.textContent = "Connect";
      accountItem.querySelector("p")?.remove();
      showToast(`Disconnected from ${platform}`);
    } else {
      button.className = "disconnect-button";
      button.textContent = "Disconnect";
      const username = "GamerPro123" + (platform === "Discord" ? "#1234" : "");
      const status = document.createElement("p");
      status.textContent = `Connected as ${username}`;
      accountItem.querySelector("div").appendChild(status);
      showToast(`Connected to ${platform}`);
    }
  });
});

// Toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Add styles for the toast
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    padding: "12px 24px",
    background: "var(--accent)",
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
