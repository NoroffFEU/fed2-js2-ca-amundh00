import "./css/style.css";
import router from "./js/router";

/**
 * Initializes the application by calling the router function to dynamically load 
 * the appropriate JavaScript file based on the current URL pathname.
 *
 * @async
 * @function init
 * @returns {Promise<void>} Resolves after the router function has completed loading the relevant script.
 */
async function init() {
    await router(window.location.pathname);
}

init();

// Log the current localStorage content (for debugging purposes)
console.log(localStorage);

/**
 * Imports the `logOut` function from the global/logout module for reuse across multiple components or pages.
 * This ensures that the logout functionality is accessible from different parts of the app.
 */
import { logOut } from "./js/ui/global/logout";

/**
 * Once the DOM is fully loaded, this event listener adds a click event to the "logOutButton"
 * which triggers the `logOut` function to log the user out when clicked.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  const logOutButton = document.getElementById('logOutButton');
  
  // If the logout button is present, attach the logOut function to its click event
  if (logOutButton) {
    logOutButton.addEventListener('click', logOut);
  }
});
