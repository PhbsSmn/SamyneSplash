const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "preferred-theme";

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return systemPrefersDark ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (!themeToggle) {
    return;
  }

  const nextLabel = theme === "dark" ? "Light Mode" : "Dark Mode";
  const pressed = theme === "light";
  themeToggle.textContent = nextLabel;
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  themeToggle.setAttribute("aria-pressed", String(pressed));
}

function setupThemeToggle() {
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

// ============================================================================
// PARALLAX SCROLL EFFECT
// ============================================================================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupParallax() {
  if (prefersReducedMotion) {
    return; // Skip parallax for users who prefer reduced motion
  }

  // Get all parallax elements (both in site-shell and background layers)
  const allParallaxElements = document.querySelectorAll("[data-parallax]");
  if (allParallaxElements.length === 0) {
    return;
  }

  let rafId;
  let lastScrollY = 0;

  function updateParallax() {
    const currentScrollY = window.scrollY;
    const deltaScroll = currentScrollY - lastScrollY;

    // Only update if there's significant scroll movement (debouncing)
    if (Math.abs(deltaScroll) > 0.5) {
      lastScrollY = currentScrollY;

      allParallaxElements.forEach((element) => {
        const depth = parseFloat(element.getAttribute("data-depth")) || 0.5;
        const offset = currentScrollY * depth;
        element.style.transform = `translateY(${offset}px)`;
      });
    }

    rafId = requestAnimationFrame(updateParallax);
  }

  // Use Intersection Observer for better performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !rafId) {
          rafId = requestAnimationFrame(updateParallax);
        }
      });
    },
    { threshold: 0 }
  );

  // Observe all parallax elements
  allParallaxElements.forEach((element) => {
    observer.observe(element);
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Run setup functions when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setupThemeToggle();
    setupParallax();
    setYear();
  });
} else {
  setupThemeToggle();
  setupParallax();
  setYear();
}