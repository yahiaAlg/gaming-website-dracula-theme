// Initialize Lucide icons
lucide.createIcons();

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const sunIcon = `<i data-lucide="sun"></i>`;
const moonIcon = `<i data-lucide="moon"></i>`;

let isDarkMode = true;

themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  root.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  themeToggle.innerHTML = isDarkMode ? sunIcon : moonIcon;
  lucide.createIcons();
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = `<i data-lucide="menu"></i>`;
const closeIcon = `<i data-lucide="x"></i>`;

let isMenuOpen = false;

menuToggle.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  mobileMenu.classList.toggle("active");
  menuToggle.innerHTML = isMenuOpen ? closeIcon : menuIcon;
  lucide.createIcons();
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Comment Form
const commentForm = document.getElementById("commentForm");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;

  // Handle comment submission
  console.log({ name, email, comment });

  // Reset form
  commentForm.reset();
});

// Newsletter Form
const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = newsletterForm.querySelector('input[type="email"]').value;

  // Handle newsletter subscription
  console.log({ email });

  // Reset form
  newsletterForm.reset();
});
