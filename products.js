// Product data
const products = [
  {
    id: 1,
    name: "Vitamin C 1000mg",
    price: "$15.99",
    category: "pharmaceutical",
    image: "https://placehold.co/200x200/f0f0f0/333333.png?text=Vitamin+C",
  },
  {
    id: 2,
    name: "Moisturizing Cream",
    price: "$12.99",
    category: "cosmetic",
    image: "https://placehold.co/200x200/f0f0f0/333333.png?text=Cream",
  },
  {
    id: 3,
    name: "Omega-3 Fish Oil",
    price: "$19.99",
    category: "pharmaceutical",
    image: "https://placehold.co/200x200/f0f0f0/333333.png?text=Omega+3",
  },
  {
    id: 4,
    name: "Anti-Aging Serum",
    price: "$24.99",
    category: "cosmetic",
    image: "https://placehold.co/200x200/f0f0f0/333333.png?text=Serum",
  },
  {
    id: 5,
    name: "Multivitamin Complex",
    price: "$17.99",
    category: "pharmaceutical",
    image: "https://placehold.co/200x200/f0f0f0/333333.png?text=Multivitamin",
  },
  {
    id: 6,
    name: "Sunscreen SPF 50",
    price: "$14.99",
    category: "cosmetic",
    image: "https://placehold.co/200x200/f0f0f0/333333.png?text=Sunscreen",
  },
];

// Function to create product card
function createProductCard(product) {
  return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="price">${product.price}</span>
            </div>
        </div>
    `;
}

// Function to render products
function renderProducts(category = "all") {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  filteredProducts.forEach((product) => {
    productsGrid.innerHTML += createProductCard(product);
  });
}

// Initialize product filtering
function initProductFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!filterButtons.length) return;

  // Set initial active state
  filterButtons.forEach((btn) => {
    if (btn.dataset.filter === "all") {
      btn.classList.add("active");
    }
  });

  // Add click event listeners
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Filter and render products
      renderProducts(button.dataset.filter);
    });
  });

  // Initial render
  renderProducts();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initProductFiltering);

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
      }
    });
  }
});
