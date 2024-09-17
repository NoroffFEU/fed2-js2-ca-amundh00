export async function onRegister(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const form = event.target;
  
    // Collect form values
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
  
    // Construct the data object
    const data = {
      name: name,
      email: email,
      password: password,
      bio: "This is my profile bio", // Optional
      avatar: {
        url: "https://img.service.com/avatar.jpg", // Optional
        alt: "My avatar alt text" // Optional
      },
      banner: {
        url: "https://img.service.com/banner.jpg", // Optional
        alt: "My banner alt text" // Optional
      },
      venueManager: true // Optional
    };
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }
  
      const result = await response.json();
      console.log('Registration successful:', result);
  
      // Optional: Redirect or show success message
    } catch (error) {
      console.error('Error:', error);
    }
  }
  