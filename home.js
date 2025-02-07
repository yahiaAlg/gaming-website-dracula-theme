// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
let isMenuOpen = false;

menuButton.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  mobileMenu.classList.toggle("hidden");
  menuIcon.setAttribute("data-lucide", isMenuOpen ? "x" : "menu");
  lucide.createIcons();
});

// Sticky header functionality
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("bg-[#282a36]/95", "shadow-lg");
  } else {
    header.classList.remove("bg-[#282a36]/95", "shadow-lg");
  }
});

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const lightIcon = document.getElementById("lightIcon");
const darkIcon = document.getElementById("darkIcon");
let isDarkMode = true;

themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.documentElement.classList.toggle("light-theme");
  lightIcon.classList.toggle("hidden");
  darkIcon.classList.toggle("hidden");
});

// Counter animation
const counters = document.querySelectorAll(".counter-value");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute("data-target"));
      let current = 0;
      const increment = target / 100;
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
});

counters.forEach((counter) => counterObserver.observe(counter));

// FAQ functionality
const faqToggles = document.querySelectorAll(".faq-toggle");
faqToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;
    const icon = toggle.querySelector("[data-lucide]");
    content.classList.toggle("hidden");
    icon.style.transform = content.classList.contains("hidden")
      ? "rotate(0deg)"
      : "rotate(180deg)";
  });
});

// Back to top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.remove("hidden");
  } else {
    backToTop.classList.add("hidden");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
      // Close mobile menu if open
      if (isMenuOpen) {
        isMenuOpen = false;
        mobileMenu.classList.add("hidden");
        menuIcon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
      }
    }
  });
});

// Form validation and submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Basic form validation
  const formData = new FormData(contactForm);
  let isValid = true;

  formData.forEach((value, key) => {
    const input = contactForm.querySelector(`[name="${key}"]`);
    if (input.hasAttribute("required") && !value) {
      isValid = false;
      input.classList.add("border-red-500");
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  // reCAPTCHA validation
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA verification.");
    return;
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> Sending...';
  lucide.createIcons();

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    contactForm.reset();
    alert("Message sent successfully!");
  } catch (error) {
    alert("An error occurred. Please try again later.");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Send Message";
    grecaptcha.reset();
  }
});

// Gallery image loading
const loadGalleryImages = async () => {
  const galleryGrid = document.getElementById("galleryGrid");
  const gameKeywords = ["gaming", "game", "esports", "videogame"];

  try {
    // Simulate fetching images from an API
    const images = [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534488972407-5a4aa1e47d83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ];

    images.forEach((imageUrl) => {
      const div = document.createElement("div");
      div.className =
        "relative group overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300";
      div.innerHTML = `
            <img src="${imageUrl}" alt="Game screenshot" class="w-full h-64 object-cover" loading="lazy">
            <div class="absolute inset-0 bg-[#282a36]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i data-lucide="maximize-2" class="w-8 h-8 text-white"></i>
            </div>
          `;
      galleryGrid.appendChild(div);
    });
    lucide.createIcons();
  } catch (error) {
    console.error("Error loading gallery images:", error);
  }
};

loadGalleryImages();

// Initialize Google Maps
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    styles: [
      // Dark theme map styles
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#242f3e" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#746855" }],
      },
      // Add more custom styles as needed
    ],
  });
}
