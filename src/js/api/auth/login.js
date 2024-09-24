// api/auth/login.js

// The login function sends a POST request to the login endpoint
export async function login({ email, password }) {
  const apiUrl = 'https://v2.api.noroff.dev/auth/login'; // Login endpoint

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

    // Save the access token in local storage
    localStorage.setItem('accessToken', accessToken);

    // Redirect to another page after successful login
    window.location.href = '/index.html';

  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
}
