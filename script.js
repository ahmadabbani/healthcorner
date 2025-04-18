// Hero Slider
const heroSlider = document.querySelector(".hero-slider");
const slides = document.querySelectorAll(".hero-slide");
const prevBtn = document.querySelector(".slider-arrow.prev");
const nextBtn = document.querySelector(".slider-arrow.next");
// Mobile Menu Toggle
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
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.querySelector(".hero-content").style.opacity = "0";
  });

  slides[index].classList.add("active");
  setTimeout(() => {
    slides[index].querySelector(".hero-content").style.opacity = "1";
  }, 300);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
  clearInterval(slideInterval);
}

// Event Listeners
prevBtn.addEventListener("click", () => {
  stopSlider();
  prevSlide();
  startSlider();
});

nextBtn.addEventListener("click", () => {
  stopSlider();
  nextSlide();
  startSlider();
});

// Start the slider
startSlider();

// Pause slider on hover
heroSlider.addEventListener("mouseenter", stopSlider);
heroSlider.addEventListener("mouseleave", startSlider);

// Handle navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");
  // Only prevent default for About, Contact, and Products pages
  if (
    href === "about.html" ||
    href === "contact.html" ||
    href === "products.html"
  ) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = href;
    });
  }
});

// Keep smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if open
      if (navMenu) navMenu.classList.remove("active");
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");

      // Smooth scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for fixed header
        behavior: "smooth",
      });
    }
  });
});

// Add scroll event listener for header
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    // Scroll Down
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    // Scroll Up
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// Counter Animation
function animateCounter() {
  const statNumber = document.querySelector(".stat-number");
  const target = parseInt(statNumber.getAttribute("data-target"));
  let current = 0;
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            statNumber.textContent = Math.floor(current);
          }, 16);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statNumber);
}

// Initialize counter animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateCounter();
});

// Partners Carousel
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".partners-track");
  let autoScrollInterval;

  // Clone logos for seamless loop
  const cloneLogos = () => {
    const logos = track.querySelectorAll(".partner-logo");
    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
  };

  // Initialize carousel
  const initCarousel = () => {
    cloneLogos();
    startAutoScroll();
  };

  // Auto scroll
  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      // Auto scroll logic here
    }, 6000);
  };

  // Pause on hover
  track.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  track.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  // Initialize
  initCarousel();
});

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Add any page-specific initializations here
  // For example:
  // if (window.location.pathname.includes('about.html')) {
  //     initAboutPage();
  // }
});
