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
    const name = responseData.data.name;
    console.log('Response Data:', responseData);
    console.log('Access Token:', accessToken);
    console.log('User Name:', name);
    // Save the access token in local storage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userName', name)

    // Redirect to another page after successful login
    window.location.href = '/';

  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
}
