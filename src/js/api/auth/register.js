// app.js

// Function to handle registration
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

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful:', data);
      // Display success message
      messageElement.textContent = 'Registration successful! You can now log in.';
      messageElement.className = 'success';
      messageElement.style.display = 'block';
    } else {
      const errorData = await response.json();
      console.error('Registration failed:', errorData);
      // Display error message
      messageElement.textContent = `Registration failed: ${errorData.message}`;
      messageElement.className = 'error';
      messageElement.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    // Display network error message
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Network error, please try again later.';
    messageElement.className = 'error';
    messageElement.style.display = 'block';
  }
}

// Event listener for form submission
document.forms['register'].addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  // Clear previous message
  const messageElement = document.getElementById('message');
  messageElement.style.display = 'none';
  messageElement.textContent = '';

  await register({ name, email, password });
});
