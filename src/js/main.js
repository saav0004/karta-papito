const APP = {
  init: () => {
    APP.addListeners();
  },

  addListeners: () => {
    const burgerButton = document.querySelector("button");
    if (burgerButton) {
      burgerButton.addEventListener("click", APP.handleBurgerClick);
    }
  },

  handleBurgerClick: (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up
    console.log("Burger menu clicked");

    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
