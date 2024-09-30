/**
 * Registers a new user by sending their name, email, and password to the API.
 *
 * This function sends a POST request to the registration API with the user's name, email, and password.
 * If the registration is successful, it displays a success message. If registration fails or a network error occurs,
 * an appropriate error message is displayed.
 *
 * @async
 * @function register
 * @param {Object} userDetails - An object containing the user's registration details.
 * @param {string} userDetails.name - The name of the user.
 * @param {string} userDetails.email - The email address of the user.
 * @param {string} userDetails.password - The password of the user.
 * @returns {Promise<void>} Resolves when the registration process completes and updates the UI with a success or error message.
 * @throws {Error} Will throw an error if the request fails or the response is not OK.
 */
export async function register({ name, email, password }) {
  const url = 'https://v2.api.noroff.dev/auth/register'; 
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const messageElement = document.getElementById('message');

    if (response.ok) {
      const data = await response.json();
      // Update the UI to show the success message
      messageElement.textContent = 'Registration successful! You can now log in.';
      messageElement.className = 'success';
      messageElement.style.display = 'block';
    } else {
      const errorData = await response.json();
      // Update the UI to show the error message
      messageElement.textContent = `Registration failed: ${errorData.message}`;
      messageElement.className = 'error';
      messageElement.style.display = 'block';
    }
  } catch (error) {
    // Handle network or unexpected error
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Network error, please try again later.';
    messageElement.className = 'error';
    messageElement.style.display = 'block';
  }
}

/**
 * Event listener for the registration form submission.
 *
 * This listener prevents the default form submission, extracts the name, email, and password values,
 * hides any previous messages, and calls the register function to register the user.
 *
 * @event submit
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Handles the form submission to register a user.
 */
document.forms['register'].addEventListener('submit', async (event) => {
  event.preventDefault();

  // Extract form values
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  // Reset any previous message
  const messageElement = document.getElementById('message');
  messageElement.style.display = 'none';
  messageElement.textContent = '';

  // Call the register function with the form data
  await register({ name, email, password });
});
