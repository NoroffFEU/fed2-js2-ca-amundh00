// views/login.js

// Import the login function from the auth module
import { login } from "../../api/auth/login";

// This function handles the form submission and calls the login function
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
