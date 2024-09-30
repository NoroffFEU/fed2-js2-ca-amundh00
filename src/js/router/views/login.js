import { login } from "../../api/auth/login";

/**
 * Handles the form submission event for user login.
 *
 * This function prevents the default form submission behavior, extracts the email and password
 * values from the form, and calls the login function with the provided credentials.
 *
 * @async
 * @function onLogin
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves after the login function is called.
 */
async function onLogin(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const email = event.target.email.value; // Get the email from the form
  const password = event.target.password.value; // Get the password from the form

  // Call the login function with the email and password
  await login({ email, password });
}

// Add event listener to the login form
const form = document.forms.login;
form.addEventListener("submit", onLogin);
