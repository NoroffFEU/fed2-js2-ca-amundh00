/**
 * Logs in a user by sending their email and password to the API.
 * 
 * This function sends a POST request to the login API with the user's email
 * and password. If the login is successful, it stores the access token and 
 * user's name in localStorage, and redirects the user to the homepage.
 *
 * @async
 * @function login
 * @param {Object} credentials - An object containing the user's login details.
 * @param {string} credentials.email - The email address of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<void>} Resolves when the login process completes, storing the access token and username, or throws an error if login fails.
 * @throws {Error} Will throw an error if the login request fails or the response is not OK.
 */
export async function login({ email, password }) {
  const apiUrl = 'https://v2.api.noroff.dev/auth/login';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const responseData = await response.json();
    const accessToken = responseData.data.accessToken;
    const name = responseData.data.name;

    // Store the access token and user name in localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userName', name);

    // Redirect to the homepage after successful login
    window.location.href = '/';

  } catch (error) {
    // Display an alert if login fails
    alert('Login failed. Please check your credentials and try again.');
  }
}
