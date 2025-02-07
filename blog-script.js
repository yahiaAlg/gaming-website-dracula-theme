// View Toggle
const viewToggles = document.querySelectorAll(".view-toggle");
const postsGrid = document.querySelector(".posts-grid");

viewToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // Remove active class from all toggles
    viewToggles.forEach((t) => t.classList.remove("active"));
    // Add active class to clicked toggle
    toggle.classList.add("active");

    // Update grid view
    if (toggle.dataset.view === "list") {
      postsGrid.classList.add("list-view");
    } else {
      postsGrid.classList.remove("list-view");
    }
  });
});

// Search Functionality
const searchInput = document.querySelector(".search-widget input");
const postCards = document.querySelectorAll(".post-card");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  postCards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const content = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Category Filtering
const categoryLinks = document.querySelectorAll(".categories-list a");

categoryLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = link.querySelector("span").textContent.toLowerCase();

    postCards.forEach((card) => {
      const cardCategory = card
        .querySelector(".category-tag")
        .textContent.toLowerCase();
      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Social Share
const shareButtons = document.querySelectorAll(".social-share button");

shareButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const post = button.closest(".post-card");
    const title = post.querySelector("h2").textContent;
    const url = window.location.href;

    if (button.getAttribute("aria-label").includes("Twitter")) {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`
      );
    } else if (button.getAttribute("aria-label").includes("Facebook")) {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`
      );
    }
  });
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
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

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "50px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all post cards
postCards.forEach((card) => {
  observer.observe(card);
});

// Pagination
const paginationButtons = document.querySelectorAll(".page-numbers button");
const prevButton = document.querySelector(".pagination .prev");
const nextButton = document.querySelector(".pagination .next");

paginationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    paginationButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    // Enable/disable prev/next buttons based on current page
    const currentPage = parseInt(button.textContent);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === 10;

    // Scroll to top of posts
    document
      .querySelector(".blog-posts")
      .scrollIntoView({ behavior: "smooth" });
  });
});
