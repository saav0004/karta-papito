const APP = {
  init: () => {
    APP.setupEventListeners();
  },

  setupEventListeners: () => {
    APP.setupBurgerMenu();
    APP.setupNavLinks();
  },

  setupBurgerMenu: () => {
    const burgerButton = document.getElementById("burger-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (burgerButton && mobileMenu) {
      burgerButton.addEventListener("click", (event) => {
        event.stopPropagation();
        mobileMenu.classList.toggle("hidden");

        // Attach event listeners to mobile menu links when menu opens
        if (!mobileMenu.classList.contains("hidden")) {
          APP.setupNavLinks();
        }
      });

      // Close the menu when clicking outside
      document.addEventListener("click", (event) => {
        if (
          !mobileMenu.contains(event.target) &&
          !burgerButton.contains(event.target)
        ) {
          mobileMenu.classList.add("hidden");
        }
      });
    }
  },

  setupNavLinks: () => {
    const navLinks = document.querySelectorAll("a[href^='#']");

    navLinks.forEach((link) => {
      link.removeEventListener("click", APP.smoothScroll); // Prevent duplicate event listeners
      link.addEventListener("click", APP.smoothScroll);
    });
  },

  smoothScroll: (event) => {
    event.preventDefault();

    const targetId = event.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const isMobile = window.innerWidth < 640;
      const offset = isMobile ? 150 : 80;

      const sectionPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset;

      // Close mobile menu if it's open
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }

      // Scroll smoothly after closing menu
      setTimeout(() => {
        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        });
      }, 100); // Delay ensures menu is hidden first
    }
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
