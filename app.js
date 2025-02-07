// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const gridViewBtn = document.getElementById("gridView");
const listViewBtn = document.getElementById("listView");
const gamesContainer = document.getElementById("gamesContainer");
const noResults = document.getElementById("noResults");
const categoryFilters = document.getElementById("categoryFilters");
const subCategoryFilters = document.getElementById("subCategoryFilters");

// State
let viewMode = "grid";
let selectedCategories = [];
let selectedSubCategories = [];

// Initialize filters
function initializeFilters() {
  // Category filters
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.textContent = category;
    button.addEventListener("click", () => toggleCategory(category, button));
    categoryFilters.appendChild(button);
  });

  // Subcategory filters
  subCategories.forEach((subCategory) => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.textContent = subCategory;
    button.addEventListener("click", () =>
      toggleSubCategory(subCategory, button)
    );
    subCategoryFilters.appendChild(button);
  });
}

// Toggle category filter
function toggleCategory(category, button) {
  const index = selectedCategories.indexOf(category);
  if (index === -1) {
    selectedCategories.push(category);
    button.classList.add("active");
  } else {
    selectedCategories.splice(index, 1);
    button.classList.remove("active");
  }
  updateGames();
}

// Toggle subcategory filter
function toggleSubCategory(subCategory, button) {
  const index = selectedSubCategories.indexOf(subCategory);
  if (index === -1) {
    selectedSubCategories.push(subCategory);
    button.classList.add("active");
  } else {
    selectedSubCategories.splice(index, 1);
    button.classList.remove("active");
  }
  updateGames();
}

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

  return `
    <div class="rating">
      ${starsHtml}
      <span>${rating.toFixed(1)}</span>
    </div>
  `;
}

// Render game card
function renderGameCard(game) {
  const cardClass = viewMode === "grid" ? "game-card" : "game-card list-view";

  return `
    <div class="${cardClass}">
        <a href="./game.html">
        <img src="${game.imageUrl}" alt="${game.title}">
        </a>
      <div class="game-content">
        <h3 class="game-title">${game.title}</h3>
        <p class="game-description">${game.description}</p>
        <div class="game-tags">
          ${game.categories
            .map(
              (cat) => `
            <span class="category-tag">${cat}</span>
          `
            )
            .join("")}
          ${game.subCategories
            .map(
              (sub) => `
            <span class="subcategory-tag">${sub}</span>
          `
            )
            .join("")}
        </div>
        <div class="game-footer">
          ${renderStars(game.rating)}
          <span class="release-date">${new Date(
            game.releaseDate
          ).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  `;
}

// Filter and sort games
function filterAndSortGames() {
  const searchTerm = searchInput.value.toLowerCase();
  const [sortBy, sortDirection] = sortSelect.value.split("-");

  return games
    .filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm);
      const matchesCategories =
        selectedCategories.length === 0 ||
        game.categories.some((cat) => selectedCategories.includes(cat));
      const matchesSubCategories =
        selectedSubCategories.length === 0 ||
        game.subCategories.some((sub) => selectedSubCategories.includes(sub));

      return matchesSearch && matchesCategories && matchesSubCategories;
    })
    .sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      if (sortBy === "rating") {
        return (a.rating - b.rating) * modifier;
      }
      if (sortBy === "releaseDate") {
        return (
          (new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()) *
          modifier
        );
      }
      return a.title.localeCompare(b.title) * modifier;
    });
}

// Update games display
function updateGames() {
  const filteredGames = filterAndSortGames();

  if (filteredGames.length === 0) {
    gamesContainer.innerHTML = "";
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    gamesContainer.innerHTML = filteredGames.map(renderGameCard).join("");
    lucide.createIcons();
  }
}

// Event Listeners
searchInput.addEventListener("input", updateGames);
sortSelect.addEventListener("change", updateGames);

gridViewBtn.addEventListener("click", () => {
  viewMode = "grid";
  gamesContainer.classList.remove("list-view");
  gridViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
  updateGames();
});

listViewBtn.addEventListener("click", () => {
  viewMode = "list";
  gamesContainer.classList.add("list-view");
  listViewBtn.classList.add("active");
  gridViewBtn.classList.remove("active");
  updateGames();
});

// Initialize
initializeFilters();
updateGames();
