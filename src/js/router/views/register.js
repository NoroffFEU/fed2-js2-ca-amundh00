import { onRegister } from "../../ui/auth/register";
import { register } from "../../api/auth/register";

/**
 * Adds an event listener to the registration form.
 *
 * When the user submits the registration form, the `onRegister` function will be triggered
 * to handle the form submission logic.
 *
 * - The `onRegister()` function handles form submission and validation.
 * - The `register()` function sends the registration data to the API.
 */

// Get the registration form element
const form = document.forms.register;

/**
 * Event listener for the registration form submission.
 *
 * @event submit
 * @param {Event} event - The form submission event triggers the onRegister function.
 */
form.addEventListener("submit", onRegister);

