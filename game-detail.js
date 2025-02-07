// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const backToTopBtn = document.getElementById("backToTop");
const requirementsTabs = document.querySelectorAll(".tab");
const requirementsContents = document.querySelectorAll(".requirements-content");
const reviewsContainer = document.getElementById("reviewsContainer");
const reviewSort = document.getElementById("reviewSort");

// Sample reviews data
const reviews = [
  {
    id: 1,
    username: "CyberGamer",
    rating: 5,
    date: "2024-03-20",
    content:
      "An absolute masterpiece! The neural implant system adds incredible depth to character customization, and the story had me hooked from start to finish.",
  },
  {
    id: 2,
    username: "NeoRunner",
    rating: 4,
    date: "2024-03-18",
    content:
      "Stunning visuals and immersive world design. The branching storylines really make your choices feel impactful. Combat could use some polish though.",
  },
  {
    id: 3,
    username: "PixelPundit",
    rating: 5,
    date: "2024-03-15",
    content:
      "This game sets a new standard for cyberpunk RPGs. The attention to detail in Neo-Tokyo is incredible, and the side quests are as engaging as the main story.",
  },
];

// Back to Top Button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// System Requirements Tabs
requirementsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // Update active tab
    requirementsTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Update content
    requirementsContents.forEach((content) => {
      content.classList.remove("active");
      if (content.id === target) {
        content.classList.add("active");
      }
    });
  });
});

// Render stars for rating
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHtml = "";

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i data-lucide="star" class="filled"></i>';
  }
  if (hasHalfStar) {
    starsHtml += '<i data-lucide="star-half" class="filled"></i>';
  }

  return starsHtml;
}

// Render review
function renderReview(review) {
  return `
    <div class="review">
      <div class="review-header">
        <div class="reviewer">
          <div class="reviewer-avatar">
            <i data-lucide="user"></i>
          </div>
          <div class="reviewer-info">
            <h3>${review.username}</h3>
            <span class="review-date">${new Date(
              review.date
            ).toLocaleDateString()}</span>
          </div>
        </div>
        <div class="review-rating">
          ${renderStars(review.rating)}
        </div>
      </div>
      <p class="review-content">${review.content}</p>
    </div>
  `;
}

// Sort and render reviews
function updateReviews() {
  const sortValue = reviewSort.value;
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortValue === "recent") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortValue === "rating-high") {
      return b.rating - a.rating;
    }
    if (sortValue === "rating-low") {
      return a.rating - b.rating;
    }
    return 0;
  });

  reviewsContainer.innerHTML = sortedReviews.map(renderReview).join("");
  lucide.createIcons();
}

// Event Listeners
reviewSort.addEventListener("change", updateReviews);

// Share button functionality
const shareButton = document.querySelector(".share-button");
shareButton.addEventListener("click", async () => {
  try {
    await navigator.share({
      title: "Cyber Odyssey",
      text: "Check out this amazing cyberpunk RPG!",
      url: window.location.href,
    });
  } catch (err) {
    console.log("Share failed:", err.message);
  }
});

// Initialize
updateReviews();
